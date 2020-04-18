// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* categories **********************************************************************
const INDEX_BULLETIN_CATEGORIES_SUCCESS = 'INDEX_BULLETIN_CATEGORIES_SUCCESS';
const SHOW_BULLETIN_CATEGORY_SUCCESS = 'SHOW_BULLETIN_CATEGORY_SUCCESS';
const STORE_BULLETIN_CATEGORY_SUCCESS = 'STORE_BULLETIN_CATEGORY_SUCCESS';
const UPDATE_BULLETIN_CATEGORY_SUCCESS = 'UPDATE_BULLETIN_CATEGORY_SUCCESS';
const DESTROY_BULLETIN_CATEGORY_SUCCESS = 'DESTROY_BULLETIN_CATEGORY_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* categories **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_BULLETIN_CATEGORIES_SUCCESS,
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
    type: SHOW_BULLETIN_CATEGORY_SUCCESS,
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
    type: STORE_BULLETIN_CATEGORY_SUCCESS,
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
    type: UPDATE_BULLETIN_CATEGORY_SUCCESS,
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
    type: DESTROY_BULLETIN_CATEGORY_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* categories **********************************************************************

/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('PostCategory@index') || app.authorize.can('Post@index')|| app.authorize.can('Dashboard')) {
      api.get('/portal/post_category', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.bulletin', 'Category',
            app.translate('routes.home.bulletin.Indexing Categories Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Category', 'Category')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyCategories() {
  return _indexSuccess({data: {postCategories: []}, meta: {}});
}

/**
 *
 * @param {Number} category
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(category, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('PostCategory@index')) {
      api.get(`/portal/post_category/${category}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.bulletin', 'Category',
            app.translate('routes.home.bulletin.Indexing Category Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Category', 'Category')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyCategory() {
  return _showSuccess({data: {postCategorie: {}}, meta: {}});
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
    if (app.authorize.can('PostCategory@store')) {
      let loader = app.loading(app.translate('routes.home.bulletin.Adding New Category'));

      api.post('/portal/post_category', {data: {postCategory: data}, params})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.bulletin.New Category Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.bulletin', 'Category',
            app.translate('routes.home.bulletin.Adding New Category Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Category', 'Category')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} category
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(category, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('PostCategory@update')) {
      let loader = app.loading(app.translate('routes.home.bulletin.Updating Category'));

      api.put(`/portal/post_category/${category}`, {data: {postCategory: data}, params})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.bulletin.Category Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.bulletin', 'Category',
            app.translate('routes.home.bulletin.Updating Category Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Category', 'Category')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} category
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(category, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('PostCategory@destroy')) {
      let loader = app.loading(app.translate('routes.home.bulletin.Removing Category'));

      api.delete(`/portal/post_category/${category}`, {params})
        .then((res) => {
          dispatch(_destroySuccess(category));
          loader.hide(() => app.message(app.translate('routes.home.bulletin.Category Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.bulletin', 'Category',
            app.translate('routes.home.bulletin.Removing Category Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Category', 'Category')} - ${app.translate('routes.home.basic.roles.destroy', 'destroy')}`,
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
  categories: [],
  category: {},
  meta: {},
}, action) {
  let categories;
  let _index;
  switch (action.type) {
    case INDEX_BULLETIN_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        categories: action.payload.data.postCategories,
        meta: action.payload.meta,
      });
    case SHOW_BULLETIN_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        category: action.payload.postCategory,
      });
    case STORE_BULLETIN_CATEGORY_SUCCESS:
      categories = app._.cloneDeep(state.categories);
      categories.push(action.payload);
      return Object.assign({}, state, {
        categories,
      });
    case UPDATE_BULLETIN_CATEGORY_SUCCESS:
      categories = app._.cloneDeep(state.categories);
      _index = categories.findIndex((_category) => _category.id === action.payload.id);
      categories[_index] = action.payload;
      return Object.assign({}, state, {
        categories,
      });
    case DESTROY_BULLETIN_CATEGORY_SUCCESS:
      categories = app._.cloneDeep(state.categories);
      _index = categories.findIndex((_category) => _category.id === action.payload);
      categories.splice(_index, 1);
      return Object.assign({}, state, {
        categories,
      });
    default:
      return state;
  }
}
