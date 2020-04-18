import {message as antdMessage} from 'antd';
import {autobind} from 'core-decorators';

@autobind
/**
 *
 */
export default class Loading {
  /**
   *
   * @param {String|Node} message
   * @param {Function} [callback=(function())]
   */
  constructor(message, callback = () => {
  }) {
    this._loader = antdMessage.loading(message, 0, callback);
  }

  /**
   * hides the loader in 0 ms
   * @param {Function} [callback=(function())]
   */
  hide(callback = () => {
  }) {
    this._loader();
    callback();
  }
}
