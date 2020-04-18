if (!Object.prototype.diff) {
  /**
   *
   * @param {!Object} object
   * @return {Object}
   */
  Object.prototype.diff = function(object) {
    if (this.hasOwnProperty('diff')) {
      return this['diff'];
    } else {
      // It doesn't look like one of my objects, so let's fall back on
      // the default behavior by reproducing the current behavior as best we can.
      // The apply behaves like "super" in some other languages.
      // Even though valueOf() doesn't take arguments, some other hook may.
      return Object.prototype.valueOf.apply(this, object);
    }
    return deepDiffMapper.map(this, object);
  };
}

let deepDiffMapper = (() => {
  return {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map: function(obj1, obj2) {
      if (this.isValue(obj1) || this.isValue(obj2)) {
        return {
          type: this.compareValues(obj1, obj2),
          data: (obj1 === undefined) ? obj2 : obj1,
        };
      }

      let diff = {};
      for (let key in obj1) {
        if (this.isFunction(obj1[key])) {
          continue;
        }

        let value2 = undefined;
        if ('undefined' != typeof(obj2[key])) {
          value2 = obj2[key];
        }

        diff[key] = this.map(obj1[key], value2);
      }
      for (let key in obj2) {
        if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
          continue;
        }

        diff[key] = this.map(undefined, obj2[key]);
      }

      return diff;
    },
    compareValues: function(value1, value2) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
        return this.VALUE_UNCHANGED;
      }
      if ('undefined' == typeof(value1)) {
        return this.VALUE_CREATED;
      }
      if ('undefined' == typeof(value2)) {
        return this.VALUE_DELETED;
      }

      return this.VALUE_UPDATED;
    },
    isFunction: function(obj) {
      return {}.toString.apply(obj) === '[object Function]';
    },
    isArray: function(obj) {
      return {}.toString.apply(obj) === '[object Array]';
    },
    isDate: function(obj) {
      return {}.toString.apply(obj) === '[object Date]';
    },
    isObject: function(obj) {
      return {}.toString.apply(obj) === '[object Object]';
    },
    isValue: function(obj) {
      return !this.isObject(obj) && !this.isArray(obj);
    },
  };
})();
