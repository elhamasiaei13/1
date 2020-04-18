// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const GET_REQUESTS_SUCCESS = 'GET_REQUESTS_SUCCESS';
const GET_RECEIVE_REQUESTS_SUCCESS = 'GET_RECEIVE_REQUESTS_SUCCESS';
const GET_RECEIVED_REQUEST_SUCCESS = 'GET_RECEIVED_REQUEST_SUCCESS';
const GET_REQUEST_STATE_DIAGRAM_SUCCESS = 'GET_REQUEST_STATE_DIAGRAM_SUCCESS';
const GET_REQUEST_FORM_FIELDS_SUCCESS = 'GET_REQUEST_FORM_FIELDS_SUCCESS';
const GET_REQUEST_FORM_FIELDS_FAILED = 'GET_REQUEST_FORM_FIELDS_FAILED';
const STORE_REQUEST_SUCCESS = 'STORE_REQUEST_SUCCESS';
const UPDATE_REQUEST_SUCCESS = 'UPDATE_REQUEST_SUCCESS';
const DESTROY_APPROVE_REQUEST_SUCCESS = 'DESTROY_APPROVE_REQUEST_SUCCESS';
const DESTROY_REQUEST_SUCCESS = 'DESTROY_REQUEST_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
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
function _indexReceiveRequestsSuccess(payload) {
  return {
    type: GET_RECEIVE_REQUESTS_SUCCESS,
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
    type: GET_RECEIVED_REQUEST_SUCCESS,
    payload: payload.data,
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

/**
 *
 * @param {Object} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _approveSuccess(payload) {
  return {
    type: DESTROY_APPROVE_REQUEST_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
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
 * @param {Object} params
 * @param {function} callback
 * @return {Function}
 */
export function getReceiveRequests(params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/user/requests/received`, {params})
      .then((r) => {
        dispatch(_indexReceiveRequestsSuccess(r));
        callback(r);
      })
      .catch((e) => {
        callback(e);
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
    api.get(`/requests/received/${id}`, {params})
      .then((r) => {
        dispatch(_showRequestSuccess(r));
        callback(r);
      })
      .catch((e) => {
        // console.log('e',e);
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
 * @return {Function}
 */
export function emptyStateDiagram() {
  return _showRequestStateDiagramSuccess({data: {state_diagram: []}});
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
        if (r.data.id) {
          dispatch(_storeSuccess(r));
          loader.hide(() => app.message(app.translate('routes.home.requests.New Request Added Successfully')));
          callback();
        } else {
          loader.hide(() => app.message(app.translate('routes.home.requests.Please check it')));
          callback(r);
        }
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.dashboard', 'Request',
          app.translate('routes.home.requests.Adding New Request Failed'),
        ));
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
    api.put(`/requests/${request}${acceptAll}`, {data})
      .then((r) => {
        if (r.data.request) {
          dispatch(_updateSuccess(r));
          callback(r);
        } else {
          callback(r);
        }
      })
      .catch((e) => {
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
 * @param {string} acceptAll
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function accept(request, data, acceptAll, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.Accepting Request'));
    api.put(`/requests/approve${acceptAll}`, {data})
      .then((r) => {
        if (!app._.isEmpty(r.data) && (r.data.confirm || r.data.notice)) {
          loader.hide(() => app.message(app.translate('routes.home.requests.Please check it')));
          callback(r, 'accept');
        } else {
          dispatch(_approveSuccess({id: request, status: data.acceptance}));
          loader.hide(() => app.message(app.translate('routes.home.requests.Accepting Request Successfully'), 'success'));
          callback(r);
        }
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.dashboard', 'Request',
          app.translate('routes.home.requests.Accepting Request Failed'),
        ));
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
export function reject(request, data, acceptAll, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.Rejecting Request'));
    api.put(`/requests/approve${acceptAll}`, {data})
      .then((r) => {
        if (!app._.isEmpty(r.data) && (r.data.confirm || r.data.notice)) {
          loader.hide(() => app.message(app.translate('routes.home.requests.Please check it')));
          callback(r, 'reject');
        } else {
          dispatch(_approveSuccess({id: request, status: data.acceptance}));
          loader.hide(() => app.message(app.translate('routes.home.requests.Rejecting Request Successfully'), 'success'));
          callback(r);
        }
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.dashboard', 'Request',
          app.translate('routes.home.requests.Rejecting Request Failed'),
        ));
      });
  };
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
  requestUserPositions: {},
  meta: {},
}, action) {
  let requests = app._.cloneDeep(state.requests);
  let _index;

  switch (action.type) {
    case GET_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        requests: action.payload.data.requests,
        meta: action.payload.meta,
      });
    case GET_RECEIVE_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        requests: action.payload.data.receivedRequests,
        meta: action.payload.meta,
      });
    case GET_RECEIVED_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        request: action.payload.receivedRequest,
      });
    case GET_REQUEST_STATE_DIAGRAM_SUCCESS:
      return Object.assign({}, state, {
        requestStateDiagram: action.payload.stateDiagram,
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
      _requests.push(action.payload);
      if (!app._.isEmpty(requests)) {
        _requests.push(...requests);
      }
      return Object.assign({}, state, {
        requests: _requests,
      });
    case UPDATE_REQUEST_SUCCESS:
      _index = requests.findIndex((_request) => _request.id === action.payload.id);
      requests[_index] = action.payload;
      return Object.assign({}, state, {
        requests,
      });
    case DESTROY_REQUEST_SUCCESS:
      _index = requests.findIndex((_request) => _request.id === action.payload);
      requests.splice(_index, 1);
      return Object.assign({}, state, {
        requests,
      });
    case DESTROY_APPROVE_REQUEST_SUCCESS:
      _index = requests.findIndex((_request) => _request.id === action.payload.id);
      requests[_index].status = action.payload.status;
      requests[_index].active = 0;
      requests[_index].className = 'change-Status';
      return Object.assign({}, state, {
        requests,
      });
    default:
      return state;
  }
}
