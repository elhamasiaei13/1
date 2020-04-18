// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* questionnaires **********************************************************************
const INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_USER360_SUCCESS = 'INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_USER360_SUCCESS';
const UPDATE_EVALUATION360_QUESTIONNAIRE_SETTING_USER360_SUCCESS = 'UPDATE_EVALUATION360_QUESTIONNAIRE_SETTING_USER360_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* questionnaires **********************************************************************

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSettingUser360Success(payload) {
  return {
    type: INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_USER360_SUCCESS,
    payload: payload,
  };
}


/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateSettingUser360Success(payload) {
  return {
    type: UPDATE_EVALUATION360_QUESTIONNAIRE_SETTING_USER360_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* questionnaires **********************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexSettingUser360( params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@index')) {
      api.get('/evaluation/user360', {params})
        .then((res) => {
          dispatch(_indexSettingUser360Success(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.questionnaire', 'Questionnaire',
            app.translate('routes.home.evaluation-360.Indexing Questionnaires Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Questionnaire', 'Questionnaire')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}
/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptySettingUser360() {
  return _indexSettingUser360Success({data: {users360: []}, meta:{}});
}
/**
 *
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateSettingUser360(data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Updating Questionnaire'));

      api.put(`/evaluation/user360/position`, {data: {user360: data}, params})
        .then((res) => {
          dispatch(_updateSettingUser360Success(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Questionnaire Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.questionnaire', 'Questionnaire',
            app.translate('routes.home.evaluation-360.Updating Questionnaire Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Questionnaire', 'Questionnaire')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
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
  questionnaireAssignmentUser360: [],
  questionnaireAssignmentUser360Meta: {},
}, action) {
  switch (action.type) {
    case INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_USER360_SUCCESS:
      return Object.assign({}, state, {
        questionnaireAssignmentUser360: action.payload.data.users360,
        questionnaireAssignmentUser360Meta: action.payload.meta,
      });
    default:
      return state;
  }
}
