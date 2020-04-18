// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const GET_WRITS_ACCEPTED_REQUESTS_SUCCESS = 'GET_WRITS_ACCEPTED_REQUESTS_SUCCESS';
const GET_WRIT_ACCEPTED_REQUESTS_SUCCESS = 'GET_WRIT_ACCEPTED_REQUESTS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _getRequestWritsSuccess(payload) {
  return {
    type: GET_WRITS_ACCEPTED_REQUESTS_SUCCESS,
    payload: payload.data,
  };
}/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _getRequestWritSuccess(payload) {
  return {
    type: GET_WRIT_ACCEPTED_REQUESTS_SUCCESS,
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
export function getRequestWrits(position, params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/ta/daily_writs/${position}/get_key`, {params})
      .then((r) => {
        dispatch(_getRequestWritsSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}/**
 * @param {number} writsId
 * @param {object} params
 * @param {function} callback
 * @return {Function}
 */
export function getRequestWrit(writsId, params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/ta/daily_writs/${writsId}`, {params})
      .then((r) => {
        dispatch(_getRequestWritSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyRequestWrits() {
  return _getRequestWritsSuccess({data: {daily_writs: []}, meta: {}});
}
/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyRequestWrit() {
  return _getRequestWritSuccess({data: {daily_writ: {}}, meta: {}});
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
  writ: {},
}, action) {
  switch (action.type) {
    case GET_WRITS_ACCEPTED_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        writs: action.payload.writs,
      });
    case GET_WRIT_ACCEPTED_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        writ: action.payload.writ,
      });
    default:
      return state;
  }
}
