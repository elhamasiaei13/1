// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ***************************************************************** stack pack rule **************************************************************
const INDEX_STACK_PACK_RULES_SUCCESS = 'INDEX_STACK_PACK_RULES_SUCCESS';
const SHOW_STACK_PACK_RULE_SUCCESS = 'SHOW_STACK_PACK_RULE_SUCCESS';
const STORE_STACK_PACK_RULE_SUCCESS = 'STORE_STACK_PACK_RULE_SUCCESS';
const UPDATE_STACK_PACK_RULE_SUCCESS = 'UPDATE_STACK_PACK_RULE_SUCCESS';
const DESTROY_STACK_PACK_RULE_SUCCESS = 'DESTROY_STACK_PACK_RULE_SUCCESS';
// ****************************************************************** stack rule ********************************************************************
const INDEX_STACK_RULES_SUCCESS = 'INDEX_STACK_RULES_SUCCESS';
// ******************************************************************** Pack **********************************************************************
const INDEX_STACK_PACKS_SUCCESS = 'INDEX_STACK_PACKS_SUCCESS';
const SHOW_STACK_PACK_SUCCESS = 'SHOW_STACK_PACK_SUCCESS';
const STORE_STACK_PACK_SUCCESS = 'STORE_STACK_PACK_SUCCESS';
const UPDATE_STACK_PACK_SUCCESS = 'UPDATE_STACK_PACK_SUCCESS';
const DESTROY_STACK_PACK_SUCCESS = 'DESTROY_STACK_PACK_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ***************************************************************** stack pack rule **************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexPackRulesSuccess(payload) {
  return {
    type: INDEX_STACK_PACK_RULES_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showPackRuleSuccess(payload) {
  return {
    type: SHOW_STACK_PACK_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storePackRuleSuccess(payload) {
  return {
    type: STORE_STACK_PACK_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updatePackRuleSuccess(payload) {
  return {
    type: UPDATE_STACK_PACK_RULE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyPackRuleSuccess(payload) {
  return {
    type: DESTROY_STACK_PACK_RULE_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************** stack rule ******************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexStackRulesSuccess(payload) {
  return {
    type: INDEX_STACK_RULES_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************** Pack **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexPackSuccess(payload) {
  return {
    type: INDEX_STACK_PACKS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showPackSuccess(payload) {
  return {
    type: SHOW_STACK_PACK_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storePackSuccess(payload) {
  return {
    type: STORE_STACK_PACK_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updatePackSuccess(payload) {
  return {
    type: UPDATE_STACK_PACK_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyPackSuccess(payload) {
  return {
    type: DESTROY_STACK_PACK_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ***************************************************************** stack packs *******************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexPackRules(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPackRule@index')) {
      api.get('/rules/packs/rules', {params})
        .then((res) => {
          dispatch(_indexPackRulesSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Indexing Stack Pack Rules Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} packId
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showPackRule(packId, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPackRule@index')) {
      api.get(`/rules/packs/rules/${packId}`, {params})
        .then((res) => {
          dispatch(_showPackRuleSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Indexing Stack Pack Rule Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storePackRule(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPackRule@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Adding New Stack Pack'));

      api.post('/rules/packs/rules', {data})
        .then((res) => {
          dispatch(_storePackRuleSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.New Stack Pack Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Adding New Stack Pack Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} packId
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updatePackRule(packId, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPackRule@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Updating Stack Pack Rule'));

      api.put(`/rules/packs/rules/${packId}`, {data})
        .then((res) => {
          dispatch(_updatePackRuleSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.Stack Pack Rule Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Updating Stack Pack Rule Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} packId
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyPackRule(packId, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPack@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Removing Stack Pack Rule'));

      api.delete(`/rules/packs/rules/${packId}`)
        .then((res) => {
          dispatch(_destroyPackRuleSuccess(packId));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.Stack Pack Rule Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Removing Stack Pack Rule Failed'),
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
export function emptyPackRules() {
  return _indexPackRulesSuccess({data: {stackPackRules: []}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyPackRule() {
  return _showPackRuleSuccess({data: {stackPackRule: {}}});
}

// ******************************************************************** ‌stack rule ******************************************************************
/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexRules(callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackRule@index')) {
      api.get('/rules')
        .then((res) => {
          dispatch(_indexStackRulesSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Rule',
            app.translate('routes.home.attendance.stack.Indexing Stack Rules Failed'),
          );
          callback(err);
        });
    }
  };
}

// ******************************************************************** packs **********************************************************************
/**
 *
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexPacks(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPack@index')) {
      api.get('/rules/packs', {params})
        .then((res) => {
          dispatch(_indexPackSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Indexing Stack Packs Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} packId
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showPack(packId, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPack@index')) {
      api.get(`/rules/packs/${packId}`, {params})
        .then((res) => {
          dispatch(_showPackSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Indexing Stack Pack Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storePack(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPack@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Adding New Pack'));

      api.post('/rules/packs', {data})
        .then((res) => {
          dispatch(_storePackSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.New Pack Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Adding New Pack Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} packId
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updatePack(packId, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPack@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Updating Pack'));

      api.put(`/rules/packs/${packId}`, {data})
        .then((res) => {
          dispatch(_updatePackSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.Pack Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Updating Pack Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} packId
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyPack(packId, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackPack@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Removing Pack'));

      api.delete(`/rules/packs/${packId}`)
        .then((res) => {
          dispatch(_destroyPackSuccess(packId));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.Pack Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Pack',
            app.translate('routes.home.attendance.stack.Removing Pack Failed'),
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
export function emptyPacks() {
  return _indexPackSuccess({data: {stackPacks: []}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyPack() {
  return _showPackSuccess({data: {stackPack: {}}});
}


// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {Object} state
 * @param {{type: String, payload: Object}} action
 * @return {Object}
 */
export default function reducer(state = {
  packRules: [],
  packRule: {},
  rules: [],
  packs: [],
  pack: {},
  metaPackRules: {},
  metaPacks: {},
}, action) {
  let packRules = app._.cloneDeep(state.packRules);
  let packs = app._.cloneDeep(state.packs);
  let _index;

  switch (action.type) {
    case INDEX_STACK_PACK_RULES_SUCCESS:
      return Object.assign({}, state, {
        packRules: action.payload.data.stackPackRules,
        metaPackRules: action.payload.meta,
      });
    case SHOW_STACK_PACK_RULE_SUCCESS:
      return Object.assign({}, state, {
        packRule: action.payload.stackPackRule,
      });
    case STORE_STACK_PACK_RULE_SUCCESS:
      packRules.push(action.payload);
      return Object.assign({}, state, {
        packRule: action.payload,
        packRules,
      });
    case UPDATE_STACK_PACK_RULE_SUCCESS:
      _index = packRules.findIndex((_packRule) => _packRule.id === action.payload.id);
      packRules[_index] = action.payload;
      return Object.assign({}, state, {
        packRule: action.payload,
        packRules,
      });
    case DESTROY_STACK_PACK_RULE_SUCCESS:
      _index = packRules.findIndex((_packRule) => _packRule.id === action.payload);
      packRules.splice(_index, 1);
      return Object.assign({}, state, {
        packRules,
      });
    case INDEX_STACK_PACKS_SUCCESS:
      return Object.assign({}, state, {
        packs: action.payload.data.stackPacks,
        metaPacks: action.payload.meta,
      });
    case SHOW_STACK_PACK_SUCCESS:
      return Object.assign({}, state, {
        pack: action.payload.stackPack,
      });
    case STORE_STACK_PACK_SUCCESS:
      packs.push(action.payload);
      return Object.assign({}, state, {
        pack: action.payload,
        packs,
      });
    case UPDATE_STACK_PACK_SUCCESS:
      _index = packs.findIndex((_pack) => _pack.id === action.payload.id);
      packs[_index] = action.payload;
      return Object.assign({}, state, {
        pack: action.payload,
        packs,
      });
    case DESTROY_STACK_PACK_SUCCESS:
      _index = packs.findIndex((_pack) => _pack.id === action.payload);
      packs.splice(_index, 1);
      return Object.assign({}, state, {
        packs,
      });
    case INDEX_STACK_RULES_SUCCESS:
      return Object.assign({}, state, {
        rules: action.payload.data.rules,
        meta: action.payload.meta,
      });
    default:
      return state;
  }
}
