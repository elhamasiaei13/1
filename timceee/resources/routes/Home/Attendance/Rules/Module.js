// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const INDEX_ATTENDANCE_RULES_SUCCESS = 'INDEX_ATTENDANCE_RULES_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_ATTENDANCE_RULES_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Rule@index')) {
      api.get('/types', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.rules', 'Rule',
            app.translate('routes.home.attendance.rules.Indexing Rules Failed'),
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
    case INDEX_ATTENDANCE_RULES_SUCCESS:
      return Object.assign({}, state, {
        rules: action.payload.data.types,
        meta: action.payload.meta,
      });
    default:
      return state;
  }
}
