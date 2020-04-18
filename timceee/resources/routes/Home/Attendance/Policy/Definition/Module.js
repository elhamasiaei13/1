// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ***************************************************************** Policies *******************************************************************
const INDEX_POLICIES_SUCCESS = 'INDEX_POLICIES_SUCCESS';
const SHOW_POLICY_SUCCESS = 'SHOW_POLICY_SUCCESS';
const STORE_POLICY_SUCCESS = 'STORE_POLICY_SUCCESS';
const UPDATE_POLICY_SUCCESS = 'UPDATE_POLICY_SUCCESS';
const DESTROY_POLICY_SUCCESS = 'DESTROY_POLICY_SUCCESS';
// ******************************************************************** policyRules **********************************************************************
const INDEX_POLICY_RULES_SUCCESS = 'INDEX_POLICY_RULES_SUCCESS';
const SHOW_POLICY_RULE_SUCCESS = 'SHOW_POLICY_RULE_SUCCESS';
const STORE_POLICY_RULE_SUCCESS = 'STORE_POLICY_RULE_SUCCESS';
const UPDATE_POLICY_RULE_SUCCESS = 'UPDATE_POLICY_RULE_SUCCESS';
const DESTROY_POLICY_RULE_SUCCESS = 'DESTROY_POLICY_RULE_SUCCESS';

const INDEX_POLICY_RULES_FORM_SUCCESS = 'INDEX_POLICY_RULES_FORM_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ***************************************************************** Policies *******************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_POLICIES_SUCCESS,
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
    type: SHOW_POLICY_SUCCESS,
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
    type: STORE_POLICY_SUCCESS,
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
    type: UPDATE_POLICY_SUCCESS,
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
    type: DESTROY_POLICY_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************** policyRules **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexPolicyRulesSuccess(payload) {
  return {
    type: INDEX_POLICY_RULES_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showPolicyRuleSuccess(payload) {
  return {
    type: SHOW_POLICY_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storePolicyRuleSuccess(payload) {
  return {
    type: STORE_POLICY_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updatePolicyRuleSuccess(payload) {
  return {
    type: UPDATE_POLICY_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyPolicyRuleSuccess(payload) {
  return {
    type: DESTROY_POLICY_RULE_SUCCESS,
    payload: payload,
  };
}


/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showRule(payload) {
  return {
    type: INDEX_POLICY_RULES_FORM_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ***************************************************************** Policies *******************************************************************
/**
 *
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/ta/policies', {params})
      .then((r) => {
        dispatch(_indexSuccess(r));
        callback(false, r);
      })
      .catch((e) => {
        callback(e);
      });
  };
}

/**
 *
 * @param {Number} policy
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(policy, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/ta/policies/${policy}`, {params})
      .then((r) => {
        dispatch(_showSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 *
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showForm(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/ta/policies/rules`, {params})
      .then((res) => {
        dispatch(_showRule(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.attendance.rules', 'Rule',
          app.translate('routes.home.attendance.report.Indexing Rules Failed'),
        );
        callback(err);
      });

  };
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.attendance.policy.Adding New Policy'));

    api.post('/ta/policies', {data})
      .then((r) => {
        dispatch(_storeSuccess(r));
        loader.hide(() => app.message(app.translate('routes.home.attendance.policy.New Policy Added Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.attendance.policy', 'Policy',
          app.translate('routes.home.attendance.policy.Adding New Policy Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} policy
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(policy, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.attendance.policy.Updating Policy'));

    api.put(`/ta/policies/${policy}`, {data})
      .then((r) => {
        dispatch(_updateSuccess(r));
        loader.hide(() => app.message(app.translate('routes.home.attendance.policy.Policy Updated Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.attendance.policy', 'Policy',
          app.translate('routes.home.attendance.policy.Updating Policy Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} policy
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(policy, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.attendance.policy.Removing Policy'));

    api.delete(`/ta/policies/${policy}`)
      .then((r) => {
        dispatch(_destroySuccess(policy));
        loader.hide(() => app.message(app.translate('routes.home.attendance.policy.Policy Removed Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.attendance.policy', 'Policy',
          app.translate('routes.home.attendance.policy.Removing Policy Failed'),
        ));
      });
  };
}

/**
 *
 * @return {Function}
 */
export function emptyPolicies() {
  return _indexSuccess({data: {policies: []}, meta: {}});
}

/**
 *
 * @return {Function}
 */
export function emptyRule() {
  return _showRule({data: {rule: {}}});
}

// ******************************************************************** policyRules **********************************************************************
/**
 *
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexPolicyRules(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/policyRules', {params})
      .then((r) => {
        dispatch(_indexPolicyRulesSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 *
 * @param {Number} policyRule
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showPolicyRule(policyRule, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/ta/policies/rules/${policyRule}`, {params})
      .then((res) => {
        dispatch(_showPolicyRuleSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} id
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storePolicyRule(id, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.attendance.policy.Adding New PolicyRule'));

    api.post(`/ta/policies/${id}/rules`, {data})
      .then((r) => {
        dispatch(_storePolicyRuleSuccess(r));
        loader.hide(() => app.message(app.translate('routes.home.attendance.policy.New PolicyRule Added Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.attendance.policy', 'Policy',
          app.translate('routes.home.attendance.policy.Adding New Policy Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} id
 * @param {Number} policyRule
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updatePolicyRule(id, policyRule, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.attendance.policy.Updating PolicyRule'));

    api.put(`/ta/policies/${id}/rules/${policyRule}`, {data})
      .then((r) => {
        dispatch(_updatePolicyRuleSuccess(r));
        loader.hide(() => app.message(app.translate('routes.home.attendance.policy.PolicyRule Updated Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.attendance.policy', 'Policy',
          app.translate('routes.home.attendance.policy.Updating PolicyRule Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} id
 * @param {Number} policyRule
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyPolicyRule(id, policyRule, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.attendance.policy.Removing PolicyRule'));

    api.delete(`/ta/policies/${id}/rules/${policyRule}`)
      .then((r) => {
        dispatch(_destroyPolicyRuleSuccess(policyRule));
        loader.hide(() => app.message(app.translate('routes.home.attendance.policy.PolicyRule Removed Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.attendance.policy', 'Policy',
          app.translate('routes.home.attendance.policy.Removing PolicyRule Failed'),
        ));
      });
  };
}


/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyPolicy() {
  return _showSuccess({data: {policy: {}}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyPolicyRules() {
  return _indexPolicyRulesSuccess({data: {policyRules: {}}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyPolicyRule() {
  return _showPolicyRuleSuccess({data: {policyRule: {}}});
}


// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {Object} state
 * @param {{type: String, payload: Object}} action
 * @return {Object}
 */
export default function reducer(state = {
  policies: [],
  policy: {},
  policyRules: [],
  policyRule: {},
  metaPolicies: {},
  metaPolicyRules: {},
  rules: [],
}, action) {
  let policies;
  let policy;
  let _index;

  switch (action.type) {
    case INDEX_POLICIES_SUCCESS:
      return Object.assign({}, state, {
        policies: action.payload.data.policies,
        metaPolicies: action.payload.meta,
      });
    case SHOW_POLICY_SUCCESS:
      return Object.assign({}, state, {
        policy: action.payload.policy,
      });
    case STORE_POLICY_SUCCESS:
      policies = app._.cloneDeep(state.policies);
      policies.push(action.payload);
      return Object.assign({}, state, {
        policy: action.payload,
        policies,
      });
    case UPDATE_POLICY_SUCCESS:
      policies = app._.cloneDeep(state.policies);
      policy = app._.cloneDeep(state.policy);
      _index = policies.findIndex((_policy) => _policy.id === action.payload.id);
      policies[_index] = action.payload;
      policy.name = action.payload.name;
      policy.description = action.payload.description;
      return Object.assign({}, state, {
        policy,
        policies,
      });
    case DESTROY_POLICY_SUCCESS:
      policies = app._.cloneDeep(state.policies);
      _index = policies.findIndex((_policy) => _policy.id === action.payload);
      policies.splice(_index, 1);
      return Object.assign({}, state, {
        policies,
        policy: null,
        policyRule: null,
      });
    case INDEX_POLICY_RULES_SUCCESS:
      return Object.assign({}, state, {
        policyRules: action.payload.data.policyRules,
        metaPolicyRules: action.payload.meta,
      });
    case SHOW_POLICY_RULE_SUCCESS:
      return Object.assign({}, state, {
        policyRule: action.payload.policyRule,
      });
    case STORE_POLICY_RULE_SUCCESS:
      policy = app._.cloneDeep(state.policy);
      let _rules = [];
      _rules.push(action.payload);
      if (!app._.isEmpty(policy.rules)) {
        _rules.push(...policy.rules);
      }
      policy.rules = _rules;
      return Object.assign({}, state, {
        policyRule: action.payload,
        policy,
      });
    case UPDATE_POLICY_RULE_SUCCESS:
      policy = app._.cloneDeep(state.policy);
      _index = policy.rules.findIndex((_policyRule) => _policyRule.id === action.payload.id);
      policy.rules[_index] = action.payload;
      return Object.assign({}, state, {
        policyRule: action.payload,
        policy,
      });
    case DESTROY_POLICY_RULE_SUCCESS:
      policy = app._.cloneDeep(state.policy);
      _index = policy.rules.findIndex((_policyRule) => _policyRule.id === action.payload);
      policy.rules.splice(_index, 1);
      return Object.assign({}, state, {
        policy,
      });
    case INDEX_POLICY_RULES_FORM_SUCCESS:
      return Object.assign({}, state, {
        rules: action.payload.rules,
      });
    default:
      return state;
  }
}
