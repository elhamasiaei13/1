// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** policies assignment *****************************************************************
const UPDATE_POLICY_USER_ASSIGNMENT_SUCCESS = 'UPDATE_POLICY_USER_ASSIGNMENT_SUCCESS';
const UPDATE_POLICY_POSITION_ASSIGNMENT_SUCCESS = 'UPDATE_POLICY_POSITION_ASSIGNMENT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** policies assignment *****************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateUserSuccess(payload) {
  return {
    type: UPDATE_POLICY_USER_ASSIGNMENT_SUCCESS,
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
    type: UPDATE_POLICY_POSITION_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** policies assignment *****************************************************************
/**
 *
 * @param {Number} policy
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUsers(policy, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('PolicyAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.policy.Assigning Policy Users'));

      api.put(`/ta/policies/${policy}/users`, {data: {users: data}, params})
        .then((res) => {
          dispatch(_updateUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.policy.Policy Users Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.policy', 'Policy',
            app.translate('routes.home.attendance.policy.Policy User Assignment Failed'),
          ));
          callback(err);
        });
    } else {
      app.message(app.translate('main.Access Error', 'Access Error'), 'error');
      callback(undefined);
    }
  };
}

/**
 *
 * @param {Number} policy
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updatePositions(policy, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('PolicyAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.policy.Assigning Policy Positions'));

      api.put(`/ta/policies/${policy}/positions`, {data: {positions: data}, params})
        .then((res) => {
          dispatch(_updatePositionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.policy.Policy Positions Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.policy', 'Policy',
            app.translate('routes.home.attendance.policy.Policy Position Assignment Failed'),
          ));
          callback(err);
        });
    } else {
      app.message(app.translate('main.Access Error', 'Access Error'), 'error');
      callback(undefined);
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
