// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** rulePacks assignment *****************************************************************
const UPDATE_RULE_PACK_USER_ASSIGNMENT_SUCCESS = 'UPDATE_RULE_PACK_USER_ASSIGNMENT_SUCCESS';
const UPDATE_RULE_PACK_POSITION_ASSIGNMENT_SUCCESS = 'UPDATE_RULE_PACK_POSITION_ASSIGNMENT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** rulePacks assignment *****************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateUserSuccess(payload) {
  return {
    type: UPDATE_RULE_PACK_USER_ASSIGNMENT_SUCCESS,
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
    type: UPDATE_RULE_PACK_POSITION_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** rulePacks assignment *****************************************************************
/**
 *
 * @param {Number} rulePack
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUsers(rulePack, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('RequestRulePackAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.requests.rule-pack.Assigning RulePack Users'));

      api.put(`/requests/rules/packs/${rulePack}/users`, { data: { users: data }, params })
        .then((res) => {
          dispatch(_updateUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.requests.rule-pack.RulePack Users Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.requests.rule-pack', 'RulePack',
            app.translate('routes.home.requests.rule-pack.RulePack User Assignment Failed')
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} rulePack
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updatePositions(rulePack, data, params = {}, callback = () => {}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('RequestRulePackAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.requests.rule-pack.Assigning RulePack Positions'));

      api.put(`/requests/rules/packs/${rulePack}/positions`, { data: { positions: data }, params })
        .then((res) => {
          dispatch(_updatePositionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.requests.rule-pack.RulePack Positions Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.requests.rule-pack', 'RulePack',
            app.translate('routes.home.requests.rule-pack.RulePack Position Assignment Failed')
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
