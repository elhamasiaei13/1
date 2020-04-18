// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* questionCategories **********************************************************************
const INDEX_EVALUATION360_USER_LEVELS_SUCCESS = 'INDEX_EVALUATION360_USER_LEVELS_SUCCESS';
const INDEX_EVALUATION360_RATES_SUCCESS = 'INDEX_EVALUATION360_RATES_SUCCESS';
const INDEX_EVALUATION360_QUESTION_CATEGORIES_SUCCESS = 'INDEX_EVALUATION360_QUESTION_CATEGORIES_SUCCESS';
const SHOW_EVALUATION360_QUESTION_CATEGORY_SUCCESS = 'SHOW_EVALUATION360_QUESTION_CATEGORY_SUCCESS';
const STORE_EVALUATION360_QUESTION_CATEGORY_SUCCESS = 'STORE_EVALUATION360_QUESTION_CATEGORY_SUCCESS';
const UPDATE_EVALUATION360_QUESTION_CATEGORY_SUCCESS = 'UPDATE_EVALUATION360_QUESTION_CATEGORY_SUCCESS';
const DESTROY_EVALUATION360_QUESTION_CATEGORY_SUCCESS = 'DESTROY_EVALUATION360_QUESTION_CATEGORY_SUCCESS';
const INDEX_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS = 'INDEX_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS';
const STORE_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS = 'STORE_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS';
const UPDATE_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS = 'UPDATE_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* questionCategories **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexUserLevelsSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_USER_LEVELS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexRatesSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_RATES_SUCCESS,
    payload: payload,
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
    type: INDEX_EVALUATION360_QUESTION_CATEGORIES_SUCCESS,
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
    type: SHOW_EVALUATION360_QUESTION_CATEGORY_SUCCESS,
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
    type: STORE_EVALUATION360_QUESTION_CATEGORY_SUCCESS,
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
    type: UPDATE_EVALUATION360_QUESTION_CATEGORY_SUCCESS,
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
    type: DESTROY_EVALUATION360_QUESTION_CATEGORY_SUCCESS,
    payload: payload,
  };
}


/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexPointsSuccess(payload) {
  return {
    type: INDEX_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @param {{data: Object}} data
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storePointsSuccess(payload, data) {
  return {
    type: STORE_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS,
    payload: Object.assign({}, payload.data, data),
  };
}


/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updatePointsSuccess(payload) {
  return {
    type: UPDATE_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* questionCategories **********************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexUserLevels(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('UserLevel@index')) {
      api.get('/evaluation/user_levels', {params})
        .then((res) => {
          dispatch(_indexUserLevelsSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.UserLevel', 'UserLevel',
            app.translate('routes.home.evaluation-360.Indexing UserLevel Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.UserLevel', 'UserLevel')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function indexRates(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Rate@index') || app.authorize.can('UserAnswer')) {
      api.get('/evaluation/rates', {params})
        .then((res) => {
          dispatch(_indexRatesSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.Rate', 'Rate',
            app.translate('routes.home.evaluation-360.Indexing Rate Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Rate', 'Rate')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
    if (app.authorize.can('QuestionCategory@index')) {
      api.get('/evaluation/question_categories', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.questionCategory', 'QuestionCategory',
            app.translate('routes.home.evaluation-360.Indexing QuestionCategories Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.QuestionCategory', 'QuestionCategory')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyQuestionCategories() {
  return _indexSuccess({data: {questionCategories: []}, meta: {}});
}

/**
 *
 * @param {Number} questionCategory
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(questionCategory, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('QuestionCategory@index')) {
      api.get(`/evaluation/question_categories/${questionCategory}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360.questionCategory', 'QuestionCategory',
            app.translate('routes.home.evaluation-360.Indexing QuestionCategory Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.QuestionCategory', 'QuestionCategory')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyQuestionCategory() {
  return _showSuccess({data: {questionCategory: {}}, meta: {}});
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
    if (app.authorize.can('QuestionCategory@store')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Adding New QuestionCategory'));

      api.post('/evaluation/question_categories', {data: {questionCategory: data}, params})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.New QuestionCategory Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.questionCategory', 'QuestionCategory',
            app.translate('routes.home.evaluation-360.Adding New QuestionCategory Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.QuestionCategory', 'QuestionCategory')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} questionCategory
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(questionCategory, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('QuestionCategory@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Updating QuestionCategory'));

      api.put(`/evaluation/question_categories/${questionCategory}`, {data: {questionCategory: data}, params})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.QuestionCategory Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.questionCategory', 'QuestionCategory',
            app.translate('routes.home.evaluation-360.Updating QuestionCategory Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.QuestionCategory', 'QuestionCategory')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
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
export function indexPoints(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Point@index')) {

      api.get('/evaluation/points', {params})
        .then((res) => {
          dispatch(_indexPointsSuccess(res));
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
            permission: `${app.translate('routes.home.basic.roles.Point', 'Point')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storePoints(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Point@store')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Adding New Point'));

      api.post('/evaluation/points', {data: {point: data}})
        .then((res) => {
          dispatch(_storePointsSuccess(res, data));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.New Point Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360', 'Points',
            app.translate('routes.home.evaluation-360.Adding New Point Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Point', 'Point')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} pointId
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updatePoints(pointId, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Point@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Updating Point'));

      api.put(`/evaluation/points/${pointId}`, {data: {point: data}})
        .then((res) => {
          dispatch(_updatePointsSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Point Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360', 'Points',
            app.translate('routes.home.evaluation-360.Updating Point Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.QuestionCategory', 'QuestionCategory')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} questionCategory
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(questionCategory, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('QuestionCategory@destroy')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Removing QuestionCategory'));

      api.delete(`/evaluation/question_categories/${questionCategory}`, {params})
        .then((res) => {
          dispatch(_destroySuccess(questionCategory));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.QuestionCategory Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360.questionCategory', 'QuestionCategory',
            app.translate('routes.home.evaluation-360.Removing QuestionCategory Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.QuestionCategory', 'QuestionCategory')} - ${app.translate('routes.home.basic.roles.destroy', 'destroy')}`,
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
  userLevels: [],
  rates: [],
  questionCategories: [],
  points: [],
  questionCategory: {},
  meta: {},
}, action) {
  let questionCategories;
  let questionCategory;
  let _index;
  switch (action.type) {
    case INDEX_EVALUATION360_USER_LEVELS_SUCCESS:
      return Object.assign({}, state, {
        userLevels: action.payload.data.userLevel,
      });
    case INDEX_EVALUATION360_RATES_SUCCESS:
      return Object.assign({}, state, {
        rates: action.payload.data.rates,
      });
    case INDEX_EVALUATION360_QUESTION_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        questionCategories: action.payload.data.questionCategories,
        meta: action.payload.meta,
      });
    case SHOW_EVALUATION360_QUESTION_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        questionCategory: action.payload.questionCategory,
      });
    case STORE_EVALUATION360_QUESTION_CATEGORY_SUCCESS:
      questionCategories = app._.cloneDeep(state.questionCategories);
      questionCategories.push(action.payload);
      return Object.assign({}, state, {
        questionCategories,
      });
    case UPDATE_EVALUATION360_QUESTION_CATEGORY_SUCCESS:
      questionCategories = app._.cloneDeep(state.questionCategories);
      _index = questionCategories.findIndex((_questionCategory) => _questionCategory.id === action.payload.id);
      questionCategories[_index] = action.payload;
      return Object.assign({}, state, {
        questionCategories,
      });
    case DESTROY_EVALUATION360_QUESTION_CATEGORY_SUCCESS:
      questionCategories = app._.cloneDeep(state.questionCategories);
      _index = questionCategories.findIndex((_questionCategory) => _questionCategory.id === action.payload);
      questionCategories.splice(_index, 1);
      return Object.assign({}, state, {
        questionCategories,
      });
    case INDEX_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS:
      return Object.assign({}, state, {
        points: action.payload.points,
      });
    case STORE_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS:
    case UPDATE_EVALUATION360_QUESTION_CATEGORY_POINTS_SUCCESS:
      let points = app._.cloneDeep(state.points);
      if (action.payload) {
        points.push(action.payload);
      }
      return Object.assign({}, state, {
        points,
      });
    default:
      return state;
  }
}
