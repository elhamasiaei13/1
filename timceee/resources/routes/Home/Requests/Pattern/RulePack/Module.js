// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ***************************************************************** RulePacks *******************************************************************
const INDEX_RULE_PACKS_SUCCESS = 'INDEX_RULE_PACKS_SUCCESS';
const SHOW_RULE_PACK_SUCCESS = 'SHOW_RULE_PACK_SUCCESS';
const STORE_RULE_PACK_SUCCESS = 'STORE_RULE_PACK_SUCCESS';
const UPDATE_RULE_PACK_SUCCESS = 'UPDATE_RULE_PACK_SUCCESS';
const DESTROY_RULE_PACK_SUCCESS = 'DESTROY_RULE_PACK_SUCCESS';
// ******************************************************************** rulePackRules **********************************************************************
const INDEX_RULE_PACK_RULES_SUCCESS = 'INDEX_RULE_PACK_RULES_SUCCESS';
const SHOW_RULE_PACK_RULE_SUCCESS = 'SHOW_RULE_PACK_RULE_SUCCESS';
const STORE_RULE_PACK_RULE_SUCCESS = 'STORE_RULE_PACK_RULE_SUCCESS';
const UPDATE_RULE_PACK_RULE_SUCCESS = 'UPDATE_RULE_PACK_RULE_SUCCESS';
const DESTROY_RULE_PACK_RULE_SUCCESS = 'DESTROY_RULE_PACK_RULE_SUCCESS';

const INDEX_RULE_PACK_RULES_FORM_SUCCESS = 'INDEX_RULE_PACK_RULES_FORM_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ***************************************************************** RulePacks *******************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_RULE_PACKS_SUCCESS,
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
    type: SHOW_RULE_PACK_SUCCESS,
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
    type: STORE_RULE_PACK_SUCCESS,
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
    type: UPDATE_RULE_PACK_SUCCESS,
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
    type: DESTROY_RULE_PACK_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************** rulePackRules **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexRulePackRulesSuccess(payload) {
  return {
    type: INDEX_RULE_PACK_RULES_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showRulePackRuleSuccess(payload) {
  return {
    type: SHOW_RULE_PACK_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storeRulePackRuleSuccess(payload) {
  return {
    type: STORE_RULE_PACK_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateRulePackRuleSuccess(payload) {
  return {
    type: UPDATE_RULE_PACK_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyRulePackRuleSuccess(payload) {
  return {
    type: DESTROY_RULE_PACK_RULE_SUCCESS,
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
    type: INDEX_RULE_PACK_RULES_FORM_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ***************************************************************** RulePacks *******************************************************************
/**
 *
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/requests/rules/packs', {params})
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
 * @param {Number} rulePack
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(rulePack, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/requests/rules/packs/${rulePack}`, {params})
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
 * @param {Number} rule
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showForm(rule, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/ta/rules/${rule}`, {params})
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
    let loader = app.loading(app.translate('routes.home.requests.rule-pack.Adding New RulePack'));

    api.post('/requests/rules/packs', {data})
      .then((r) => {
        dispatch(_storeSuccess(r));
        loader.hide(() => app.message(app.translate('routes.home.requests.rule-pack.New RulePack Added Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.rule-pack', 'RulePack',
          app.translate('routes.home.requests.rule-pack.Adding New RulePack Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} rulePack
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(rulePack, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.rule-pack.Updating RulePack'));

    api.put(`/requests/rules/packs/${rulePack}`, {data})
      .then((r) => {
        dispatch(_updateSuccess(r));
        loader.hide(() => app.message(app.translate('routes.home.requests.rule-pack.RulePack Updated Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.rule-pack', 'RulePack',
          app.translate('routes.home.requests.rule-pack.Updating RulePack Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} rulePack
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(rulePack, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.rule-pack.Removing RulePack'));

    api.delete(`/requests/rules/packs/${rulePack}`)
      .then((r) => {
        dispatch(_destroySuccess(rulePack));
        loader.hide(() => app.message(app.translate('routes.home.requests.rule-pack.RulePack Removed Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.rule-pack', 'RulePack',
          app.translate('routes.home.requests.rule-pack.Removing RulePack Failed'),
        ));
      });
  };
}

/**
 *
 * @return {Function}
 */
export function emptyRulePacks() {
  return _indexSuccess({data: {rulePacks: []}, meta: {}});
}

/**
 *
 * @return {Function}
 */
export function emptyRule() {
  return _showRule({data: {rule: {}}});
}

// ******************************************************************** rulePackRules **********************************************************************
/**
 *
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexRulePackRules(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/rulePackRules', {params})
      .then((r) => {
        dispatch(_indexRulePackRulesSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
  };
}

/**
 *
 * @param {Number} rulePackRule
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showRulePackRule(rulePackRule, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/requests/rules/packs/rules/${rulePackRule}`, {params})
      .then((res) => {
        dispatch(_showRulePackRuleSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
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
export function storeRulePackRule(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.rule-pack.Adding New RulePackRule'));

    api.post('/requests/rules/packs/rules', {data})
      .then((r) => {
        dispatch(_storeRulePackRuleSuccess(r));
        loader.hide(() => app.message(app.translate('routes.home.requests.rule-pack.New RulePackRule Added Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.rule-pack', 'RulePack',
          app.translate('routes.home.requests.rule-pack.Adding New RulePack Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} rulePackRule
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateRulePackRule(rulePackRule, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.rule-pack.Updating RulePackRule'));

    api.put(`/requests/rules/packs/rules/${rulePackRule}`, {data})
      .then((r) => {
        dispatch(_updateRulePackRuleSuccess(r));
        loader.hide(() => app.message(app.translate('routes.home.requests.rule-pack.RulePackRule Updated Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.rule-pack', 'RulePack',
          app.translate('routes.home.requests.rule-pack.Updating RulePackRule Failed'),
        ));
      });
  };
}

/**
 *
 * @param {Number} rulePackRule
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyRulePackRule(rulePackRule, callback = () => {
}) {
  return (dispatch, gs, api) => {
    let loader = app.loading(app.translate('routes.home.requests.rule-pack.Removing RulePackRule'));

    api.delete(`/requests/rules/packs/rules/${rulePackRule}`)
      .then((r) => {
        dispatch(_destroyRulePackRuleSuccess(rulePackRule));
        loader.hide(() => app.message(app.translate('routes.home.requests.rule-pack.RulePackRule Removed Successfully')));
        callback(r);
      })
      .catch((e) => {
        loader.hide(() => app.error(
          e, 'routes.home.requests.rule-pack', 'RulePack',
          app.translate('routes.home.requests.rule-pack.Removing RulePackRule Failed'),
        ));
      });
  };
}


/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyRulePack() {
  return _showSuccess({data: {rulePack: {}}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyRulePackRules() {
  return _indexRulePackRulesSuccess({data: {rulePackRules: {}}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyRulePackRule() {
  return _showRulePackRuleSuccess({data: {rulePackRule: {}}});
}


// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {Object} state
 * @param {{type: String, payload: Object}} action
 * @return {Object}
 */
export default function reducer(state = {
  rulePacks: [],
  rulePack: {},
  rulePackRules: [],
  rulePackRule: {},
  rule: {},
  metaRulePacks: {},
  metaRulePackRules: {},
}, action) {
  let rulePacks;
  let rulePack;
  let _index;

  switch (action.type) {
    case INDEX_RULE_PACKS_SUCCESS:
      return Object.assign({}, state, {
        rulePacks: action.payload.data.requestRulePacks,
        metaRulePacks: action.payload.meta,
      });
    case SHOW_RULE_PACK_SUCCESS:
      return Object.assign({}, state, {
        rulePack: action.payload.requestRulePack,
      });
    case STORE_RULE_PACK_SUCCESS:
      rulePacks = app._.cloneDeep(state.rulePacks);
      rulePacks.push(action.payload);
      return Object.assign({}, state, {
        rulePack: action.payload,
        rulePacks,
      });
    case UPDATE_RULE_PACK_SUCCESS:
      rulePacks = app._.cloneDeep(state.rulePacks);
      rulePack = app._.cloneDeep(state.rulePack);
      _index = rulePacks.findIndex((_rulePack) => _rulePack.id === action.payload.id);
      rulePacks[_index] = action.payload;
      rulePack.name = action.payload.name;
      rulePack.description = action.payload.description;
      return Object.assign({}, state, {
        rulePack,
        rulePacks,
      });
    case DESTROY_RULE_PACK_SUCCESS:
      rulePacks = app._.cloneDeep(state.rulePacks);
      _index = rulePacks.findIndex((_rulePack) => _rulePack.id === action.payload);
      rulePacks.splice(_index, 1);
      return Object.assign({}, state, {
        rulePacks,
        rulePack: null,
        rulePackRule: null,
      });
    case INDEX_RULE_PACK_RULES_SUCCESS:
      return Object.assign({}, state, {
        rulePackRules: action.payload.data.rulePackRules,
        metaRulePackRules: action.payload.meta,
      });
    case SHOW_RULE_PACK_RULE_SUCCESS:
      return Object.assign({}, state, {
        rulePackRule: action.payload.requestRulePackRule,
      });
    case STORE_RULE_PACK_RULE_SUCCESS:
      rulePack = app._.cloneDeep(state.rulePack);
      let _rules = [];
      _rules.push(action.payload);
      if (!app._.isEmpty(rulePack.rules)) {
        _rules.push(...rulePack.rules);
      }
      rulePack.rules = _rules;
      return Object.assign({}, state, {
        rulePackRule: action.payload,
        rulePack,
      });
    case UPDATE_RULE_PACK_RULE_SUCCESS:
      rulePack = app._.cloneDeep(state.rulePack);
      _index = rulePack.rules.findIndex((_rulePackRule) => _rulePackRule.id === action.payload.id);
      rulePack.rules[_index] = action.payload;
      return Object.assign({}, state, {
        rulePackRule: action.payload,
        rulePack,
      });
    case DESTROY_RULE_PACK_RULE_SUCCESS:
      rulePack = app._.cloneDeep(state.rulePack);
      _index = rulePack.rules.findIndex((_rulePackRule) => _rulePackRule.id === action.payload);
      rulePack.rules.splice(_index, 1);
      return Object.assign({}, state, {
        rulePack,
      });
    case INDEX_RULE_PACK_RULES_FORM_SUCCESS:
      return Object.assign({}, state, {
        rule: action.payload.rule,
      });
    default:
      return state;
  }
}
