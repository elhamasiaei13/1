// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* evaluations **********************************************************************
const INDEX_BASIC_EVALUATIONS_SUCCESS = 'INDEX_BASIC_EVALUATIONS_SUCCESS';
const SHOW_BASIC_EVALUATION_SUCCESS = 'SHOW_BASIC_EVALUATION_SUCCESS';
const STORE_BASIC_EVALUATION_SUCCESS = 'STORE_BASIC_EVALUATION_SUCCESS';
const UPDATE_BASIC_EVALUATION_SUCCESS = 'UPDATE_BASIC_EVALUATION_SUCCESS';
const DESTROY_BASIC_EVALUATION_SUCCESS = 'DESTROY_BASIC_EVALUATION_SUCCESS';
const INDEX_BASIC_EVALUATION_POSITIONS_SUCCESS = 'INDEX_BASIC_EVALUATION_POSITIONS_SUCCESS';
const INDEX_BASIC_EVALUATION_POSITIONS_360_SUCCESS = 'INDEX_BASIC_EVALUATION_POSITIONS_360_SUCCESS';
const INDEX_BASIC_EVALUATION_USER_QUESTIONS_SUCCESS = 'INDEX_BASIC_EVALUATION_USER_QUESTIONS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* evaluations **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _getUserAnswerSuccess(payload) {
  return {
    type: INDEX_BASIC_EVALUATIONS_SUCCESS,
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
    type: SHOW_BASIC_EVALUATION_SUCCESS,
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
    type: STORE_BASIC_EVALUATION_SUCCESS,
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
    type: UPDATE_BASIC_EVALUATION_SUCCESS,
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
    type: DESTROY_BASIC_EVALUATION_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexPositionsSuccess(payload) {
  return {
    type: INDEX_BASIC_EVALUATION_POSITIONS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexgetEvaluationSuccess(payload) {
  return {
    type: INDEX_BASIC_EVALUATION_POSITIONS_360_SUCCESS,
    payload: payload,
  };
}
/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _getQuestionsSuccess(payload) {
  return {
    type: INDEX_BASIC_EVALUATION_USER_QUESTIONS_SUCCESS,
    payload: payload.data,
  };
}


// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* evaluations **********************************************************************
/**
 *
 * @param {Number} [questionnaireId=0]
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function getUserQuestions(questionnaireId, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('UserAnswer@index')) {
      api.get(`/evaluation/questionnaires/${questionnaireId}/questions`, {params})
        .then((res) => {
          dispatch(_getQuestionsSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.UserAnswer', 'Evaluation',
            app.translate('routes.home.basic.UserAnswer.Indexing Evaluations Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.UserAnswer', 'UserAnswer')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function getEvaluation(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('UserAnswer@index')) {
     // api.post('/evaluation/find360', {data: {props: data}, params})
      api.get('/evaluation/questionnaire-assignments', {params})
        .then((res) => {
          dispatch(_indexgetEvaluationSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.evaluation', 'Evaluation',
            app.translate('routes.home.evaluation-360.Indexing Evaluations Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Evaluation', 'Evaluation')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function getUserAnswer(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('UserAnswer@index')) {
      api.get('/evaluation/user_answers', {params})
        .then((res) => {
          dispatch(_getUserAnswerSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.evaluation', 'Evaluation',
            app.translate('routes.home.evaluation-360.Indexing Evaluations Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Evaluation', 'Evaluation')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyEvaluations() {
  return _indexgetEvaluationSuccess({data: {positions: []}, meta: {}});
}
/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyUserAnswer() {
  return _getUserAnswerSuccess({data: {userAnswers: []}, meta: {}});
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyUserQuestions() {
  return _getQuestionsSuccess({data: {questions: []}, meta: {}});
}

/**
 *
 * @param {Number} evaluation
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(evaluation, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Evaluation@index') || app.authorize.can('UserAnswer')) {
      api.get(`/evaluations/${evaluation}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.evaluation', 'Evaluation',
            app.translate('routes.home.evaluation-360.Indexing Evaluation Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Evaluation', 'Evaluation')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyEvaluation() {
  return _showSuccess({data: {positions: {}}, meta: {}});
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
    if (app.authorize.can('UserAnswer@store')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Adding New Evaluation'));

      api.post('/evaluation/user_answers', {data: {userAnswers: data}, params})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.New Evaluation Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.evaluation', 'Evaluation',
            app.translate('routes.home.evaluation-360.Adding New Evaluation Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Evaluation', 'Evaluation')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('UserAnswer@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Updating Evaluation'));

      api.put(`/evaluation/user_answers`, {data: {userAnswers: data}, params})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Evaluation Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.evaluation', 'Evaluation',
            app.translate('routes.home.evaluation-360.Updating Evaluation Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Evaluation', 'Evaluation')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} evaluation
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(evaluation, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('UserAnswer@destroy')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Removing Evaluation'));

      api.delete(`/evaluations/${evaluation}`, {params})
        .then((res) => {
          dispatch(_destroySuccess(evaluation));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Evaluation Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.basic.evaluation', 'Evaluation',
            app.translate('routes.home.evaluation-360.Removing Evaluation Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Evaluation', 'Evaluation')} - ${app.translate('routes.home.basic.roles.destroy', 'destroy')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

export function getPositions(params = {}, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    api.get('/positions', {params})
      .then((r) => {
        dispatch(_indexPositionsSuccess(r));
        callback(r);
      })
      .catch((e) => {
      });
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
  evaluation360: [],
  evaluations: [],
  evaluation: {},
  meta: {},
  positionsMeta: {},
  evaluation360Meta: {},
  questions: [],
  userAnswers:[],
}, action) {
  let evaluations;
  let _index;
  switch (action.type) {
    case INDEX_BASIC_EVALUATION_USER_QUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        questions: action.payload.questions,
      });
    case INDEX_BASIC_EVALUATION_POSITIONS_360_SUCCESS:
      return Object.assign({}, state, {
        evaluation360: action.payload.data.questionnaireAssignment,
        evaluation360Meta: action.payload.meta,
      });
    case INDEX_BASIC_EVALUATION_POSITIONS_SUCCESS:
      return Object.assign({}, state, {
        positions: action.payload.data.positions,
        positionsMeta: action.payload.meta,
      });
    case INDEX_BASIC_EVALUATIONS_SUCCESS:
      return Object.assign({}, state, {
        userAnswers: action.payload.data.userAnswers,
        meta: action.payload.meta,
      });
    case SHOW_BASIC_EVALUATION_SUCCESS:
      return Object.assign({}, state, {
        evaluation: action.payload.evaluation,
      });
    case STORE_BASIC_EVALUATION_SUCCESS:
      evaluations = app._.cloneDeep(state.evaluations);
      evaluations.push(action.payload);
      return Object.assign({}, state, {
        evaluations,
      });
    case UPDATE_BASIC_EVALUATION_SUCCESS:
      evaluations = app._.cloneDeep(state.evaluations);
      _index = evaluations.findIndex((_evaluation) => _evaluation.id === action.payload.id);
      evaluations[_index] = action.payload;
      return Object.assign({}, state, {
        evaluations,
      });
    case DESTROY_BASIC_EVALUATION_SUCCESS:
      evaluations = app._.cloneDeep(state.evaluations);
      _index = evaluations.findIndex((_evaluation) => _evaluation.id === action.payload);
      evaluations.splice(_index, 1);
      return Object.assign({}, state, {
        evaluations,
      });
    default:
      return state;
  }
}
