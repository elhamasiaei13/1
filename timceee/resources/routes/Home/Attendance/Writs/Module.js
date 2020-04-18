// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ******************************************************************** writs ********************************************************************
const INDEX_WRITS_SUCCESS = 'INDEX_WRITS_SUCCESS';
const SHOW_WRIT_SUCCESS = 'SHOW_WRIT_SUCCESS';
const STORE_WRIT_SUCCESS = 'STORE_WRIT_SUCCESS';
const UPDATE_WRIT_SUCCESS = 'UPDATE_WRIT_SUCCESS';
const DESTROY_WRIT_SUCCESS = 'DESTROY_WRIT_SUCCESS';
const ACCEPT_WRIT_SUCCESS = 'ACCEPT_WRIT_SUCCESS';
const GET_WRIT_STATE_DIAGRAM_SUCCESS = 'GET_WRIT_STATE_DIAGRAM_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ******************************************************************** writs ********************************************************************
/**
 *
 * @param {Array} payload
 * @return {{type: string, payload: *}}
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_WRITS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {Object} payload
 * @return {{type: string, payload: *}}
 */
function _showSuccess(payload) {
  return {
    type: SHOW_WRIT_SUCCESS,
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
    type: STORE_WRIT_SUCCESS,
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
    type: UPDATE_WRIT_SUCCESS,
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
    type: DESTROY_WRIT_SUCCESS,
    payload: payload,
  };
}


/**
 *
 * @param {Number} payload
 * @param {String} status
 * @return {{type: String, payload: Object}}
 * @private
 */
function _acceptSuccess(payload, status) {
  return {
    type: ACCEPT_WRIT_SUCCESS,
    payload: {id: payload, status: status},
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

/**
 *
 * @param {Array} items
 * @return {Array} Edit Writs
 */
function getEditWrits(items) {
  let temp = [];

  items.map((item) => {
    temp.push(Object.assign({},
      item, {
        'className': (item.deletedAt) ? 'record-deleted' : (item.status) ? `record-${item.status}` : '',
      },
    ));
  });

  return temp;
}

// ******************************************************************** writs ********************************************************************
/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyWrits() {
  return _indexSuccess({data: {writs: []}, meta: {}});
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyWrit() {
  return _showSuccess({data: {writ: {}}});
}

/**
 *
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Writ@index')) {
      api.get('/ta/writs', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.writs', 'Writ',
            app.translate('routes.home.attendance.writs.Indexing Writs Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} writs
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(writs, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Writ@index')) {
      api.get(`/ta/writs/${writs}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.writs', 'Writ',
            app.translate('routes.home.attendance.writs.Indexing Writs Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Object} data
 * @param {Boolean} acceptAll
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, acceptAll, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Writ@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.writs.Adding New Writs'));
      let _path = '/ta/writs';

      if (acceptAll) {
        _path = `${_path}?acceptAll=true`;
      }

      api.post(_path, {data})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.writs.New Writs Added Successfully')));
          callback(undefined, res.data);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.writs', 'Writ',
            app.translate('routes.home.attendance.writs.Adding New Writs Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} writs
 * @param {Object} data
 * @param {Boolean} acceptAll
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(writs, data, acceptAll, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Writ@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.writs.Updating Writs'));
      let _path = `/ta/writs/${writs}`;

      if (acceptAll) {
        _path = `${_path}?acceptAll=true`;
      }

      api.put(_path, {data})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.writs.Writs Updated Successfully')));
          callback(undefined, res.data);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.writs', 'Writ',
            app.translate('routes.home.attendance.writs.Updating Writs Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} writs
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(writs, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Writ@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.writs.Removing Writs'));

      api.delete(`/ta/writs/${writs}`)
        .then((res) => {
          dispatch(_destroySuccess(writs));
          loader.hide(() => app.message(app.translate('routes.home.attendance.writs.Writs Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.writs', 'Writ',
            app.translate('routes.home.attendance.writs.Removing Writs Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} writs
 * @param {String} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function accept(writs, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Writ@approve')) {
      let loader = app.loading(app.translate('routes.home.attendance.writs.Changing Status Writs'));
      api.put(`/ta/writs/${writs}/approve`, {data: {acceptance: data}})
        .then((r) => {
          dispatch(_acceptSuccess(writs, data));
          loader.hide(() => app.message(app.translate('routes.home.attendance.writs.Writs Changed Status Successfully')));
          callback(undefined, data);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.writs', 'Writ',
            app.translate('routes.home.attendance.writs.Indexing Writs Failedroutes.home.attendance.writs.Changing Status Writs Failed'),
          ));
          callback(err);
        });
    }
  };
}


/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _showStateDiagramSuccess(payload) {
  return {
    type: GET_WRIT_STATE_DIAGRAM_SUCCESS,
    payload: payload.data,
  };
}

/**
 * @param {Number} id
 * @param {function} callback
 * @return {Function}
 */
export function getStateDiagram(id, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/requests/${id}/state_diagram`)
      .then((r) => {
        dispatch(_showStateDiagramSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 *
 * @return {{type: object, payload: *}}
 */
export function emptyStateDiagram() {
  return _showStateDiagramSuccess({data: {stateDiagram: []}});
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
  meta: {},
  stateDiagram: [],
}, action) {
  let writs = app._.cloneDeep(state.writs);
  let _index;
  let _clock;

  switch (action.type) {
    case INDEX_WRITS_SUCCESS:
      writs = getEditWrits(action.payload.data.writs);
      return Object.assign({}, state, {
        writs,
        meta: action.payload.meta,
      });
    case SHOW_WRIT_SUCCESS:
      return Object.assign({}, state, {
        writ: action.payload.writ,
      });
    case STORE_WRIT_SUCCESS:
      writs.unshift(action.payload);
      _clock = action.payload;
      _clock.className = (_clock.deletedAt) ? 'record-deleted' : (_clock.status) ? `record-${_clock.status}` : '';
      return Object.assign({}, state, {
        writs,
        writ: _clock,
      });
    case UPDATE_WRIT_SUCCESS:
      _index = writs.findIndex((_writs) => _writs.id === action.payload.id);
      _clock = action.payload;
      _clock.className = (_clock.deletedAt) ? 'record-deleted' : (_clock.status) ? `record-${_clock.status}` : '';
      writs[_index] = _clock;
      return Object.assign({}, state, {
        writs,
      });
    case DESTROY_WRIT_SUCCESS:
      _index = writs.findIndex((_writs) => _writs.id === action.payload);
      writs.splice(_index, 1);
      return Object.assign({}, state, {
        writs,
      });
    case ACCEPT_WRIT_SUCCESS:
      _index = writs.findIndex((_writs) => _writs.id === action.payload.id);
      _clock = writs[_index];
      _clock.className = (_clock.deletedAt) ? 'record-deleted' : `record-${action.payload.status}`;
      _clock.status = action.payload.status;
      writs[_index] = _clock;
      return Object.assign({}, state, {
        writs,
      });
    case GET_WRIT_STATE_DIAGRAM_SUCCESS:
      return Object.assign({}, state, {
        stateDiagram: action.payload.stateDiagram,
      });
    default:
      return state;
  }
}
