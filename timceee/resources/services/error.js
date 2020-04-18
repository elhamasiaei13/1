import Lang from './Lang';
import message from './message';
import _ from 'lodash';

const lang = new Lang();
const translate = lang.translate;

/**
 *
 * @param {Object} error
 * @param {String} module
 */
const _500 = (error, module) => {
  message(translate('errors.500'), 'error');
};

/**
 *
 * @param {Object} error
 * @param {String} module
 */
const _429 = (error, module) => {
  message(translate('errors.429'), 'error');
};

/**
 *
 * @param {Object} error
 * @param {String} module
 */
const _422 = (error, module) => {
  const fields = error.response.data.errors;
  let _duration = 3;

  for (let field in fields) {
    switch (fields[field][0].code) { // TODO
      case 'exists_rule':
        message(translate('errors.422-exists', {target: translate(`${module}.${_.lowerCase(field)}`, `${_.lowerCase(field)}`)}), 'error', _duration);
        break;
      case 'required_rule':
        message(translate('errors.422-required', {target: translate(`${module}.${_.startCase(field)}`, `${_.lowerCase(field)}`)}), 'error', _duration);
        break;
      case 'unique_rule':
        message(translate('errors.422-unique', {target: translate(`${module}.${_.startCase(field)}`, `${_.lowerCase(field)}`)}), 'error', _duration);
        break;
      default:
        message(translate('errors.err', {code: 422}), 'error', _duration);
    }

    _duration += .5;
  }
};

/**
 *
 * @param  {Object} error
 * @param  {String} target
 */
const _404 = (error, target) => {
  message(translate('errors.404', {target}), 'error');
};

/**
 *
 * @param {*} error
 * @param {String} module
 * @param {String} section
 * @param {String} def
 */
export default function error(error, module, section, def) {
  if (error.response) {
    switch (error.response.status) {
      case 500:
        _500(error, module);
        break;
      case 429:
        _429(error, module);
        break;
      case 422:
        _422(error, module);
        break;
      case 404:
        _404(error, translate(`${module}.${section}`));
        break;
      default:
        if (def) {
          message(def, 'error');
        } else {
          message(translate('errors.err', {code: error.response.status}), 'error');
        }
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    message(translate('errors.internal'), 'error');
  }
}
