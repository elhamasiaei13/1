// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const GET_FORM_BUILDER_WRITS_SUCCESS = 'GET_FORM_BUILDER_WRITS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _getWritsSuccess(payload) {
  return {
    type: GET_FORM_BUILDER_WRITS_SUCCESS,
    payload: payload,
  };
}
/**
 * @param {Number} positionId
 * @param {object} params
 * @param {function} callback
 * @return {Function}
 */
export function getWrits(positionId, params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/ta/writs/${positionId}/get_key`, {params})
      .then((r) => {
        dispatch(_getWritsSuccess(r));
        callback(r);
      })
      .catch((e) => {
        callback(e);
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
  writs: [],
}, action) {
  switch (action.type) {
    case GET_FORM_BUILDER_WRITS_SUCCESS:
      return Object.assign({}, state, {
        writs: action.payload.data.writs,
        meta: action.payload.meta,
      });
    default:
      return state;
  }
}
