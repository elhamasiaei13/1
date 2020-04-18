const REGISTER = '@@form/REGISTER';
const INITIALIZE = '@@form/INITIALIZE';
const DEREGISTER = '@@form/DEREGISTER';

/**
 *
 * @param {String} form
 * @return {{type: String, payload: {form: String}}}
 */
export function register(form) {
  return {
    type: REGISTER,
    payload: {
      form,
    },
  };
}

/**
 *
 * @param {String} form
 * @param {Object} values
 * @return {{type: String, payload: {form: String, values: Object}}}
 */
export function initialize(form, values) {
  return {
    type: INITIALIZE,
    payload: {
      form,
      values,
    },
  };
}

/**
 *
 * @param {String} form
 * @return {{type: String, payload: {form: String}}}
 */
export function deRegister(form) {
  return {
    type: DEREGISTER,
    payload: {
      form,
    },
  };
}

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default function reducer(state = {}, action) {
  switch (action.type) {
    case REGISTER:
      return Object.assign({}, state, {
        [action.payload.form]: {},
      });
    case INITIALIZE:
      return Object.assign({}, state, {
        [action.payload.form]: action.payload.values,
      });
    case DEREGISTER:
      return Object.assign({}, state, {
        [action.payload.form]: undefined,
      });
    default:
      return state;
  }
}
