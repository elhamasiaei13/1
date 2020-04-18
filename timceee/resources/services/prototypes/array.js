if (!Array.prototype.pluck) {
  /**
   *
   * @param {String|Array} keys
   * @param {Function} [parse=(function(item))]
   * @return {Array}
   */
  Array.prototype.pluck = function(keys, parse = (item) => item) {
    let _plucked = [];
    let _inner;

    switch (keys.constructor) {
      case Array:
        keys = keys.map((key) => key.split('.'));
        this.map((item) => {
          _inner = {};

          keys.map((key) => {
            let _temp = item;

            key.map((_key) => _temp = _temp[_key]);

            _inner[key[key.length - 1]] = parse(_temp);
          });

          _plucked.push(_inner);
        });
        break;
      default: // String
        keys = keys.split('.');
        this.map((item) => {
          let _temp = item;

          keys.map((_key) => _temp = _temp[_key]);

          _plucked.push(parse(_temp));
        });
    }

    return _plucked;
  };
}
