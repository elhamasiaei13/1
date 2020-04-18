// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** packRuleIds assignment *****************************************************************
const UPDATE_STACK_PACK_RULE_USER_ASSIGNMENT_SUCCESS = 'UPDATE_STACK_PACK_RULE_USER_ASSIGNMENT_SUCCESS';
const UPDATE_STACK_PACK_RULE_POSITION_ASSIGNMENT_SUCCESS = 'UPDATE_STACK_PACK_RULE_POSITION_ASSIGNMENT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** packRuleIds assignment *****************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateUserSuccess(payload) {
  return {
    type: UPDATE_STACK_PACK_RULE_USER_ASSIGNMENT_SUCCESS,
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
    type: UPDATE_STACK_PACK_RULE_POSITION_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** packRuleIds assignment *****************************************************************
/**
 *
 * @param {Number} packRuleId
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUsers(packRuleId, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPackRuleAssignment')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Assigning Pack Rule Users'));

      api.put(`/rules/packs/packs/${packRuleId}/users`, { data: { users: data }, params })
        .then((res) => {
          dispatch(_updateUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.Pack Rule Users Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Pack Rule',
            app.translate('routes.home.attendance.stack.Pack Rule User Assignment Failed')
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} packRuleId
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updatePositions(packRuleId, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPackRuleAssignment')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Assigning Pack Rule Positions'));

      api.put(`/rules/packs/packs/${packRuleId}/positions`, { data: { positions: data }, params })
        .then((res) => {
          dispatch(_updatePositionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.Pack Rule Positions Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Pack Rule',
            app.translate('routes.home.attendance.stack.Pack Rule Position Assignment Failed')
          );
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
