// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** position *****************************************************************
const GET_POSITION_EVALUATION_360_SUCCESS = 'GET_POSITION_EVALUATION_360_SUCCESS';
const UPDATE_EVALUATION_CONTACT_POSITION_ASSIGNMENT_SUCCESS = 'UPDATE_EVALUATION_CONTACT_POSITION_ASSIGNMENT_SUCCESS';


// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** position *****************************************************************

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _getPositionEvaluationSuccess(payload) {
  return {
    type: GET_POSITION_EVALUATION_360_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateContactUserPositionSuccess(payload) {
  return {
    type: UPDATE_EVALUATION_CONTACT_POSITION_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** position *****************************************************************

/**
 *
 * @param {Number} position
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function getPosition(position, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('EvaluationContact@index')) {

      api.get(`/evaluation/user-contacts/${position}`, {params})
        .then((res) => {
          dispatch(_getPositionEvaluationSuccess(res));
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

/**
 *
 * @param {Number} position
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateContactUserPositions(position, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('EvaluationContact@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Assigning EvaluationContact'));

      api.put(`/evaluation/user-contacts`, {
        data: {
          contact: {
            position_id: position,
            contacts: data,
          },
        }, params,
      })
        .then((res) => {
          dispatch(_updateContactUserPositionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.EvaluationContact Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360', 'EvaluationContact',
            app.translate('routes.home.evaluation-360.EvaluationContact Assignment Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.EvaluationContact', 'EvaluationContact')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
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
  position: {},
  meta: {},
}, action) {
  switch (action.type) {
    case GET_POSITION_EVALUATION_360_SUCCESS:
      return Object.assign({}, state, {
        position: action.payload.data,
      });
    default:
      return state;
  }
}
