// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** questionnaires assignment *****************************************************************
const UPDATE_EVALUATION_QUESTIONNAIRE_USER_ASSIGNMENT_SUCCESS = 'UPDATE_EVALUATION_QUESTIONNAIRE_USER_ASSIGNMENT_SUCCESS';
const UPDATE_EVALUATION_QUESTIONNAIRE_POSITION_ASSIGNMENT_SUCCESS = 'UPDATE_EVALUATION_QUESTIONNAIRE_POSITION_ASSIGNMENT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** questionnaires assignment *****************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateUserSuccess(payload) {
  return {
    type: UPDATE_EVALUATION_QUESTIONNAIRE_USER_ASSIGNMENT_SUCCESS,
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
    type: UPDATE_EVALUATION_QUESTIONNAIRE_POSITION_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** questionnaires assignment *****************************************************************
/**
 *
 * @param {Number} questionnaire
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateUsers(questionnaire, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('QuestionnaireAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Assigning QuestionnaireAssignment Users'));

      api.put(`/evaluation/questionnaires/${questionnaire}/users`, {data: {users: data}, params})
        .then((res) => {
          dispatch(_updateUserSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.QuestionnaireAssignment Users Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360', 'Question',
            app.translate('routes.home.evaluation-360.QuestionnaireAssignment User Assignment Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.QuestionnaireAssignment', 'QuestionnaireAssignment')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} questionnaire
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updatePositions(questionnaire, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('QuestionnaireAssignment@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Assigning QuestionnaireAssignment Positions'));

      api.put(`/evaluation/questionnaires/${questionnaire}/positions`, {data: {positions: data}, params})
        .then((res) => {
          dispatch(_updatePositionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.QuestionnaireAssignment Positions Assigned Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360', 'QuestionnaireAssignment',
            app.translate('routes.home.evaluation-360.QuestionnaireAssignment Position Assignment Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.QuestionnaireAssignment', 'QuestionnaireAssignment')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
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
export default function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
