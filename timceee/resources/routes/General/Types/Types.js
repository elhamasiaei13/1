import store from 'store';

@autobind
/**
 *
 */
export default class Types {
  /**
   *
   * @param {String} _module
   * @return {Object | null}
   * @private
   */
  static _findModule(_module = '') {
    return store.getState().General.modules.find((item) => item.name === _module);
  }

  /**
   *
   * @param {Number} [id=0]
   * @param {Array} types
   * @return {Object | null}
   * @private
   */
  static findId(id = 0, types = store.getState().General.types) {
    let _item = types.find((item) => item.id === id);

    if (_item && _item.id) {
      return _item;
    } else {
      types.map((item) => {
        if (item.children && item.children[0] && !(_item && _item.id)) {
          _item = Types.findId(id, item.children);
        }
      });
    }

    return _item;
  }

  /**
   *
   * @param {Array} items
   * @param {Object} key
   * @param {String} label
   * @return {*}
   * @private
   */
  static _findObject(items, key, label = '') {
    let result = app._.find(items, key);
    let x;
    if (result === undefined) {
      for (x in items) {
        if (!app._.isEmpty(items[x].children)) {
          let result = Types._findObject(items[x].children, key, `${label} ${items[x].label}`);
          if (result !== undefined) {
            return result;
          }
        }
      }
      return undefined;
    } else {
      return `${label} ${result.label}`;
    }
  }

  /**
   *
   * @param {Object} key
   * @param {String} label
   * @return {*}
   */
  static findObject(key, label = '') {
    const types = store.getState().General.types;
    return Types._findObject(types, key, label);
  }

  /**
   *
   * @param {String} [_module='']
   * @return {Array}
   */
  static items(_module = '') {
    const types = store.getState().General.types;
    let _return = [];
    let _findModule = Types._findModule(_module);
    types.map((item) => {
      if (item.moduleId === _findModule.id) {
        _return.push({
          id: item.id,
          name: item.name,
          label: item.label,
          value: item.id,
          rule: item.rule,
          form: item.form,
          isPrivate: item.rule && item.rule.id ? item.rule.isPrivate : 0,
          children: item.children,
        });
      }
    });

    return _return;
  }
}
