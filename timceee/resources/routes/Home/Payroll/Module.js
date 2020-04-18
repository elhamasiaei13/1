// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* financialPayrolls **********************************************************************

const GET_FINANCIAL_PAYROLL_SUCCESS = 'GET_FINANCIAL_PAYROLL_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* financialPayrolls **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _getFileSuccess(payload) {
//  console.log(payload);
  return {
    type: GET_FINANCIAL_PAYROLL_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* financialPayrolls **********************************************************************
/**
 *
 * @param {Object} [data={}]
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function checkFile(data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Payroll')) {
      api.post('/financial/payroll/check_file', {data: {props: data}, params})
        .then((res) => {
          dispatch(_getFileSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          callback(err && err.response);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.payroll', 'payroll')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
  payroll: {},
}, action) {
  switch (action.type) {
    case GET_FINANCIAL_PAYROLL_SUCCESS:
      return Object.assign({}, state, {
        payroll: action.payload.payroll,
      });
    default:
      return state;
  }
}
