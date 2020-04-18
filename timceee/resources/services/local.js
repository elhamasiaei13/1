import {autobind} from 'core-decorators';

@autobind
/**
 *
 */
export default class local {

  /**
   * @param {String} name
   * @param {json} data
   * @param {Function} [callback=(function())]
   */
  static save(name, data, callback = () => {
  }) {
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem(name, JSON.stringify(data));
    }
    callback();
  }

  /**
   * @param {String} name
   * @return {json}
   */
  static read(name) {
    if (typeof(Storage) !== 'undefined') {
      let js = localStorage.getItem(name);
      return js;
    }
    return undefined;
  }

  /**
   * @param {String} name
   * @return {json}
   */
  static load(name) {
    if (typeof(Storage) !== 'undefined') {
      let js = localStorage.getItem(name);
      if (!js) {
        js = '{}';
      }
      return JSON.parse(js);
    }
    return undefined;
  }

  /**
   * @param {String} name
   * @param {Function} [callback=(function())]
   */
  static remove(name, callback = () => {
  }) {
    if (typeof(Storage) !== 'undefined') {
      localStorage.removeItem(name);
    }
    callback();
  }
}
