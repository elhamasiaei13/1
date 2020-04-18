// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ***************************************************************** working hours *******************************************************************
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE@ATTENDANCE/WORKING_HOURS';
const SET_FACTOR_SEARCH_VALUE = 'SET_FACTOR_SEARCH_VALUE@ATTENDANCE/WORKING_HOURS';
const INDEX_WORKING_HOURS_SUCCESS = 'INDEX_WORKING_HOURS_SUCCESS';
const SHOW_WORKING_HOUR_SUCCESS = 'SHOW_WORKING_HOUR_SUCCESS';
const STORE_WORKING_HOUR_SUCCESS = 'STORE_WORKING_HOUR_SUCCESS';
const COPY_WORKING_HOUR_SUCCESS = 'COPY_WORKING_HOUR_SUCCESS';
const UPDATE_WORKING_HOUR_SUCCESS = 'UPDATE_WORKING_HOUR_SUCCESS';
const DESTROY_WORKING_HOUR_SUCCESS = 'DESTROY_WORKING_HOUR_SUCCESS';
// ******************************************************************** factors **********************************************************************
const INDEX_FACTORS_SUCCESS = 'INDEX_FACTORS_SUCCESS';
const SHOW_FACTOR_SUCCESS = 'SHOW_FACTOR_SUCCESS';
const STORE_FACTOR_SUCCESS = 'STORE_FACTOR_SUCCESS';
const UPDATE_FACTOR_SUCCESS = 'UPDATE_FACTOR_SUCCESS';
const DESTROY_FACTOR_SUCCESS = 'DESTROY_FACTOR_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ***************************************************************** working hours *******************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_WORKING_HOURS_SUCCESS,
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
    type: SHOW_WORKING_HOUR_SUCCESS,
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
    type: STORE_WORKING_HOUR_SUCCESS,
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
    type: COPY_WORKING_HOUR_SUCCESS,
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
    type: UPDATE_WORKING_HOUR_SUCCESS,
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
    type: DESTROY_WORKING_HOUR_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************** factors **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexFactorSuccess(payload) {
  return {
    type: INDEX_FACTORS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showFactorSuccess(payload) {
  return {
    type: SHOW_FACTOR_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storeFactorSuccess(payload) {
  return {
    type: STORE_FACTOR_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateFactorSuccess(payload) {
  return {
    type: UPDATE_FACTOR_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyFactorSuccess(payload) {
  return {
    type: DESTROY_FACTOR_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ****************************************************************** working hours ******************************************************************

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
    if (app.authorize.can('WorkingHour@index')) {
      api.get('/ta/working_hours', { params })
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.working-hours', 'Working Hour',
            app.translate('routes.home.attendance.working-hours.Indexing Working Hours Failed')
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
export function emptyWorkingHours() {
  return _indexSuccess({ data: { workingHours: [] } });
}

/**
 *
 * @param {Number} workingHour
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(workingHour, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('WorkingHour@index')) {
      api.get(`/ta/working_hours/${workingHour}`, { params })
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.working-hours', 'Working Hour',
            app.translate('routes.home.attendance.working-hours.Indexing Working Hour Failed')
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
export function emptyWorkingHour() {
  return _showSuccess({ data: { workingHour: {} } });
}

/**
 *
 * @param {Object} workingHour
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function copy(workingHour, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('WorkingHour@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.working-hours.Adding New Working Hour'));

      api.get(`/ta/working_hours/${workingHour.id}/clone`, { params })
        .then((res) => {
          dispatch(_copySuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.working-hours.New Working Hour Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.working-hours', 'Working Hour',
            app.translate('routes.home.attendance.working-hours.Adding New Working Hour Failed')
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
    if (app.authorize.can('WorkingHour@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.working-hours.Adding New Working Hour'));

      api.post('/ta/working_hours', { data: { workingHour: data }, params })
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.working-hours.New Working Hour Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.working-hours', 'Working Hour',
            app.translate('routes.home.attendance.working-hours.Adding New Working Hour Failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} workingHour
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(workingHour, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('WorkingHour@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.working-hours.Updating Working Hour'));

      api.put(`/ta/working_hours/${workingHour}`, { data: { workingHour: data }, params })
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.working-hours.Working Hour Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.working-hours', 'Working Hour',
            app.translate('routes.home.attendance.working-hours.Updating Working Hour Failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} workingHour
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(workingHour, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('WorkingHour@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.working-hours.Removing Working Hour'));

      api.delete(`/ta/working_hours/${workingHour}`, { params })
        .then((res) => {
          dispatch(_destroySuccess(workingHour));
          loader.hide(() => app.message(app.translate('routes.home.attendance.working-hours.Working Hour Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.working-hours', 'Working Hour',
            app.translate('routes.home.attendance.working-hours.Removing Working Hour Failed')
          ));
          callback(err);
        });
    }
  };
}

// ******************************************************************** factors **********************************************************************

/**
 *
 * @param {String} [searchValue='']
 * @return {{type: String, payload: String}}
 */
export function setFactorsSearchValue(searchValue = '') {
  return {
    type: SET_FACTOR_SEARCH_VALUE,
    payload: searchValue,
  };
}

/**
 *
 * @param {Number} workingHour
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexFactor(workingHour, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Factor@index')) {
      api.get(`/ta/working_hours/${workingHour}/factors`, { params })
        .then((res) => {
          dispatch(_indexFactorSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.working-hours', 'Factor',
            app.translate('routes.home.attendance.working-hours.Indexing Factors Failed')
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
export function emptyFactors() {
  return _indexFactorSuccess({ data: { factors: [] } });
}

/**
 *
 * @param {Number} factor
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showFactor(factor, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Factor@index')) {
      api.get(`/ta/working_hours/factors/${factor}`, { params })
        .then((res) => {
          dispatch(_showFactorSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.working-hours', 'Factor',
            app.translate('routes.home.attendance.working-hours.Indexing Factor Failed')
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
export function emptyFactor() {
  return _showFactorSuccess({ data: { factor: {} } });
}

/**
 *
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeFactor(data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Factor@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.working-hours.Adding New Factor'));

      api.post('/ta/working_hours/factors', { data: { factor: data }, params })
        .then((res) => {
          dispatch(_storeFactorSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.working-hours.New Factor Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.working-hours', 'Factor',
            app.translate('routes.home.attendance.working-hours.Adding New Factor Failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} factor
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateFactor(factor, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Factor@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.working-hours.Updating Factor'));

      api.put(`/ta/working_hours/factors/${factor}`, { data: { factor: data }, params })
        .then((res) => {
          dispatch(_updateFactorSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.working-hours.Factor Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.working-hours', 'Factor',
            app.translate('routes.home.attendance.working-hours.Updating Factor Failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} factor
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyFactor(factor, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Factor@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.working-hours.Removing Factor'));

      api.delete(`/ta/working_hours/factors/${factor}`, { params })
        .then((res) => {
          dispatch(_destroyFactorSuccess(factor));
          loader.hide(() => app.message(app.translate('routes.home.attendance.working-hours.Factor Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.working-hours', 'Factor',
            app.translate('routes.home.attendance.working-hours.Removing Factor Failed')
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
  workingHours: [],
  workingHoursPagination: {},
  workingHoursSearchValue: '',
  workingHour: {},
  factors: [],
  factorsPagination: {},
  factorsSearchValue: '',
  factor: {},
}, action) {
  let _index;
  let _meta;

  switch (action.type) {
    case SET_SEARCH_VALUE:
      return Object.assign({}, state, { workingHoursSearchValue: action.payload });
    case INDEX_WORKING_HOURS_SUCCESS:
      _meta = action.payload.meta;
      return Object.assign({}, state, {
        workingHours: action.payload.data.workingHours,
        workingHoursPagination: _meta ? app.pagination(_meta.currentPage + 1, _meta.total, _meta.limit) : {},
      });
    case SHOW_WORKING_HOUR_SUCCESS:
      return Object.assign({}, state, {
        workingHour: action.payload.workingHour,
      });
    case COPY_WORKING_HOUR_SUCCESS:
      return Object.assign({}, state, {
        workingHour: action.payload,
        workingHours: [
          action.payload,
          ...state.workingHours,
        ],
      });
    case STORE_WORKING_HOUR_SUCCESS:
      return Object.assign({}, state, {
        workingHour: action.payload,
        workingHours: [
          action.payload,
          ...state.workingHours,
        ],
      });
    case UPDATE_WORKING_HOUR_SUCCESS:
      _index = state.workingHours.findIndex((_workingHour) => _workingHour.id === action.payload.id);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        workingHour: action.payload,
        workingHours: [
          ...state.workingHours.slice(0, _index),
          action.payload,
          ...state.workingHours.slice(_index + 1, state.workingHours.length),
        ],
      });
    case DESTROY_WORKING_HOUR_SUCCESS:
      _index = state.workingHours.findIndex((_workingHour) => _workingHour.id === action.payload);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        workingHours: [
          ...state.workingHours.slice(0, _index),
          ...state.workingHours.slice(_index + 1, state.workingHours.length),
        ],
      });
    case SET_FACTOR_SEARCH_VALUE:
      return Object.assign({}, state, { factorsSearchValue: action.payload });
    case INDEX_FACTORS_SUCCESS:
      _meta = action.payload.meta;
      return Object.assign({}, state, {
        factors: action.payload.data.factors,
        factorsPagination: _meta ? app.pagination(_meta.currentPage + 1, _meta.total, _meta.limit) : {},
      });
    case SHOW_FACTOR_SUCCESS:
      return Object.assign({}, state, {
        factor: action.payload.factor,
      });
    case STORE_FACTOR_SUCCESS:
      return Object.assign({}, state, {
        factor: action.payload,
        factors: [
          action.payload,
          ...state.factors,
        ],
      });
    case UPDATE_FACTOR_SUCCESS:
      _index = state.factors.findIndex((_factor) => _factor.id === action.payload.id);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        factor: action.payload,
        factors: [
          ...state.factors.slice(0, _index),
          action.payload,
          ...state.factors.slice(_index + 1, state.factors.length),
        ],
      });
    case DESTROY_FACTOR_SUCCESS:
      _index = state.factors.findIndex((_factor) => _factor.id === action.payload);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        factors: [
          ...state.factors.slice(0, _index),
          ...state.factors.slice(_index + 1, state.factors.length),
        ],
      });
    default:
      return state;
  }
}
