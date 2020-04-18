import { autobind } from 'core-decorators';
import _ from 'lodash';

const digits = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};

const characters = {
  'ي': 'ی',
  'ك': 'ک',
  'دِ': 'د',
  'بِ': 'ب',
  'زِ': 'ز',
  'ذِ': 'ذ',
  'ِشِ': 'ش',
  'ِسِ': 'س',
  'ى': 'ی',
};

@autobind
/**
 *
 */
export default class Transform {
  /**
   *
   * @param  {String} digit
   * @return {String}
   */
  static digit(digit) {
    return digit.replace(/([۰-۹])/g, (match) => digits[match]);
  }

  static fa2en(_value) {
    let value = _value;
    value = value.replace(/[۰]/g, '0');
    value = value.replace(/[۱]/g, '1');
    value = value.replace(/[۲]/g, '2');
    value = value.replace(/[۳]/g, '3');
    value = value.replace(/[۴]/g, '4');
    value = value.replace(/[۵]/g, '5');
    value = value.replace(/[۶]/g, '6');
    value = value.replace(/[۷]/g, '7');
    value = value.replace(/[۸]/g, '8');
    value = value.replace(/[۹]/g, '9');
    return value;
  }
  /**
   *
   * @param {String} string
   * @return {String}
   * @static
   */
  static string(string) {
    return string ?
      string.replace(new RegExp(`(${_.keys(characters).join('|')})`, 'g'), (match) => characters[match]) :
      string;
  }

  /**
   *
   * @param {Array} array
   * @return {Array}
   * @static
   */
  static array(array) {
    return array.map((item) => Transform.any(item));
  }

  /**
   *
   * @param {Object} object
   * @return {Object}
   * @static
   */
  static object(object) {
    let _result = {};

    for (let key in object) {
      _result[key] = Transform.any(object[key]);
    }

    return _result;
  }

  /**
   *
   * @param {*} value
   * @return {*}
   * @static
   */
  static any(value) {
    if (_.isPlainObject(value)) {
      value = Transform.object(value);
    } else if (_.isArray(value)) {
      value = Transform.array(value);
    } else if (_.isString(value)) {
      value = Transform.string(value);
    }

    return value;
  }

  /**
   * camel case objects
   * @param {Object} object the object you want to make it camel cased
   * @return {Object} camel cased object
   * @static
   */
  static objectToCamel(object) {
    let _result = {};

    for (let key in object) {
      _result[_.camelCase(key)] = Transform.snakeToCamel(object[key]);
    }

    return _result;
  }

  /**
   *
   * @param {Array} array
   * @return {Array}
   * @static
   */
  static arrayToCamel(array) {
    let _array = [];

    array.map((value) => _array.push(Transform.snakeToCamel(value)));

    return _array;
  }

  /**
   *
   * @param {String|Object|Array} value
   * @return {*}
   * @static
   */
  static snakeToCamel(value) {
    if (_.isPlainObject(value)) {
      value = Transform.objectToCamel(value);
    } else if (_.isArray(value)) {
      value = Transform.arrayToCamel(value);
    } else if (_.isString(value)) {
      value = Transform.string(value);
    }

    return value;
  }

  /**
   *
   * @param {Object} object
   * @return {Object}
   * @static
   */
  static objectToSnake(object) {
    let result = {};

    for (let key in object) {
      result[_.snakeCase(key)] = Transform.camelToSnake(object[key]);
    }

    return result;
  }

  /**
   *
   * @param {Array} array
   * @return {Array}
   * @static
   */
  static arrayToSnake(array) {
    let _array = [];

    array.map((value) => _array.push(Transform.camelToSnake(value)));

    return _array;
  }

  /**
   *
   * @param {String|Object|Array} value
   * @return {*}
   * @static
   */
  static camelToSnake(value) {
    if (_.isPlainObject(value)) {
      value = Transform.objectToSnake(value);
    } else if (_.isArray(value)) {
      value = Transform.arrayToSnake(value);
    } else if (_.isString(value)) {
      value = Transform.string(value);
    }

    return value;
  }
}
