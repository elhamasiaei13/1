// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const GET_RECEIVE_REQUESTS_HISTORY_SUCCESS = 'GET_RECEIVE_REQUESTS_HISTORY_SUCCESS';
const GET_RECEIVED_REQUEST_HISTORY_SUCCESS = 'GET_RECEIVED_REQUEST_HISTORY_SUCCESS';
const GET_REQUEST_STATE_DIAGRAM_HISTORY_SUCCESS = 'GET_REQUEST_STATE_DIAGRAM_HISTORY_SUCCESS';
const GET_REQUEST_FORM_FIELDS_HISTORY_SUCCESS = 'GET_REQUEST_FORM_FIELDS_HISTORY_SUCCESS';
const GET_REQUEST_FORM_FIELDS_FAILED = 'GET_REQUEST_FORM_FIELDS_FAILED';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexReceiveRequestsSuccess(payload) {
  return {
    type: GET_RECEIVE_REQUESTS_HISTORY_SUCCESS,
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
    type: GET_REQUEST_STATE_DIAGRAM_HISTORY_SUCCESS,
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
    type: GET_RECEIVED_REQUEST_HISTORY_SUCCESS,
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
    type: GET_REQUEST_FORM_FIELDS_HISTORY_SUCCESS,
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


// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 * @param {Object} params
 * @param {function} callback
 * @return {Function}
 */
export function getReceiveRequests(params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/requests/history`, {params})
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
    api.get(`/requests/${id}`, {params})
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
 * @return {{type: string, payload: *}}
 */
export function emptyRequests() {
  return _indexReceiveRequestsSuccess({data: {requests: []}, meta: {}});
}

/**
 *
 * @return {{type: Object, payload: *}}
 */
export function emptyRequest() {
  return _showRequestSuccess({data: {request: null}});
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
    case GET_RECEIVE_REQUESTS_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        requests: action.payload.data.requests,
        meta: action.payload.meta,
      });
    case GET_RECEIVED_REQUEST_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        request: action.payload.request,
      });
    case GET_REQUEST_STATE_DIAGRAM_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        requestStateDiagram: action.payload.stateDiagram,
      });
    case GET_REQUEST_FORM_FIELDS_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        requestFormFields: action.payload.requestFormFields,
      });
    case GET_REQUEST_FORM_FIELDS_FAILED:
      return Object.assign({}, state, {
        requestFormFields: [],
      });
    default:
      return state;
  }
}
