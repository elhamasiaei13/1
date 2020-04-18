// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const GET_FORM_SUCCESS = 'GET_FORM_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _getFormSuccess(payload) {
  return {
    type: GET_FORM_SUCCESS,
    payload: payload,
  };
}

/**
 * @param {Number} formId
 * @param {object} params
 * @param {function} callback
 * @return {Function}
 */
export function getForm(formId, params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/forms/${formId}`, {params})
      .then((r) => {
        dispatch(_getFormSuccess(r));
        callback(undefined, r);
      })
      .catch((e) => {
        callback(e, undefined);
      });
  };
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  fields: {},
}, action) {
  switch (action.type) {
    case GET_FORM_SUCCESS:
      return Object.assign({}, state, {
        fields: action.payload.data.form,
        meta: action.payload.meta,
      });
    default:
      return state;
  }
}
