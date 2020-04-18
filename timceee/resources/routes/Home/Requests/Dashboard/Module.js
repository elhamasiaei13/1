// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const GET_REQUEST_TYPES_SUCCESS = 'GET_REQUEST_TYPES_SUCCESS';
const GET_USER_REQUEST_TYPES_SUCCESS = 'GET_USER_REQUEST_TYPES_SUCCESS';
const GET_POSITION_REQUEST_TYPES_SUCCESS = 'GET_POSITION_REQUEST_TYPES_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _indexRequestTypesSuccess(payload) {
  return {
    type: GET_REQUEST_TYPES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _indexUserRequestTypesSuccess(payload) {
  return {
    type: GET_USER_REQUEST_TYPES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _indexPositionRequestTypesSuccess(payload) {
  return {
    type: GET_POSITION_REQUEST_TYPES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Object} [params={}]
 * @param {function} callback
 * @return {Function}
 */
export function getRequestTypes(params = {}, callback = (r) => {}) {
  return (dispatch, gs, api) => {
    api.get('/requests/types', { params })
      .then((res) => {
        dispatch(_indexRequestTypesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.requests.dashboard', 'Request Type',
          app.translate('routes.home.requests.Indexing Request Type Failed')
        );
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} position
 * @param {Object} [params={}]
 * @param {function} callback
 * @return {Function}
 */
export function getUserRequestTypes(position = 0, params = {}, callback = (r) => {}) {
  return (dispatch, gs, api) => {
    if (position === 0) {
      callback(undefined, { data: [] });
    } else {
      api.get(`users/${position}/requests/types`, { params })
        .then((res) => {
          dispatch(_indexUserRequestTypesSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.requests.dashboard', 'Request Type',
            app.translate('routes.home.requests.Indexing User Request Type Failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} position
 * @param {Object} [params={}]
 * @param {function} callback
 * @return {Function}
 */
export function getPositionRequestTypes(position = 0, params = {}, callback = (r) => {}) {
  return (dispatch, gs, api) => {
    if (position === 0) {
      callback(undefined, { data: [] });
    } else {
      api.get(`positions/${position}/requests/types`, { params })
        .then((res) => {
          dispatch(_indexPositionRequestTypesSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.requests.dashboard', 'Request Type',
            app.translate('routes.home.requests.Indexing Position Request Type Failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: Object, payload: *}}
 */
export function emptyRequestType() {
  return _indexRequestTypesSuccess({ data: { requestTypes: [] } });
}

/**
 *
 * @return {{type: Object, payload: *}}
 */
export function emptyUserRequestType() {
  return _indexUserRequestTypesSuccess({ data: { requestTypes: [] } });
}

/**
 *
 * @return {{type: Object, payload: *}}
 */
export function emptyPositionRequestType() {
  return _indexPositionRequestTypesSuccess({ data: { requestTypes: [] } });
}


// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  requestTypes: [],
  userOrPositionRequestTypes: [],
}, action) {
  switch (action.type) {
    case GET_REQUEST_TYPES_SUCCESS:
      return Object.assign({}, state, {
        requestTypes: action.payload.requestTypes,
      });
    case GET_USER_REQUEST_TYPES_SUCCESS:
      return Object.assign({}, state, {
        userOrPositionRequestTypes: action.payload.requestTypes,
      });
    case GET_POSITION_REQUEST_TYPES_SUCCESS:
      return Object.assign({}, state, {
        userOrPositionRequestTypes: action.payload.requestTypes,
      });
    default:
      return state;
  }
}
