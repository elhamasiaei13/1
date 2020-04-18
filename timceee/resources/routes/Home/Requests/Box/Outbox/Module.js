// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const GET_REQUESTS_SUCCESS = 'GET_REQUESTS_SUCCESS';
const GET_MISSION_REQUESTS_SUCCESS = 'GET_MISSION_REQUESTS_SUCCESS';
const GET_POSTED_REQUESTS_SUCCESS = 'GET_POSTED_REQUESTS_SUCCESS';
const GET_REQUEST_SUCCESS = 'GET_REQUEST_SUCCESS';
const GET_REQUEST_STATE_DIAGRAM_SUCCESS = 'GET_REQUEST_STATE_DIAGRAM_SUCCESS';
const GET_REQUEST_USER_POSITIONS_SUCCESS = 'GET_REQUEST_USER_POSITIONS_SUCCESS';
const GET_REQUEST_FORM_FIELDS_SUCCESS = 'GET_REQUEST_FORM_FIELDS_SUCCESS';
const GET_REQUEST_FORM_FIELDS_FAILED = 'GET_REQUEST_FORM_FIELDS_FAILED';
const STORE_REQUEST_SUCCESS = 'STORE_REQUEST_SUCCESS';
const UPDATE_REQUEST_SUCCESS = 'UPDATE_REQUEST_SUCCESS';
const DESTROY_REQUEST_SUCCESS = 'DESTROY_REQUEST_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _getMissionRequestsSuccess(payload) {
  return {
    type: GET_MISSION_REQUESTS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexRequestsSuccess(payload) {
  return {
    type: GET_REQUESTS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexPostedRequestsSuccess(payload) {
  return {
    type: GET_POSTED_REQUESTS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _showRequestStateDiagramSuccess(payload) {
  return {
    type: GET_REQUEST_STATE_DIAGRAM_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _showRequestSuccess(payload) {
  return {
    type: GET_REQUEST_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _indexRequestUserPositionsSuccess(payload) {
  return {
    type: GET_REQUEST_USER_POSITIONS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _indexRequestFormFieldsSuccess(payload) {
  return {
    type: GET_REQUEST_FORM_FIELDS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @return {{type: object, payload: *}}
 */
function _indexRequestFormFieldsFailed() {
  return {
    type: GET_REQUEST_FORM_FIELDS_FAILED,
    payload: [],
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storeSuccess(payload) {
  return {
    type: STORE_REQUEST_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateSuccess(payload) {
  return {
    type: UPDATE_REQUEST_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroySuccess(payload) {
  return {
    type: DESTROY_REQUEST_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 * @param {number} position
 * @param {object} params
 * @param {function} callback
 * @return {Function}
 */
export function getMissionRequests(position, params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/requests/mission/${position}`, {params})
      .then((r) => {
        dispatch(_getMissionRequestsSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 * @param {object} params
 * @param {function} callback
 * @return {Function}
 */
export function getRequests(params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get('/requests', {params})
      .then((r) => {
        dispatch(_indexRequestsSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 * @param {object} params
 * @param {function} callback
 * @return {Function}
 */
export function getPostedRequests(params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get('/user/requests/posted', {params})
      .then((r) => {
        dispatch(_indexPostedRequestsSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 * @param {Number} id
 * @param {Object} params
 * @param {function} callback
 * @return {Function}
 */
export function getRequest(id, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/requests/${id}`, {params})
      .then((r) => {
        // console.log('ق', r);
        dispatch(_showRequestSuccess(r));
        callback(r);
      })
      .catch((e) => {
        // console.log('', e);
      });
  };
}

/**
 * @param {Number} id
 * @param {function} callback
 * @return {Function}
 */
export function getRequestStateDiagram(id, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/requests/${id}/state_diagram`)
      .then((r) => {
        dispatch(_showRequestStateDiagramSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 *
 * @param {function} callback
 * @return {Function}
 */
export function getRequestUserPositions(callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    let routes = '';
    let include = 'positions.user.profile';
    let type = 'user';
    if (app.authorize.can('Request@posted')) {
      routes = '/user';
      include = 'positions.user.profile';
      type = 'user';
    }
    if (app.authorize.can('Request@sub')) {
      routes = '/user/positions/subset';
      include = 'user.profile';
      type = 'positions';
    }
    if (app.authorize.can('Request@all')) {
      routes = '/positions';
      include = 'user.profile';
      type = 'positions';
    }
    if (routes !== '') {
      api.get(routes, {
        params: {
          includes: [include],
        },
      })
        .then((r) => {
          if (type === 'user') {
            dispatch(_indexRequestUserPositionsSuccess(r.data.user));
          } else {
            dispatch(_indexRequestUserPositionsSuccess(r.data));
          }
          callback(r);
        })
        .catch((e) => {
        });
    }
  };
}

/**
 *
 * @param {function} callback
 * @return {Function}
 */
export function getRequestFormFields(callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get('/requests/forms/fields')

      .then((r) => {
        dispatch(_indexRequestFormFieldsSuccess(r));
        callback(r);
      })
      .catch((e) => {
        dispatch(_indexRequestFormFieldsFailed());
        callback(e);
      });
  };
}


/**
 *
 * @param {Object} data
 * @param {string} acceptAll
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, acceptAll, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.Adding New Request'));
    api.post(`/requests${acceptAll}`, {data})
      .then((r) => {
        if (r.data.id || (r.data[0] && r.data[0].id)) {
          dispatch(_storeSuccess(r));
          loader.hide(() => app.message(app.translate('routes.home.requests.New Request Added Successfully')));
          callback();
        } else {
          loader.hide(() => app.message(app.translate('routes.home.requests.Please check it')));
          callback(r);
        }
      })
      .catch((e) => {

        loader.hide(() => {
          if (e.response && e.response.data) {
            //  console.log(e.response);
            callback(e.response.data, 'store');
            return app.translate('routes.home.requests.Please check it');
          } else {
            return app.translate('routes.home.requests.Adding New Request Failed');
          }
        });
        // loader.hide(() => app.error(
        //   e, 'routes.home.requests.dashboard', 'Request',
        //   (() => {
        //     if (e.response && e.response.data) {
        //       callback(e.response.data, 'store');
        //       return app.translate('routes.home.requests.Please check it');
        //     } else {
        //       return app.translate('routes.home.requests.Adding New Request Failed');
        //     }
        //   })(),
        // ));
      });
  };
}

/**
 *
 * @param {Number} request
 * @param {Object} data
 * @param {string} acceptAll
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(request, data, acceptAll, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.Updating Request', 'Updating Request'));
    api.put(`/requests/${request}${acceptAll}`, {data})
      .then((r) => {
        if (r.data.id) {
          dispatch(_updateSuccess(r));
          loader.hide(() => app.message(app.translate('routes.home.requests.Request Update Successfully', 'Request Update Successfully')));
          callback(undefined, r);
        } else {
          loader.hide(() => app.message(app.translate('routes.home.requests.Please check it')));
          callback(r, 'update');
        }
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.dashboard', 'Request',
          (() => {
            if (e.response && e.response.data) {
              callback(e.response.data, 'update');
              return app.translate('routes.home.requests.Please check it');
            } else {
              return app.translate('routes.home.requests.Updating Request Failed');
            }
          })(),
        ));
      });
  };
}

/**
 *
 * @param {Number} request
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(request, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.Removing Request'));
    api.delete(`/requests/${request}`, {params})
      .then((r) => {
        if (!app._.isEmpty(r.data) && (r.data.confirm || r.data.notice)) {
          loader.hide(() => app.message(app.translate('routes.home.requests.Please check it')));
          callback(r, 'destroy');
        } else {
          dispatch(_destroySuccess(request));
          loader.hide(() => app.message(app.translate('routes.home.requests.Request Removed Successfully')));
          callback(r);
        }
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.dashboard', 'Request',
          app.translate('routes.home.requests.Removing Request Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} request
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function accept(request, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post(`/requests/${request}/accept`)
      .then((r) => {
        dispatch(_destroySuccess(request));
        callback(r);
      })
      .catch((e) => {
        app.error(
          e, 'routes.home.requests.dashboard', 'Request',
          app.translate('routes.home.requests.Accepting Request Failed'),
        );
      });
  };
}

/**
 *
 * @param {Number} request
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function reject(request, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post(`/requests/${request}/reject`)
      .then((r) => {
        dispatch(_destroySuccess(request));
        callback(r);
      })
      .catch((e) => {
        app.error(
          e, 'routes.home.requests.dashboard', 'Request',
          app.translate('routes.home.requests.Rejecting Request Failed'),
        );
      });
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyRequestWrits() {
  return _getMissionRequestsSuccess({data: {writs: []}, meta: {}});
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyRequests() {
  return _indexRequestsSuccess({data: {requests: []}, meta: {}});
}

/**
 *
 * @return {{type: Object, payload: *}}
 */
export function emptyRequest() {
  return _showRequestSuccess({data: {request: null}});
}

/**
 *
 * @return {{type: Object, payload: *}}
 */
export function emptyRequestUserPositions() {
  return _indexRequestUserPositionsSuccess({data: {users: null}});
}

/**
 *
 * @return {{type: Object, payload: *}}
 */
export function emptyRequestFormField() {
  return _indexRequestFormFieldsSuccess({data: {requestFormFields: []}});
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  requests: [],
  request: {},
  requestStateDiagram: [],
  requestForms: [],
  requestFormFields: [],
  requestUserPositions: [],
  meta: {},
  writs: [],
}, action) {
  let requests;
  let _index;

  switch (action.type) {
    case GET_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        requests: action.payload.data.requests,
        meta: action.payload.meta,
      });
    case GET_POSTED_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        requests: action.payload.data.requests,
        meta: action.payload.meta,
      });
    case GET_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        request: action.payload.request,
      });
    case GET_REQUEST_STATE_DIAGRAM_SUCCESS:
      return Object.assign({}, state, {
        requestStateDiagram: action.payload.stateDiagram,
      });
    case GET_REQUEST_USER_POSITIONS_SUCCESS:
      return Object.assign({}, state, {
        requestUserPositions: action.payload.positions,
      });
    case GET_REQUEST_FORM_FIELDS_SUCCESS:
      return Object.assign({}, state, {
        requestFormFields: action.payload.requestFormFields,
      });
    case GET_REQUEST_FORM_FIELDS_FAILED:
      return Object.assign({}, state, {
        requestFormFields: [],
      });
    case STORE_REQUEST_SUCCESS:
      let _requests = [];
      requests = app._.cloneDeep(state.requests);
      if (Array.isArray(action.payload)) {
        _requests.push(...action.payload);
      } else {
        _requests.push(action.payload);
      }
      if (!app._.isEmpty(requests)) {
        _requests.push(...requests);
      }
      return Object.assign({}, state, {
        requests: _requests,
      });
    case UPDATE_REQUEST_SUCCESS:
      requests = app._.cloneDeep(state.requests);
      _index = requests.findIndex((_request) => _request.id === action.payload.id);
      requests[_index] = action.payload;
      return Object.assign({}, state, {
        requests,
      });
    case DESTROY_REQUEST_SUCCESS:
      requests = app._.cloneDeep(state.requests);
      _index = requests.findIndex((_request) => _request.id === action.payload);
      requests.splice(_index, 1);
      return Object.assign({}, state, {
        requests,
      });
    case GET_MISSION_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        writs: action.payload.writs,
      });
    default:
      return state;
  }
}
