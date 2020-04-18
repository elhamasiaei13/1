// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** shifts assignment *****************************************************************
const UPDATE_SHIFT_USER_ASSIGNMENT_SUCCESS = 'UPDATE_SHIFT_USER_ASSIGNMENT_SUCCESS';
const UPDATE_SHIFT_POSITION_ASSIGNMENT_SUCCESS = 'UPDATE_SHIFT_POSITION_ASSIGNMENT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** shifts assignment *****************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateUserSuccess(payload) {
  return {
    type: UPDATE_SHIFT_USER_ASSIGNMENT_SUCCESS,
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
    type: UPDATE_SHIFT_POSITION_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** shifts assignment *****************************************************************
/**
 *
 * @param {Number} shift
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUsers(shift, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('ShiftAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.shift.Assigning Shift Users'));

      api.put(`/ta/shifts/${shift}/users`, { data: { users: data }, params })
        .then((res) => {
          dispatch(_updateUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.shift.Shift Users Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.shift', 'Shift',
            app.translate('routes.home.attendance.shift.Shift User Assignment Failed')
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
export function updatePositions(shift, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('ShiftAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.shift.Assigning Shift Positions'));

      api.put(`/ta/shifts/${shift}/positions`, { data: { positions: data }, params })
        .then((res) => {
          dispatch(_updatePositionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.shift.Shift Positions Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.shift', 'Shift',
            app.translate('routes.home.attendance.shift.Shift Position Assignment Failed')
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
export default function reducer(state = {}, action) {
  switch (action.type) {
    default: return state;
  }
}
