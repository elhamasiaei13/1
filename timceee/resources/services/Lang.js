import requireAll from 'services/requireAll';
import _ from 'lodash';
import {autobind} from 'core-decorators';

let translations = {};

// TODO move all lang files to related modules
requireAll(require.context('./../lang', true, /.+\.json$/)).map((module) => {
  let _lang = translations;

  let _keys = module.path.replace(/(^\.\/|\.json$)/g, '');

  _keys = _keys.split('/');

  _keys.map((_key) => {
    if (!_lang[_key]) {
      _lang[_key] = {};
    }

    _lang = _lang[_key];
  });

  for (let _i in module.data) {
    // noinspection JSUnfilteredForInLoop
    _lang[_i] = module.data[_i];
  }
});

requireAll(require.context('./../', true, /\/lang\/[a-z]+\.json$/)).map((module) => {
  let _lang = translations;

  let _keys = module.path.replace(/(^\.\/|\.json$|lang\/)/g, '');

  _keys = _keys.split('/');

  let _locale = _keys.pop();

  _keys = [
    _locale,
    ..._keys.map((_key) => _.kebabCase(_key)),
  ];

  _keys.map((_key) => {
    if (!_lang[_key]) {
      _lang[_key] = {};
    }

    _lang = _lang[_key];
  });

  for (let _i in module.data) {
    // noinspection JSUnfilteredForInLoop
    _lang[_i] = module.data[_i];
  }
});

@autobind
/**
 *
 */
export default class Lang {
  static translations = translations;

  /**
   *
   */
  constructor() {
    this.locale = localStorage.getItem('language') || 'fa';
  }

  /**
   *
   * @param {String} locale
   * @return {Boolean}
   */
  set(locale) {
    if (localStorage.getItem('language') === locale) {
      return false;
    }

    this.locale = locale;
    localStorage.setItem('data-direction', this.direction);
    localStorage.setItem('language', locale);

    return true;
  }

  /**
   *
   * @return {String}
   */
  get() {
    return this.locale;
  }

  /**
   *
   * @param {String} key
   * @return {String}
   * @private
   */
  _keys(key) {
    let result = Lang.translations[this.locale];
    let keys = key.split('.');

    try {
      keys.map((k) => {
        result = result[k];
      });
    } catch (t) {
      result = undefined;
    }

    return result;
  }

  /**
   *
   * @param {String} string
   * @param {Object} params
   * @return {String}
   * @private
   */
  _params(string, params) {
    _.mapKeys(params, (value, key) => {
      string = string.replace(new RegExp('\{\{' + key + '\}\}', 'g'), value);
    });

    return string;
  }

  /**
   *
   * @param {String} key
   * @param {Object|String} [params={}]
   * @param {String} [def=key]
   * @return {String}
   */
  translate(key, params = {}, def = key) {
    let result = this._keys(key);

    if (result === undefined) {
      return _.isString(params) ? params : def;
    }

    if (_.isObject(params)) {
      result = this._params(result, params);
    }

    return result;
  }

  /**
   *
   * @return {String}
   */
  get direction() {
    switch (this.locale) {
      case 'en':
        return 'ltr';
      case 'fa':
      default:
        return 'rtl';
    }
  }
}
