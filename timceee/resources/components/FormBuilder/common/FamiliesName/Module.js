// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const GET_FAMILIES_POSITION_REQUESTS_SUCCESS = 'GET_FAMILIES_POSITION_REQUESTS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _getFamiliesSuccess(payload) {
  return {
    type: GET_FAMILIES_POSITION_REQUESTS_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 * @param {number} position
 * @param {object} params
 * @param {function} callback
 * @return {Function}
 */
export function getFamilies(position, params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/positions/${position}`, {params})
      .then((r) => {
        dispatch(_getFamiliesSuccess(r));
        callback(r);
      })
      .catch((e) => {
       // console.log(e);
      });
  };
}
/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyFamilies() {
  return _getFamiliesSuccess({data: {position: {}}, meta: {}});
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  position: {},
}, action) {
  switch (action.type) {
    case GET_FAMILIES_POSITION_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        position: action.payload.position,
      });
    default:
      return state;
  }
}
