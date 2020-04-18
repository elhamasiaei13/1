// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
// const SET_LANGUAGE= 'SET_LANGUAGE';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const GENERAL_SHOW_COMPANY_SUCCESS = 'GENERAL_SHOW_COMPANY_SUCCESS';
const GENERAL_SHOW_MODULES_SUCCESS = 'GENERAL_SHOW_MODULES_SUCCESS';
const GENERAL_SHOW_TYPES_SUCCESS = 'GENERAL_SHOW_TYPES_SUCCESS';
const GENERAL_SHOW_NOTIFICATIONS_SUCCESS = 'GENERAL_SHOW_NOTIFICATIONS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {*} payload
 * @param {String} url
 * @return {{type: string, payload: *, source: *}}
 */
export function success(payload, url = 'Unknown') {
  return {
    type: SUCCESS,
    payload,
    url,
  };
}

/**
 *
 * @param {*} payload
 * @param {String} url
 * @return {{type: string, payload: *, source: *}}
 */
export function error(payload, url = 'Unknown') {
  return {
    type: ERROR,
    payload,
    url,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showCompanySuccess(payload) {
  return {
    type: GENERAL_SHOW_COMPANY_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showModulesSuccess(payload) {
  return {
    type: GENERAL_SHOW_MODULES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showTypesSuccess(payload) {
  return {
    type: GENERAL_SHOW_TYPES_SUCCESS,
    payload: payload.data,
  };
}


/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showNotificationsSuccess(payload) {
  return {
    type: GENERAL_SHOW_NOTIFICATIONS_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------


// /**
//  * setting application's locale
//  * @param {string} language
//  * @return {{type: string, payload: *}}
//  */
// export function setLanguage(language) {
//   return {
//     type: SET_LANGUAGE,
//     payload: language,
//   };
// }

/**
 *
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showCompany(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/companies', {
      filterGroup: [{
        filters: [{
          key: 'company_id',
          value: null,
          operator: 'eq',
        }],
      }],
      ...params,
    })
      .then((res) => {
        dispatch(_showCompanySuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}


/**
 *
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showModules(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/modules', {params})
      .then((res) => {
        dispatch(_showModulesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

/**
 *
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showTypes(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/types', {params})
      .then((res) => {
        dispatch(_showTypesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

/**
 *
 * @param {Object} [data]
 * @param {Object} [params]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showNotification(data = {}, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post('/notifications', {data: data, params})
      .then((res) => {
        dispatch(_showNotificationsSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
function _group(types, parent = null) {
  let items = [];
  types.map((item) => {
    if (item.typeId === parent && (!item.rule || !item.rule.isPrivate)) {
      let _item = Object.assign({}, item, {children: _group(types, item.id)});
      items.push(_item);
    }
  });
  return items;
}

/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  // language: 'fa',
  company: {},
  modules: [],
  types: [],
  notifications: [],
}, action) {
  switch (action.type) {
    case GENERAL_SHOW_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        company: action.payload.companies[0],
      });
    case GENERAL_SHOW_MODULES_SUCCESS:
      return Object.assign({}, state, {
        modules: action.payload.modules,
      });
    case GENERAL_SHOW_TYPES_SUCCESS:
      let _types = _group(action.payload.types, null);
      return Object.assign({}, state, {
        types: _types,
      });
    case GENERAL_SHOW_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, state, {
        notifications: action.payload.notification,
      });
    // case SET_LANGUAGE:
    //   return Object.assign(state, {
    //     language: action.payload.language,
    //   });
    default:
      return state;
  }
}
