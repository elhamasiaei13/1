// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* periods **********************************************************************
const INDEX_EVALUATION_PERIODS_SUCCESS = 'INDEX_EVALUATION_PERIODS_SUCCESS';
const INDEX_EVALUATION_PERIODS_QUESTIONNAIRE_SUCCESS = 'INDEX_EVALUATION_PERIODS_QUESTIONNAIRE_SUCCESS';
const SHOW_EVALUATION_PERIOD_SUCCESS = 'SHOW_EVALUATION_PERIOD_SUCCESS';
const STORE_EVALUATION_PERIOD_SUCCESS = 'STORE_EVALUATION_PERIOD_SUCCESS';
const UPDATE_EVALUATION_PERIOD_SUCCESS = 'UPDATE_EVALUATION_PERIOD_SUCCESS';
const DESTROY_EVALUATION_PERIOD_SUCCESS = 'DESTROY_EVALUATION_PERIOD_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* periods **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexQuestionnaireSuccess(payload) {
  return {
    type: INDEX_EVALUATION_PERIODS_QUESTIONNAIRE_SUCCESS,
    payload: payload,
  };
}/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_EVALUATION_PERIODS_SUCCESS,
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
    type: SHOW_EVALUATION_PERIOD_SUCCESS,
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
    type: STORE_EVALUATION_PERIOD_SUCCESS,
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
    type: UPDATE_EVALUATION_PERIOD_SUCCESS,
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
    type: DESTROY_EVALUATION_PERIOD_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* periods **********************************************************************
/**
 *
 * @param {Number} [period={}]
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexQuestionnaire(period, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Questionnaire@index') || app.authorize.can('UserAnswer')) {
      api.get(`/evaluation/periods/${period}/questionnaire`, {params})
        .then((res) => {
          dispatch(_indexQuestionnaireSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360', 'Questionnaire',
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
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Period@index') || app.authorize.can('UserAnswer')) {
      api.get('/evaluation/periods', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360', 'Period',
            app.translate('routes.home.evaluation-360.Indexing Periods Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Period', 'Period')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyPeriods() {
  return _indexSuccess({data: {periods: []}, meta: {}});
}
/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyQuestionnaire() {
  return _indexQuestionnaireSuccess({data: {questionnaires: []}, meta: {}});
}

/**
 *
 * @param {Number} period
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(period, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Period@index')) {
      api.get(`/evaluation/periods/${period}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.evaluation-360', 'Period',
            app.translate('routes.home.evaluation-360.Indexing Period Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Period', 'Period')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyPeriod() {
  return _showSuccess({data: {period: {}}, meta: {}});
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
    if (app.authorize.can('Period@store')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Adding New Period'));

      api.post('/evaluation/periods', {data: {period: data}, params})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.New Period Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360', 'Period',
            app.translate('routes.home.evaluation-360.Adding New Period Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Period', 'Period')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} period
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(period, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Period@update')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Updating Period'));

      api.put(`/evaluation/periods/${period}`, {data: {period: data}, params})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Period Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360', 'Period',
            app.translate('routes.home.evaluation-360.Updating Period Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Period', 'Period')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} period
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(period, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Period@destroy')) {
      let loader = app.loading(app.translate('routes.home.evaluation-360.Removing Period'));

      api.delete(`/evaluation/periods/${period}`, {params})
        .then((res) => {
          dispatch(_destroySuccess(period));
          loader.hide(() => app.message(app.translate('routes.home.evaluation-360.Period Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.evaluation-360', 'Period',
            app.translate('routes.home.evaluation-360.Removing Period Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Period', 'Period')} - ${app.translate('routes.home.basic.roles.destroy', 'destroy')}`,
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
  periods: [],
  questionnaires: [],
  period: {},
  meta: {},
  questionnairesMeta: {},
}, action) {
  let periods;
  let _index;
  switch (action.type) {
    case INDEX_EVALUATION_PERIODS_QUESTIONNAIRE_SUCCESS:
      return Object.assign({}, state, {
        questionnaires: action.payload.data.questionnaires,
        questionnairesMeta: action.payload.meta,
      });
    case INDEX_EVALUATION_PERIODS_SUCCESS:
      return Object.assign({}, state, {
        periods: action.payload.data.periods,
        meta: action.payload.meta,
      });
    case SHOW_EVALUATION_PERIOD_SUCCESS:
      return Object.assign({}, state, {
        period: action.payload.period,
      });
    case STORE_EVALUATION_PERIOD_SUCCESS:
      periods = app._.cloneDeep(state.periods);
      periods.push(action.payload);
      return Object.assign({}, state, {
        periods,
      });
    case UPDATE_EVALUATION_PERIOD_SUCCESS:
      periods = app._.cloneDeep(state.periods);
      _index = periods.findIndex((_period) => _period.id === action.payload.id);
      periods[_index] = action.payload;
      return Object.assign({}, state, {
        periods,
      });
    case DESTROY_EVALUATION_PERIOD_SUCCESS:
      periods = app._.cloneDeep(state.periods);
      _index = periods.findIndex((_period) => _period.id === action.payload);
      periods.splice(_index, 1);
      return Object.assign({}, state, {
        periods,
      });
    default:
      return state;
  }
}
