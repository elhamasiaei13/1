// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** settings assignment *****************************************************************
const UPDATE_BASIC_SETTING_USER_ASSIGNMENT_SUCCESS = 'UPDATE_BASIC_SETTING_USER_ASSIGNMENT_SUCCESS';
const UPDATE_BASIC_SETTING_POSITION_ASSIGNMENT_SUCCESS = 'UPDATE_BASIC_SETTING_POSITION_ASSIGNMENT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** settings assignment *****************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateUserSuccess(payload) {
  return {
    type: UPDATE_BASIC_SETTING_USER_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updatePositionSuccess(payload) {
  return {
    type: UPDATE_BASIC_SETTING_POSITION_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** settings assignment *****************************************************************
/**
 *
 * @param {Number} setting
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUsers(setting, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('SettingAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.basic.setting.Assigning Setting Users'));

      api.put(`/settings/${setting}/users`, {data: {users: data}, params})
        .then((res) => {
          dispatch(_updateUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.setting.Setting Users Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.setting', 'Setting',
            app.translate('routes.home.basic.setting.Setting User Assignment Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.SettingAssignment', 'SettingAssignment')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
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
export function updatePositions(setting, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('SettingAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.basic.setting.Assigning Setting Positions'));

      api.put(`/settings/${setting}/positions`, {data: {positions: data}, params})
        .then((res) => {
          dispatch(_updatePositionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.setting.Setting Positions Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.setting', 'Setting',
            app.translate('routes.home.basic.setting.Setting Position Assignment Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.SettingAssignment', 'SettingAssignment')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
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
export default function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
