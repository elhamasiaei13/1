// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* shifts **********************************************************************
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE@ATTENDANCE/SHIFT/DEFINITION';
const INDEX_SHIFTS_SUCCESS = 'INDEX_SHIFTS_SUCCESS';
const SHOW_SHIFT_SUCCESS = 'SHOW_SHIFT_SUCCESS';
const COPY_SHIFT_SUCCESS = 'COPY_SHIFT_SUCCESS';
const STORE_SHIFT_SUCCESS = 'STORE_SHIFT_SUCCESS';
const UPDATE_SHIFT_SUCCESS = 'UPDATE_SHIFT_SUCCESS';
const DESTROY_SHIFT_SUCCESS = 'DESTROY_SHIFT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* shifts **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_SHIFTS_SUCCESS,
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
    type: SHOW_SHIFT_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _copySuccess(payload) {
  return {
    type: COPY_SHIFT_SUCCESS,
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
    type: STORE_SHIFT_SUCCESS,
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
    type: UPDATE_SHIFT_SUCCESS,
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
    type: DESTROY_SHIFT_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* shifts **********************************************************************

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
    if (app.authorize.can('Shift@index')) {
      api.get('/ta/shifts', { params })
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.shift', 'Shift',
            app.translate('routes.home.attendance.shift.Indexing Shifts Failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyShifts() {
  return _indexSuccess({ data: { shifts: [] } });
}

/**
 *
 * @param {Number} shift
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(shift, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Shift@index')) {
      api.get(`/ta/shifts/${shift}`, { params })
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.shift', 'Shift',
            app.translate('routes.home.attendance.shift.Indexing Shift Failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyShift() {
  return _showSuccess({ data: { shift: {} } });
}

/**
 *
 * @param {Object} shift
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function copy(shift, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Shift@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.shift.Adding New Shift'));

      api.get(`/ta/shifts/${shift.id}/clone`, { params })
        .then((res) => {
          dispatch(_copySuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.shift.New Shift Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.shift', 'Shift',
            app.translate('routes.home.attendance.shift.Adding New Shift Failed')
          ));
          callback(err);
        });
    }
  };
}
/**
 *
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Shift@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.shift.Adding New Shift'));

      api.post('/ta/shifts', { data: { shift: data }, params })
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.shift.New Shift Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.shift', 'Shift',
            app.translate('routes.home.attendance.shift.Adding New Shift Failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} shift
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(shift, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Shift@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.shift.Updating Shift'));

      api.put(`/ta/shifts/${shift}`, { data: { shift: data }, params })
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.shift.Shift Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.shift', 'Shift',
            app.translate('routes.home.attendance.shift.Updating Shift Failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} shift
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(shift, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Shift@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.shift.Removing Shift'));

      api.delete(`/ta/shifts/${shift}`, { params })
        .then((res) => {
          dispatch(_destroySuccess(shift));
          loader.hide(() => app.message(app.translate('routes.home.attendance.shift.Shift Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.shift', 'Shift',
            app.translate('routes.home.attendance.shift.Removing Shift Failed')
          ));
          callback(err);
        });
    }
  };
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {Object} state
 * @param {{type: String, payload: Object}} action
 * @return {Object}
 */
export default function reducer(state = {
  shifts: [],
  pagination: {},
  searchValue: '',
  shift: {},
}, action) {
  let _index;
  let _meta;

  switch (action.type) {
    case SET_SEARCH_VALUE:
      return Object.assign({}, state, { searchValue: action.payload });
    case INDEX_SHIFTS_SUCCESS:
      _meta = action.payload.meta;
      return Object.assign({}, state, {
        shifts: action.payload.data.shifts,
        pagination: _meta ? app.pagination(_meta.currentPage + 1, _meta.total, _meta.limit) : {},
      });
    case SHOW_SHIFT_SUCCESS:
      return Object.assign({}, state, {
        shift: action.payload.shift,
      });
    case COPY_SHIFT_SUCCESS:
      return Object.assign({}, state, {
        shifts: [
          action.payload,
          ...state.shifts,
        ],
      });
    case STORE_SHIFT_SUCCESS:
      return Object.assign({}, state, {
        shifts: [
          action.payload,
          ...state.shifts,
        ],
      });
    case UPDATE_SHIFT_SUCCESS:
      _index = state.shifts.findIndex((_shift) => _shift.id === action.payload.id);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        shifts: [
          ...state.shifts.slice(0, _index),
          action.payload,
          ...state.shifts.slice(_index + 1, state.shifts.length),
        ],
      });
    case DESTROY_SHIFT_SUCCESS:
      _index = state.shifts.findIndex((_shift) => _shift.id === action.payload);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        shifts: [
          ...state.shifts.slice(0, _index),
          ...state.shifts.slice(_index + 1, state.shifts.length),
        ],
      });
    default:
      return state;
  }
}
