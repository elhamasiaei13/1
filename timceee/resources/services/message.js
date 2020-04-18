import {message as antdMessage} from 'antd';

/**
 *
 * @param {!String} message
 * @param {String} [status=success] - success, error, warning, info
 * @param {Number} [duration=3] - in second
 * @param {Function} [callback=(function())]
 * @return {*}
 */
export default (message, status = 'success', duration = 3, callback = () => {
}) => {
  switch (status) {
    case 'info':
      return antdMessage.info(message, duration, callback);
    case 'error':
      return antdMessage.error(message, duration, callback);
    case 'warning':
    case 'warn':
      return antdMessage.warning(message, duration, callback);
    case 'success':
    default:
      return antdMessage.success(message, duration, callback);
  }
};
