// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ******************************************************************** procedures *******************************************************************
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE@REQUESTS/PROCEDURE';
const INDEX_REQUEST_WORKFLOWS_SUCCESS = 'INDEX_REQUEST_WORKFLOWS_SUCCESS';
const SHOW_REQUEST_WORKFLOW_SUCCESS = 'SHOW_REQUEST_WORKFLOW_SUCCESS';
const STORE_REQUEST_WORKFLOW_SUCCESS = 'STORE_REQUEST_WORKFLOW_SUCCESS';
const UPDATE_REQUEST_WORKFLOW_SUCCESS = 'UPDATE_REQUEST_WORKFLOW_SUCCESS';
const DESTROY_REQUEST_WORKFLOW_SUCCESS = 'DESTROY_REQUEST_WORKFLOW_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ******************************************************************** procedures *******************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_REQUEST_WORKFLOWS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showSuccess(payload) {
  return {
    type: SHOW_REQUEST_WORKFLOW_SUCCESS,
    payload: payload.data,
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
    type: STORE_REQUEST_WORKFLOW_SUCCESS,
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
    type: UPDATE_REQUEST_WORKFLOW_SUCCESS,
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
    type: DESTROY_REQUEST_WORKFLOW_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ******************************************************************** procedures *******************************************************************

/**
 *
 * @param {String} [searchValue='']
 * @return {{type: String, payload: String}}
 */
export function setSearchValue(searchValue = '') {
  return {
    type: SET_SEARCH_VALUE,
    payload: searchValue,
  };
}

/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    api.get('/requests/workflows', { params })
      .then((res) => {
        dispatch(_indexSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyProcedures() {
  return _indexSuccess({ data: { requestWorkflows: [] } });
}

/**
 *
 * @param {Number} procedure
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(procedure, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    api.get(`/requests/workflows/${procedure}`, { params })
      .then((res) => {
        dispatch(_showSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyProcedure() {
  return _showSuccess({ data: { requestWorkflow: {} } });
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, callback = () => {}) {
  return (dispatch, gs, api) => {
    const loader = app.loading(app.translate('routes.home.requests.procedure.Adding New Procedure'));

    api.post('/requests/workflows', { data: { requestWorkflow: data } })
      .then((res) => {
        dispatch(_storeSuccess(res));
        loader.hide(() => app.message(app.translate('routes.home.requests.procedure.New Procedure Added Successfully')));
        callback(undefined, res);
      })
      .catch((err) => {
        loader.hide(() => app.error(
          err, 'routes.home.requests.procedure', 'Request Procedure',
          app.translate('routes.home.requests.procedure.Adding New Procedure Failed')
        ));
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} device
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(device, data, callback = () => {}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.procedure.Updating Procedure'));

    api.put(`/requests/workflows/${device}`, { data: { requestWorkflow: data } })
      .then((res) => {
        dispatch(_updateSuccess(res));
        loader.hide(() => app.message(app.translate('routes.home.requests.procedure.Procedure Updated Successfully')));
        callback(undefined, res);
      })
      .catch((err) => {
        loader.hide(() => app.error(
          err, 'routes.home.requests.procedure', 'Request Procedure',
          app.translate('routes.home.requests.procedure.Updating Procedure Failed')
        ));
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} device
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(device, callback = () => {}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.procedure.Removing Procedure'));

    api.delete(`/requests/workflows/${device}`)
      .then((res) => {
        dispatch(_destroySuccess(device));
        loader.hide(() => app.message(app.translate('routes.home.requests.procedure.Procedure Removed Successfully')));
        callback(undefined, res);
      })
      .catch((err) => {
        loader.hide(() => app.error(
          err, 'routes.home.requests.procedure', 'Request Procedure',
          app.translate('routes.home.requests.procedure.Removing Procedure Failed')
        ));
        callback(err);
      });
  };
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default function reducer(state = {
  procedures: [],
  pagination: {},
  searchValue: '',
  procedure: {},
}, action) {
  let _index;
  let _meta;

  switch (action.type) {
    case SET_SEARCH_VALUE:
      return Object.assign({}, state, { searchValue: action.payload });
    case INDEX_REQUEST_WORKFLOWS_SUCCESS:
      _meta = action.payload.meta;
      return Object.assign({}, state, {
        procedures: action.payload.data.requestWorkflows,
        pagination: _meta ? app.pagination(_meta.currentPage + 1, _meta.total, _meta.limit) : {},
      });
    case SHOW_REQUEST_WORKFLOW_SUCCESS:
      return Object.assign({}, state, {
        procedure: action.payload.requestWorkflow,
      });
    case STORE_REQUEST_WORKFLOW_SUCCESS:
      return Object.assign({}, state, {
        procedures: [
          action.payload,
          ...state.procedures,
        ],
      });
    case UPDATE_REQUEST_WORKFLOW_SUCCESS:
      _index = state.procedures.findIndex((_device) => _device.id === action.payload.id);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        procedures: [
          ...state.procedures.slice(0, _index),
          action.payload,
          ...state.procedures.slice(_index + 1, state.procedures.length),
        ],
      });
    case DESTROY_REQUEST_WORKFLOW_SUCCESS:
      _index = state.procedures.findIndex((_device) => _device.id === action.payload);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        procedures: [
          ...state.procedures.slice(0, _index),
          ...state.procedures.slice(_index + 1, state.procedures.length),
        ],
      });
    default:
      return state;
  }
}
