import {notification as antdNotification} from 'antd';

/**
 *
 * @param {!String} message
 * @param {!String} description
 * @param {String} [status=success] - success, error, warning, info
 * @param {Number} [duration=3] - in second
 * @param {Function} [callback=(function())]
 * @return {*}
 */
export default (message, description = '', status = 'success', duration = 3, callback = () => {
}) => {
  antdNotification.config({
    placement: 'bottomLeft',
    bottom: 50,
    duration: 3,
  });
  switch (status) {
    case 'info':
      return antdNotification.info(message, description, duration, callback);
    case 'error':
      return antdNotification.error(message, description, duration, callback);
    case 'warning':
    case 'warn':
      return antdNotification.warning(message, description, duration, callback);
    case 'success':
    default:
      return antdNotification.success(message, description, duration, callback);
  }
};
