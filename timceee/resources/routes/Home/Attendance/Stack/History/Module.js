// import './test';

// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const INDEX_STACK_SUCCESS = 'INDEX_STACK_SUCCESS';
const SHOW_STACK_SUCCESS = 'SHOW_STACK_SUCCESS';
const INDEX_STACK_LOGS_SUCCESS = 'INDEX_STACK_LOGS_SUCCESS';
const SHOW_STACK_LOGS_SUCCESS = 'SHOW_STACK_LOGS_SUCCESS';
const STORE_STACK_LOGS_SUCCESS = 'STORE_STACK_LOGS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexStackSuccess(payload) {
  return {
    type: INDEX_STACK_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showStackSuccess(payload) {
  return {
    type: SHOW_STACK_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexStackLogSuccess(payload) {
  return {
    type: INDEX_STACK_LOGS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showStackLogSuccess(payload) {
  return {
    type: SHOW_STACK_LOGS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storeLogSuccess(payload) {
  return {
    type: STORE_STACK_LOGS_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 *
 * @param {Number} user
 * @param {Object} param
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(user, param = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackLog@index')) {
      param = null; // TODO stack
      api.get(`/users/${user}/stacks`, {param})
        .then((res) => {
          dispatch(_indexStackSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack',
            app.translate('routes.home.attendance.stack.Indexing Stacks Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} user
 * @param {Number} stack
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(user, stack, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Stack@index')) {
      api.get(`/stacks/${stack}`)
        .then((res) => {
          dispatch(_showStackSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack',
            app.translate('routes.home.attendance.stack.Showing Stack Log Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexLogs(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackLog@index')) {
      api.get(`/ta/stacks/logs`, {params})
        .then((res) => {
          dispatch(_indexStackLogSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Log',
            app.translate('routes.home.attendance.stack.Indexing Stack Logs Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} log
 * @param {Object} param
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showLog(log, param = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackLog@index')) {
      api.get(`/ta/stacks/logs/${log}`, {param})
        .then((res) => {
          dispatch(_showStackLogSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Log',
            app.translate('routes.home.attendance.stack.showing Stack Log Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} user
 * @param {Number} stack
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeLog(user, stack, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackLog@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.stack.Log'));

      api.post(`/ta/stacks/logs`, {data})
        .then((res) => {
          dispatch(_storeLogSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.stack.Log Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.stack', 'Stack Log',
            app.translate('routes.home.attendance.stack.Log Failed'),
          );
          callback(err);
        });
    }
  };
}

export function emptyStacks() {
  return _indexStackSuccess({data: {stacks: []}, meta: {}});
}

export function emptyLogs() {
  return _indexStackLogSuccess({data: {stackLogs: []}});
}


function _sort(children) {
  children.sort((a, b) => {
    if (a.applyDate === b.applyDate) {
      return a.createdAt < b.createdAt;
    }

    return a.applyDate < b.applyDate;
  });
  return children;
}

function _map(logs) {
  app._.map(logs, (log) => {
    if (app._.isEmpty(log.children)) {
      delete log.children;
    } else {
      log.children = _sort(log.children);
    }
  });
  return logs;
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {Object} state
 * @param {{type: String, payload: Object}} action
 * @return {Object}
 */
export default function reducer(state = {
  stacks: [],
  stack: {},
  logs: [],
  log: {},
  meta: {},
}, action) {

  let logs = app._.cloneDeep(state.logs);
  let _index;

  switch (action.type) {
    case INDEX_STACK_SUCCESS:
      return Object.assign({}, state, {
        stacks: action.payload.data.stacks,
        meta: action.payload.meta ? action.payload.meta : {},
      });
    case SHOW_STACK_SUCCESS:
      return Object.assign({}, state, {
        stack: action.payload.stack,
      });
    case INDEX_STACK_LOGS_SUCCESS:
      let _logs = _map(action.payload.stackLogs);
      return Object.assign({}, state, {
        logs: _logs,
      });
    case SHOW_STACK_LOGS_SUCCESS:
      return Object.assign({}, state, {
        log: action.payload.stackLog,
      });
    case STORE_STACK_LOGS_SUCCESS:
      _index = action.payload;
      if (_index.stackLogId > 0) {
        let __index = logs.findIndex((_log) => _log.id === _index.stackLogId);
        if (!logs[__index].children) {
          logs[__index].children = [];
        }
        let _children = [];
        _children.push(_index);
        if (!app._.isEmpty(logs[__index].children)) {
          _children.push(...logs[__index].children);
        }
        logs[__index].children = _children;
      } else {
        let _logs = [];
        _logs.push(_index);
        if (!app._.isEmpty(logs)) {
          _logs.push(...logs);
        }
        logs = _logs;
      }
      return Object.assign({}, state, {
        logs,
      });
    default:
      return state;
  }
}
