// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ******************************************************************** clockings ********************************************************************
const INDEX_CLOCKINGS_SUCCESS = 'INDEX_CLOCKINGS_SUCCESS';
const SHOW_CLOCKING_SUCCESS = 'SHOW_CLOCKING_SUCCESS';
const STORE_CLOCKING_SUCCESS = 'STORE_CLOCKING_SUCCESS';
const UPDATE_CLOCKING_SUCCESS = 'UPDATE_CLOCKING_SUCCESS';
const DESTROY_CLOCKING_SUCCESS = 'DESTROY_CLOCKING_SUCCESS';
const DESTROY_ALL_CLOCKING_SUCCESS = 'DESTROY_ALL_CLOCKING_SUCCESS';
const RESTORE_CLOCKING_SUCCESS = 'RESTORE_CLOCKING_SUCCESS';
const ACCEPT_CLOCKING_SUCCESS = 'ACCEPT_CLOCKING_SUCCESS';
const ACCEPT_ALL_CLOCKING_SUCCESS = 'ACCEPT_ALL_CLOCKING_SUCCESS';
// ***************************************************************** clocking reasons ****************************************************************
const INDEX_CLOCKING_REASONS_SUCCESS = 'INDEX_CLOCKING_REASONS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ******************************************************************** clockings ********************************************************************
/**
 *
 * @param {Array} payload
 * @return {{type: string, payload: *}}
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_CLOCKINGS_SUCCESS,
    payload: {data: payload.data, meta: payload.meta},
  };
}

/**
 *
 * @param {Object} payload
 * @return {{type: string, payload: *}}
 */
function _showSuccess(payload) {
  return {
    type: SHOW_CLOCKING_SUCCESS,
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
    type: STORE_CLOCKING_SUCCESS,
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
    type: UPDATE_CLOCKING_SUCCESS,
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
    type: DESTROY_CLOCKING_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyAllSuccess(payload) {
  return {
    type: DESTROY_ALL_CLOCKING_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _restoreSuccess(payload) {
  return {
    type: RESTORE_CLOCKING_SUCCESS,
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
    type: ACCEPT_CLOCKING_SUCCESS,
    payload: {id: payload, status: status},
  };
}

/**
 *
 * @param {Number} payload
 * @param {String} status
 * @return {{type: String, payload: Object}}
 * @private
 */
function _acceptAllSuccess(payload, status) {
  return {
    type: ACCEPT_ALL_CLOCKING_SUCCESS,
    payload: {ids: payload, status: status},
  };
}

// ***************************************************************** clocking reasons ****************************************************************
/**
 *
 * @param {Array} payload
 * @return {{type: string, payload: *}}
 */
function _indexReasonsSuccess(payload) {
  return {
    type: INDEX_CLOCKING_REASONS_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

/**
 *
 * @param {Array} items
 * @param {Object} reasons
 * @return {Array} Edit Clocking
 */
function getEditClockings(items, reasons) {
  let temp = [];

  items.map((item) => {
    temp.push(Object.assign({},
      item, {
        'className': (item.deletedAt) ? 'record-deleted' : (item.status) ? `record-${item.status}` : '',
        'rowSelectionDisabled': (item.deletedAt ? true : false),
      },
    ));
  });

  return temp;
}

// ******************************************************************** clockings ********************************************************************
/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyClockings() {
  return _indexSuccess({data: {clockings: []}, meta: {}});
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
    if (app.authorize.can('Clocking@forPerson') || app.authorize.can('Clocking@all') || app.authorize.can('Clocking@sub') || app.authorize.can('Clocking@self')) {
      api.get('/ta/clockings', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Indexing Clockings Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} clocking
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(clocking, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Clocking@forPerson') || app.authorize.can('Clocking@all') || app.authorize.can('Clocking@sub') || app.authorize.can('Clocking@self')) {
      api.get(`/ta/clockings/${clocking}`, {
        params: {
          includes: ['type'],
        },
      })
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Indexing Clocking Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function emptyClocking(callback = () => {
}) {
  return _showSuccess({data: {}});
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
    if (app.authorize.can('Clocking@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.clocking.Adding New Clocking'));
      let _path = '/ta/clockings';

      if (acceptAll) {
        _path = `${_path}?acceptAll=true`;
      }

      api.post(_path, {data})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.clocking.New Clocking Added Successfully')));
          callback(undefined, res.data);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Adding New Clocking Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} clocking
 * @param {Object} data
 * @param {Boolean} acceptAll
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(clocking, data, acceptAll, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Clocking@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.clocking.Updating Clocking'));
      let _path = `/ta/clockings/${clocking}`;

      if (acceptAll) {
        _path = `${_path}?acceptAll=true`;
      }

      api.put(_path, {data})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.clocking.Clocking Updated Successfully')));
          callback(undefined, res.data);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Updating Clocking Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} clocking
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(clocking, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Clocking@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.clocking.Removing Clocking'));

      api.delete(`/ta/clockings/${clocking}`)
        .then((res) => {
          dispatch(_destroySuccess(clocking));
          loader.hide(() => app.message(app.translate('routes.home.attendance.clocking.Clocking Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Removing Clocking Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyAll(params, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Clocking@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.clocking.Removing Clocking'));

      api.delete(`/ta/clockings`, {params})
        .then((res) => {
          dispatch(_destroyAllSuccess(params));
          loader.hide(() => app.message(app.translate('routes.home.attendance.clocking.Clocking Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Removing Clocking Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} clocking
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function restore(clocking, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Clocking@restore')) {
      let loader = app.loading(app.translate('routes.home.attendance.clocking.Restoring Clocking'));

      api.put(`/ta/clockings/${clocking}/restore`)
        .then((res) => {
          dispatch(_restoreSuccess(clocking));
          loader.hide(() => app.message(app.translate('routes.home.attendance.clocking.Clocking Restored Successfully')));
          callback(undefined, res.data);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Restoring Clocking Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} clocking
 * @param {String} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function accept(clocking, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Clocking@approve')) {
      let loader = app.loading(app.translate('routes.home.attendance.clocking.Changing Status Clocking'));
      api.put(`/ta/clockings/${clocking}/approve`, {data: {acceptance: data}})
        .then((r) => {
          dispatch(_acceptSuccess(clocking, data));
          loader.hide(() => app.message(app.translate('routes.home.attendance.clocking.Clocking Changed Status Successfully')));
          callback(undefined, data);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Changing Status Clocking Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Object} params
 * @param {String} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function acceptAll(params, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Clocking@approve')) {
      let loader = app.loading(app.translate('routes.home.attendance.clocking.Changing Status Clocking'));
      api.put(`/ta/clockings/approve`, {data: {acceptance: data}, params})
        .then((r) => {
          dispatch(_acceptAllSuccess(params, data));
          loader.hide(() => app.message(app.translate('routes.home.attendance.clocking.Clocking Changed Status Successfully')));
          callback(undefined, data);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.clocking', 'Clocking',
            app.translate('routes.home.attendance.clocking.Changing Status Clocking Failed'),
          ));
          callback(err);
        });
    }
  };
}

// ***************************************************************** clocking reasons ****************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexReasons(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/ta/clockings/reasons', {params})
      .then((res) => {
        dispatch(_indexReasonsSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.attendance.clocking', 'Reason',
          app.translate('routes.home.attendance.clocking.Indexing Clocking Reasons Failed'),
        );
        callback(err);
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
  clockings: [],
  clocking: {},
  reasons: [],
  meta: {},
}, action) {
  let clockings;
  let _index;
  let _clock;
  let _temp;

  switch (action.type) {
    case
    INDEX_CLOCKINGS_SUCCESS:
      clockings = getEditClockings(action.payload.data.clockings, state.reasons);
      return Object.assign({}, state, {
        clockings,
        meta: action.payload.meta,
      });
    case
    SHOW_CLOCKING_SUCCESS:
      return Object.assign({}, state, {
        clocking: action.payload.clocking,
      });
    case
    INDEX_CLOCKING_REASONS_SUCCESS:
      return Object.assign({}, state, {
        reasons: action.payload.clockingReasons,
      });
    case
    STORE_CLOCKING_SUCCESS:
      clockings = app._.cloneDeep(state.clockings);
      clockings.unshift(action.payload);
      _clock = action.payload;
      _clock.className = (_clock.deletedAt) ? 'record-deleted' : (_clock.status) ? `record-${_clock.status}` : '';
      _clock.rowSelectionDisabled = (_clock.deletedAt ? true : false);
      return Object.assign({}, state, {
        clockings,
        clocking: _clock,
      });
    case
    UPDATE_CLOCKING_SUCCESS:
      clockings = app._.cloneDeep(state.clockings);
      _index = clockings.findIndex((_clocking) => _clocking.id === action.payload.id);
      if (_index > -1) {
        _clock = action.payload;
        _clock.className = (_clock.deletedAt) ? 'record-deleted' : (_clock.status) ? `record-${_clock.status}` : '';
        _clock.rowSelectionDisabled = (_clock.deletedAt ? true : false);
        clockings[_index] = Object.assign({}, clockings[_index], _clock);
      }
      return Object.assign({}, state, {
        clockings,
      });
    case
    RESTORE_CLOCKING_SUCCESS:
      clockings = app._.cloneDeep(state.clockings);
      _index = clockings.findIndex((_clocking) => _clocking.id === action.payload);
      if (_index > -1) {
        clockings[_index].className = (clockings[_index].status) ? `record-${clockings[_index].status}` : '';
        clockings[_index].deletedAt = undefined;
        clockings[_index].rowSelectionDisabled = (false);
      }
      return Object.assign({}, state, {
        clockings,
      });
    case
    DESTROY_CLOCKING_SUCCESS:
      clockings = app._.cloneDeep(state.clockings);
      _index = clockings.findIndex((_clocking) => _clocking.id === action.payload);
      if (_index > -1) {
        _clock = clockings[_index];
        _clock.className = 'record-deleted';
        _clock.rowSelectionDisabled = true;
        _clock.deletedAt = '0000-00-00 00:00:00';
        clockings[_index] = _clock;
      }
      return Object.assign({}, state, {
        clockings,
      });
    case
    DESTROY_ALL_CLOCKING_SUCCESS:
      clockings = app._.cloneDeep(state.clockings);
      if (!app._.isEmpty(action.payload) && action.payload.filterGroups &&
        action.payload.filterGroups[0] &&
        action.payload.filterGroups[0].filters &&
        action.payload.filterGroups[0].filters[0] &&
        action.payload.filterGroups[0].filters[0].value) {
        _temp = action.payload.filterGroups[0].filters[0].value;
        for (let x in _temp) {
          _index = clockings.findIndex((_clocking) => _clocking.id === _temp[x]);
          if (_index > -1) {
            _clock = clockings[_index];
            _clock.className = 'record-deleted';
            _clock.rowSelectionDisabled = true;
            _clock.deletedAt = '0000-00-00 00:00:00';
            clockings[_index] = _clock;
          }
        }
      }
      return Object.assign({}, state, {
        clockings,
      });
    case
    ACCEPT_CLOCKING_SUCCESS:
      clockings = app._.cloneDeep(state.clockings);
      _index = clockings.findIndex((_clocking) => _clocking.id === action.payload.id);
      if (_index > -1) {
        _clock = clockings[_index];
        _clock.className = (_clock.deletedAt) ? 'record-deleted' : `record-${action.payload.status}`;
        _clock.rowSelectionDisabled = (_clock.deletedAt ? true : false);
        _clock.status = action.payload.status;
        clockings[_index] = _clock;
      }
      return Object.assign({}, state, {
        clockings,
      });
    case
    ACCEPT_ALL_CLOCKING_SUCCESS:
      clockings = app._.cloneDeep(state.clockings);
      if (!app._.isEmpty(action.payload.ids) && action.payload.ids.filterGroups &&
        action.payload.ids.filterGroups[0] &&
        action.payload.ids.filterGroups[0].filters &&
        action.payload.ids.filterGroups[0].filters[0] &&
        action.payload.ids.filterGroups[0].filters[0].value) {
        _temp = action.payload.ids.filterGroups[0].filters[0].value;
        for (let x in _temp) {
          _index = clockings.findIndex((_clocking) => _clocking.id === _temp[x]);
          if (_index > -1) {
            _clock = clockings[_index];
            _clock.className = (_clock.deletedAt) ? 'record-deleted' : `record-${action.payload.status}`;
            _clock.rowSelectionDisabled = (_clock.deletedAt ? true : false);
            _clock.status = action.payload.status;
            clockings[_index] = _clock;
          }
        }
      }
      return Object.assign({}, state, {
        clockings,
      });
    default:
      return state;
  }
}
