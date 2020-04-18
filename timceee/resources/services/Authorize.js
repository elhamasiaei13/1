import _ from 'lodash';
import { autobind } from 'core-decorators';

@autobind
/**
 *
 */
export default class Authorize {
  /**
   *
   * @param {Object} store
   */
  constructor(store) {
    this._store = store;
  }

  /**
   *
   * @param {String} permission
   * @return {Boolean}
   * @private
   */
  _has(permission) {
    return this._store.getState().Auth.permissions.indexOf(permission) > -1;
  }

  /**
   *
   * @return {Boolean}
   */
  can(...permissions) {
    let _authorized = true;
    if (_.isEmpty(permissions)) {
      return false;
    }

    for (let permission of permissions) {
      if (!this._has(permission)) {
        _authorized = false;
        break;
      }
    }

    return _authorized;
  }

  /**
   *
   * @return {Boolean}
   */
  ability(...permissions) {
    let _authorized = false;

    if (_.isEmpty(permissions)) {
      return false;
    }

    for (let permission of permissions) {
      if (this._has(permission)) {
        _authorized = true;
        break;
      }
    }

    return _authorized;
  }
}
