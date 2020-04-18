// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** position *****************************************************************
const GET_POSITIONS_EVALUATION_360_SUCCESS = 'GET_POSITIONS_EVALUATION_360_SUCCESS';
// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** position *****************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _getPositionsEvaluationSuccess(payload) {
  return {
    type: GET_POSITIONS_EVALUATION_360_SUCCESS,
    payload: payload,
  };
}


// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** position *****************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function getPositions(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('EvaluationContact@update')) {

      api.get(`/positions`, {params})
        .then((res) => {
          dispatch(_getPositionsEvaluationSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.EvaluationContact', 'EvaluationContact')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
          },
          'permission error',
        ), 'error');
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
export default function reducer(state = {
  positions: [],
  meta: {},
}, action) {
  switch (action.type) {
    case GET_POSITIONS_EVALUATION_360_SUCCESS:
      return Object.assign({}, state, {
        positions: action.payload.data.positions,
        meta: action.payload.meta,
      });
    default:
      return state;
  }
}
