// import './test';

// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const INDEX_STACKS_RULES_SUCCESS = 'INDEX_STACKS_RULES_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {*} payload
 * @return {{type: String, payload: *}}
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_STACKS_RULES_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 *
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('StackRule@index')) {
      api.get('/rules', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
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

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyRules() {
  return _indexSuccess({data: {rules: []}, meta: {}});
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  rules: [],
  meta: {},
}, action) {
  switch (action.type) {
    case INDEX_STACKS_RULES_SUCCESS:
      return Object.assign({}, state, {
        rules: action.payload.data.rules,
        meta: action.payload.meta,
      });
    default:
      return state;
  }
}
