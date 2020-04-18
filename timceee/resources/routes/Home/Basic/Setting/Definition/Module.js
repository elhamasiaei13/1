// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* settings **********************************************************************
const INDEX_BASIC_SETTINGS_SUCCESS = 'INDEX_BASIC_SETTINGS_SUCCESS';
const SHOW_BASIC_SETTING_SUCCESS = 'SHOW_BASIC_SETTING_SUCCESS';
const STORE_BASIC_SETTING_SUCCESS = 'STORE_BASIC_SETTING_SUCCESS';
const UPDATE_BASIC_SETTING_SUCCESS = 'UPDATE_BASIC_SETTING_SUCCESS';
const DESTROY_BASIC_SETTING_SUCCESS = 'DESTROY_BASIC_SETTING_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* settings **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_BASIC_SETTINGS_SUCCESS,
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
    type: SHOW_BASIC_SETTING_SUCCESS,
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
    type: STORE_BASIC_SETTING_SUCCESS,
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
    type: UPDATE_BASIC_SETTING_SUCCESS,
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
    type: DESTROY_BASIC_SETTING_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* settings **********************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Setting@index')) {
      api.get('/settings', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.setting', 'Setting',
            app.translate('routes.home.basic.setting.Indexing Settings Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Setting', 'Setting')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptySettings() {
  return _indexSuccess({data: {settings: []}, meta:{}});
}

/**
 *
 * @param {Number} setting
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(setting, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Setting@index')) {
      api.get(`/settings/${setting}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.setting', 'Setting',
            app.translate('routes.home.basic.setting.Indexing Setting Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Setting', 'Setting')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptySetting() {
  return _showSuccess({data: {setting: {}}, meta: {}});
}

/**
 *
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Setting@store')) {
      let loader = app.loading(app.translate('routes.home.basic.setting.Adding New Setting'));

      api.post('/settings', {data: {setting: data}, params})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.setting.New Setting Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.setting', 'Setting',
            app.translate('routes.home.basic.setting.Adding New Setting Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Setting', 'Setting')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} setting
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(setting, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Setting@update')) {
      let loader = app.loading(app.translate('routes.home.basic.setting.Updating Setting'));

      api.put(`/settings/${setting}`, {data: {setting: data}, params})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.setting.Setting Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.setting', 'Setting',
            app.translate('routes.home.basic.setting.Updating Setting Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Setting', 'Setting')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} setting
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(setting, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Setting@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.setting.Removing Setting'));

      api.delete(`/settings/${setting}`, {params})
        .then((res) => {
          dispatch(_destroySuccess(setting));
          loader.hide(() => app.message(app.translate('routes.home.basic.setting.Setting Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.setting', 'Setting',
            app.translate('routes.home.basic.setting.Removing Setting Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Setting', 'Setting')} - ${app.translate('routes.home.basic.roles.destroy', 'destroy')}`,
          },
          'permission error',
        ), 'error');
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
  settings: [],
  setting: {},
  meta: {},
}, action) {
  let settings;
  let _index;
  switch (action.type) {
    case INDEX_BASIC_SETTINGS_SUCCESS:
      return Object.assign({}, state, {
        settings: action.payload.data.settings,
        meta: action.payload.meta,
      });
    case SHOW_BASIC_SETTING_SUCCESS:
      return Object.assign({}, state, {
        setting: action.payload.setting,
      });
    case STORE_BASIC_SETTING_SUCCESS:
      settings = app._.cloneDeep(state.settings);
      settings.push(action.payload);
      return Object.assign({}, state, {
        settings,
      });
    case UPDATE_BASIC_SETTING_SUCCESS:
      settings = app._.cloneDeep(state.settings);
      _index = settings.findIndex((_setting) => _setting.id === action.payload.id);
      settings[_index] = action.payload;
      return Object.assign({}, state, {
        settings,
      });
    case DESTROY_BASIC_SETTING_SUCCESS:
      settings = app._.cloneDeep(state.settings);
      _index = settings.findIndex((_setting) => _setting.id === action.payload);
      settings.splice(_index, 1);
      return Object.assign({}, state, {
        settings,
      });
    default:
      return state;
  }
}
