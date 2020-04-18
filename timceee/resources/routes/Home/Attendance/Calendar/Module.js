// -------------------------------------------------------------------< constants >-------------------------------------------------------------------

// ******************************************************************** calendars ********************************************************************
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE@ATTENDANCE/CALENDAR';
const INDEX_CALENDARS_SUCCESS = 'INDEX_CALENDARS_SUCCESS';
const SHOW_CALENDAR_SUCCESS = 'SHOW_CALENDAR_SUCCESS';
const STORE_CALENDAR_SUCCESS = 'STORE_CALENDAR_SUCCESS';
const UPDATE_CALENDAR_SUCCESS = 'UPDATE_CALENDAR_SUCCESS';
const DESTROY_CALENDAR_SUCCESS = 'DESTROY_CALENDAR_SUCCESS';
// ******************************************************************** day types ********************************************************************
const INDEX_DAY_TYPES_SUCCESS = 'INDEX_DAY_TYPES_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ******************************************************************** calendars ********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_CALENDARS_SUCCESS,
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
    type: SHOW_CALENDAR_SUCCESS,
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
    type: STORE_CALENDAR_SUCCESS,
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
    type: UPDATE_CALENDAR_SUCCESS,
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
    type: DESTROY_CALENDAR_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************** day types ********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexDayTypesSuccess(payload) {
  return {
    type: INDEX_DAY_TYPES_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ******************************************************************** calendars ********************************************************************

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
    if (app.authorize.can('Calendar@index')) {
      api.get('/ta/calendars', { params })
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.calendar', 'Calendar',
            app.translate('routes.home.attendance.calendar.Indexing Calendars Failed')
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
export function emptyCalendars() {
  app.dispatch(setSearchValue());
  return _indexSuccess({ data: { calendars: [] } });
}

/**
 *
 * @param {Number} calendar
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(calendar, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Calendar@index')) {
      api.get(`/ta/calendars/${calendar}`, { params })
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.calendar', 'Calendar',
            app.translate('routes.home.attendance.calendar.Indexing Calendar Failed')
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
export function emptyCalendar() {
  return _showSuccess({ data: { calendar: {} } });
}

/**
 *
 * @param {Object} calendar
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(calendar, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Calendar@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.calendar.Adding New Calendar'));

      api.post('/ta/calendars', { data: { calendar }, params })
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.calendar.New Calendar Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.calendar', 'Calendar',
            app.translate('routes.home.attendance.calendar.Adding New Calendar Failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} calendar
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(calendar, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Calendar@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.calendar.Updating Calendar'));

      api.put(`/ta/calendars/${calendar}`, { data: { calendar: data }, params })
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.calendar.Calendar Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.calendar', 'Calendar',
            app.translate('routes.home.attendance.calendar.Updating Calendar Failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} calendar
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(calendar, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Calendar@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.calendar.Removing Calendar'));

      api.delete(`/ta/calendars/${calendar}`, { params })
        .then((res) => {
          dispatch(_destroySuccess(calendar));
          loader.hide(() => app.message(app.translate('routes.home.attendance.calendar.Calendar Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.calendar', 'Calendar',
            app.translate('routes.home.attendance.calendar.Removing Calendar Failed')
          ));
          callback(err);
        });
    }
  };
}

// ******************************************************************** day types ********************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexDayTypes(params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    api.get('/ta/calendars/days/types', { params })
      .then((res) => {
        dispatch(_indexDayTypesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.attendance.calendar', 'Day Type',
          app.translate('routes.home.attendance.calendar.Indexing Day Types Failed')
        );
        callback(err);
      });
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
  calendars: [],
  pagination: {},
  searchValue: '',
  calendar: {},
  dayTypes: [],
}, action) {
  let _index;
  let _meta;

  switch (action.type) {
    case SET_SEARCH_VALUE:
      return Object.assign({}, state, { searchValue: action.payload });
    case INDEX_CALENDARS_SUCCESS:
      _meta = action.payload.meta;
      return Object.assign({}, state, {
        calendars: action.payload.data.calendars,
        pagination: _meta ? app.pagination(_meta.currentPage + 1, _meta.total, _meta.limit) : {},
      });
    case SHOW_CALENDAR_SUCCESS:
      return Object.assign({}, state, {
        calendar: action.payload.calendar,
      });
    case STORE_CALENDAR_SUCCESS:
      return Object.assign({}, state, {
        calendars: [
          action.payload,
          ...state.calendars,
        ],
      });
    case UPDATE_CALENDAR_SUCCESS:
      _index = state.calendars.findIndex((_calendar) => _calendar.id === action.payload.id);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        calendars: [
          ...state.calendars.slice(0, _index),
          action.payload,
          ...state.calendars.slice(_index + 1, state.calendars.length),
        ],
      });
    case DESTROY_CALENDAR_SUCCESS:
      _index = state.calendars.findIndex((_calendar) => _calendar.id === action.payload);
      if (_index === -1) return state;
      return Object.assign({}, state, {
        calendars: [
          ...state.calendars.slice(0, _index),
          ...state.calendars.slice(_index + 1, state.calendars.length),
        ],
      });
    case INDEX_DAY_TYPES_SUCCESS:
      return Object.assign({}, state, {
        dayTypes: action.payload.calendarDayTypes,
      });
    default:
      return state;
  }
}
