// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* questionnaires **********************************************************************
const INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_SUCCESS = 'INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_SUCCESS';
const INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_ASSIGNED_SUCCESS = 'INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_ASSIGNED_SUCCESS';
const INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_ASSIGNED_USER_SUCCESS = 'INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_ASSIGNED_USER_SUCCESS';
const INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_RESPONDER_SUCCESS = 'INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_RESPONDER_SUCCESS';
const UPDATE_EVALUATION360_QUESTIONNAIRE_SETTING_SUCCESS = 'UPDATE_EVALUATION360_QUESTIONNAIRE_SETTING_SUCCESS';
const INDEX_EVALUATION360_QUESTIONNAIRES_SUCCESS = 'INDEX_EVALUATION360_QUESTIONNAIRES_SUCCESS';
const SHOW_EVALUATION360_QUESTIONNAIRE_SUCCESS = 'SHOW_EVALUATION360_QUESTIONNAIRE_SUCCESS';
const STORE_EVALUATION360_QUESTIONNAIRE_SUCCESS = 'STORE_EVALUATION360_QUESTIONNAIRE_SUCCESS';
const UPDATE_EVALUATION360_QUESTIONNAIRE_SUCCESS = 'UPDATE_EVALUATION360_QUESTIONNAIRE_SUCCESS';
const DESTROY_EVALUATION360_QUESTIONNAIRE_SUCCESS = 'DESTROY_EVALUATION360_QUESTIONNAIRE_SUCCESS';
const INDEX_EVALUATION360_QUESTION_SUCCESS = 'INDEX_EVALUATION360_QUESTION_SUCCESS';
const SHOW_EVALUATION360_QUESTION_SUCCESS = 'SHOW_EVALUATION360_QUESTION_SUCCESS';
const STORE_EVALUATION360_QUESTION_SUCCESS = 'STORE_EVALUATION360_QUESTION_SUCCESS';
const UPDATE_EVALUATION360_QUESTION_SUCCESS = 'UPDATE_EVALUATION360_QUESTION_SUCCESS';
const DESTROY_EVALUATION360_QUESTION_SUCCESS = 'DESTROY_EVALUATION360_QUESTION_SUCCESS';
const SHOW_EVALUATION360_QUESTIONNAIRE_REPORT_SUCCESS = 'SHOW_EVALUATION360_QUESTIONNAIRE_REPORT_SUCCESS';


// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* questionnaires **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSettingAssignedSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_ASSIGNED_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexQuestionnaireAssignedUserSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_ASSIGNED_USER_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSettingResponderSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_RESPONDER_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSettingSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_SUCCESS,
    payload: payload,
  };
}


/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateSettingSuccess(payload) {
  return {
    type: UPDATE_EVALUATION360_QUESTIONNAIRE_SETTING_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_QUESTIONNAIRES_SUCCESS,
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
    type: SHOW_EVALUATION360_QUESTIONNAIRE_SUCCESS,
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
    type: STORE_EVALUATION360_QUESTIONNAIRE_SUCCESS,
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
    type: UPDATE_EVALUATION360_QUESTIONNAIRE_SUCCESS,
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
    type: DESTROY_EVALUATION360_QUESTIONNAIRE_SUCCESS,
    payload: payload,
  };
}

// ********************************************************************* questions **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexQuestionSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_QUESTION_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showQuestionSuccess(payload) {
  return {
    type: SHOW_EVALUATION360_QUESTION_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storeQuestionSuccess(payload) {
  return {
    type: STORE_EVALUATION360_QUESTION_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateQuestionSuccess(payload) {
  return {
    type: UPDATE_EVALUATION360_QUESTION_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyQuestionSuccess(payload) {
  return {
    type: DESTROY_EVALUATION360_QUESTION_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* questionnaires **********************************************************************
/**
 *
 * @param {String} [component='']
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexSetting(component = '', params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@index')) {
      api.get('/evaluation/questionnaire-assignments', {params})
        .then((res) => {
          if (component === 'assigned') {
            dispatch(_indexSettingAssignedSuccess(res));
          }
          if (component === 'responder') {
            dispatch(_indexSettingResponderSuccess(res));
          }
          if (component === '') {
            dispatch(_indexSettingSuccess(res));
          }
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
 * @param {Number} [questionnaire='']
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexQuestionnaireAssignedUser(questionnaire, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@index')) {
      api.get(`/evaluation/questionnaires/${questionnaire}/assigned/users`, {params})
        .then((res) => {
          dispatch(_indexQuestionnaireAssignedUserSuccess(res));
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
export function emptySettingAssigned() {
  return _indexSettingAssignedSuccess({data: {questionnaireAssignment: []}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyQuestionnaireAssignedUser() {
  return _indexQuestionnaireAssignedUserSuccess({data: {users: []}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptySettingResponder() {
  return _indexSettingResponderSuccess({data: {questionnaireAssignment: []}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptySetting() {
  return _indexSettingSuccess({data: {questionnaireAssignment: []}, meta: {}});
}

/**
 *
 * @param {Number} questionnaire
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateSetting(questionnaire, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Updating Questionnaire'));

      api.put(`/evaluation/questionnaire-assignments/${questionnaire}`, {data: {assignments: data}, params})
        .then((res) => {
          dispatch(_updateSettingSuccess(res));
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

/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@index')) {
      api.get('/evaluation/questionnaires', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
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
export function emptyQuestionnaires() {
  return _indexSuccess({data: {questionnaires: []}, meta: {}});
}

/**
 *
 * @param {Number} questionnaire
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(questionnaire, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@index')) {
      api.get(`/evaluation/questionnaires/${questionnaire}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.questionnaire', 'Questionnaire',
            app.translate('routes.home.evaluation-360.Indexing Questionnaire Failed'),
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
export function emptyQuestionnaire() {
  return _showSuccess({data: {questionnaire: {}}, meta: {}});
}

/**
 *
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@store')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Adding New Questionnaire'));

      api.post('/evaluation/questionnaires', {data: {questionnaire: data}, params})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.New Questionnaire Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.questionnaire', 'Questionnaire',
            app.translate('routes.home.evaluation-360.Adding New Questionnaire Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Questionnaire', 'Questionnaire')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
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
export function update(questionnaire, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Updating Questionnaire'));

      api.put(`/evaluation/questionnaires/${questionnaire}`, {data: {questionnaire: data}, params})
        .then((res) => {
          dispatch(_updateSuccess(res));
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

/**
 *
 * @param {Number} questionnaire
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(questionnaire, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@destroy')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Removing Questionnaire'));

      api.delete(`/evaluation/questionnaires/${questionnaire}`, {params})
        .then((res) => {
          dispatch(_destroySuccess(questionnaire));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Questionnaire Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.questionnaire', 'Questionnaire',
            app.translate('routes.home.evaluation-360.Removing Questionnaire Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Questionnaire', 'Questionnaire')} - ${app.translate('routes.home.basic.roles.destroy', 'destroy')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

// ********************************************************************* questionnaire report **********************************************************************

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showQuestionnaireReportSuccess(payload) {
  return {
    type: SHOW_EVALUATION360_QUESTIONNAIRE_REPORT_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} questionnaire
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showQuestionnaireReport(questionnaire, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@index')) {
      api.get(`/evaluation/questionnaires/report/${questionnaire}`, {params})
        .then((res) => {
          dispatch(_showQuestionnaireReportSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.questionnaire', 'Questionnaire',
            app.translate('routes.home.evaluation-360.Indexing Questionnaire Failed'),
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
export function emptyQuestionnaireReport() {
  return _showQuestionnaireReportSuccess({data: {}});
}

// ********************************************************************* questions **********************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexQuestion(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Question@index')) {
      api.get('/evaluation/questions', {params})
        .then((res) => {
          dispatch(_indexQuestionSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.question', 'Question',
            app.translate('routes.home.evaluation-360.Indexing Questions Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Question', 'Question')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyQuestions() {
  return _indexQuestionSuccess({data: {questions: []}, meta: {}});
}

/**
 *
 * @param {Number} question
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showQuestion(question, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Question@index')) {
      api.get(`/evaluation/questions/${question}`, {params})
        .then((res) => {
          dispatch(_showQuestionSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.question', 'Question',
            app.translate('routes.home.evaluation-360.Indexing Question Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Question', 'Question')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyQuestion() {
  return _showQuestionSuccess({data: {question: {}}, meta: {}});
}

/**
 *
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeQuestion(data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Question@store')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Adding New Question'));

      api.post('/evaluation/questions', {data: {question: data}, params})
        .then((res) => {
          dispatch(_storeQuestionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.New Question Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.question', 'Question',
            app.translate('routes.home.evaluation-360.Adding New Question Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Question', 'Question')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} question
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateQuestion(question, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Question@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Updating Question'));

      api.put(`/evaluation/questions/${question}`, {data: {question: data}, params})
        .then((res) => {
          dispatch(_updateQuestionSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Question Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.question', 'Question',
            app.translate('routes.home.evaluation-360.Updating Question Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Question', 'Question')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} question
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyQuestion(question, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Question@destroy')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Removing Question'));

      api.delete(`/evaluation/questions/${question}`, {params})
        .then((res) => {
          dispatch(_destroyQuestionSuccess(question));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Question Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.question', 'Question',
            app.translate('routes.home.evaluation-360.Removing Question Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Question', 'Question')} - ${app.translate('routes.home.basic.roles.destroy', 'destroy')}`,
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
  questionnaireAssignmentAssigned: [],
  questionnaireAssignmentAssignedMeta: {},
  questionnaireAssignmentAssignedUser: [],
  questionnaireAssignmentAssignedUserMeta: {},
  questionnaireAssignmentResponder: [],
  questionnaireAssignmentResponderMeta: {},
  questionnaireAssignment: [],
  questionnaireAssignmentMeta: {},
  questionnaires: [],
  questionnaire: {},
  meta: {},
  questions: [],
  question: {},
  questionMeta: {},
  questionnaireReport: {},
}, action) {
  let questionnaires;
  let questions;
  let _index;
  switch (action.type) {
    case INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_ASSIGNED_SUCCESS:
      return Object.assign({}, state, {
        questionnaireAssignmentAssigned: action.payload.data.questionnaireAssignment,
        questionnaireAssignmentAssignedMeta: action.payload.meta,
      });
    case INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_ASSIGNED_USER_SUCCESS:
      return Object.assign({}, state, {
        questionnaireAssignmentAssignedUser: action.payload.data.users,
        questionnaireAssignmentAssignedUserMeta: action.payload.meta,
      });
    case INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_RESPONDER_SUCCESS:
      return Object.assign({}, state, {
        questionnaireAssignmentResponder: action.payload.data.questionnaireAssignment,
        questionnaireAssignmentResponderMeta: action.payload.meta,
      });
    case INDEX_EVALUATION360_QUESTIONNAIRES_SETTING_SUCCESS:
      return Object.assign({}, state, {
        questionnaireAssignment: action.payload.data.questionnaireAssignment,
        questionnaireAssignmentMeta: action.payload.meta,
      });
    case INDEX_EVALUATION360_QUESTIONNAIRES_SUCCESS:
      return Object.assign({}, state, {
        questionnaires: action.payload.data.questionnaires,
        meta: action.payload.meta,
      });
    case SHOW_EVALUATION360_QUESTIONNAIRE_SUCCESS:
      return Object.assign({}, state, {
        questionnaire: action.payload.questionnaire,
      });
    case STORE_EVALUATION360_QUESTIONNAIRE_SUCCESS:
      questionnaires = app._.cloneDeep(state.questionnaires);
      questionnaires.push(action.payload);
      return Object.assign({}, state, {
        questionnaires,
      });
    case UPDATE_EVALUATION360_QUESTIONNAIRE_SUCCESS:
      questionnaires = app._.cloneDeep(state.questionnaires);
      _index = questionnaires.findIndex((_questionnaire) => _questionnaire.id === action.payload.id);
      questionnaires[_index] = action.payload;
      return Object.assign({}, state, {
        questionnaires,
      });
    case DESTROY_EVALUATION360_QUESTIONNAIRE_SUCCESS:
      questionnaires = app._.cloneDeep(state.questionnaires);
      _index = questionnaires.findIndex((_questionnaire) => _questionnaire.id === action.payload);
      questionnaires.splice(_index, 1);
      return Object.assign({}, state, {
        questionnaires,
      });
    case INDEX_EVALUATION360_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        questions: action.payload.data.questions,
        questionMeta: action.payload.meta,
      });
    case SHOW_EVALUATION360_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        question: action.payload.question,
      });
    case STORE_EVALUATION360_QUESTION_SUCCESS:
      questions = app._.cloneDeep(state.questions);
      questions.push(action.payload);
      return Object.assign({}, state, {
        questions,
      });
    case UPDATE_EVALUATION360_QUESTION_SUCCESS:
      questions = app._.cloneDeep(state.questions);
      _index = questions.findIndex((_question) => _question.id === action.payload.id);
      questions[_index] = action.payload;
      return Object.assign({}, state, {
        questions,
      });
    case DESTROY_EVALUATION360_QUESTION_SUCCESS:
      questions = app._.cloneDeep(state.questions);
      _index = questions.findIndex((_question) => _question.id === action.payload);
      questions.splice(_index, 1);
      return Object.assign({}, state, {
        questions,
      });
    case SHOW_EVALUATION360_QUESTIONNAIRE_REPORT_SUCCESS:
      return Object.assign({}, state, {
        questionnaireReport: action.payload,
      });
    default:
      return state;
  }
}
