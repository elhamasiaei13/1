// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* posts **********************************************************************
const INDEX_BULLETIN_POSTS_SUCCESS = 'INDEX_BULLETIN_POSTS_SUCCESS';
const SHOW_BULLETIN_POST_SUCCESS = 'SHOW_BULLETIN_POST_SUCCESS';
const STORE_BULLETIN_POST_SUCCESS = 'STORE_BULLETIN_POST_SUCCESS';
const UPDATE_BULLETIN_POST_SUCCESS = 'UPDATE_BULLETIN_POST_SUCCESS';
const DESTROY_BULLETIN_POST_SUCCESS = 'DESTROY_BULLETIN_POST_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* posts **********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_BULLETIN_POSTS_SUCCESS,
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
    type: SHOW_BULLETIN_POST_SUCCESS,
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
    type: STORE_BULLETIN_POST_SUCCESS,
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
    type: UPDATE_BULLETIN_POST_SUCCESS,
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
    type: DESTROY_BULLETIN_POST_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* posts **********************************************************************

/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Post@index') || app.authorize.can('Dashboard')) {
      api.get('/portal/post', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.bulletin', 'Post',
            app.translate('routes.home.bulletin.Indexing Posts Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Post', 'Post')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyPosts() {
  return _indexSuccess({data: {posts: []}, meta: {}});
}

/**
 *
 * @param {Number} post
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(post, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Post@index')) {
      api.get(`/portal/post/${post}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.bulletin', 'Post',
            app.translate('routes.home.bulletin.Indexing Post Failed'),
          );
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Post', 'Post')} - ${app.translate('routes.home.basic.roles.index', 'index')}`,
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
export function emptyPost() {
  return _showSuccess({data: {post: {}}, meta: {}});
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
    if (app.authorize.can('Post@store')) {
      let loader = app.loading(app.translate('routes.home.bulletin.Adding New Post'));

      api.post('/portal/post', {data: {post: data}, params})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.bulletin.New Post Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.bulletin', 'Post',
            app.translate('routes.home.bulletin.Adding New Post Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Post', 'Post')} - ${app.translate('routes.home.basic.roles.store', 'store')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} post
 * @param {Object} data
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(post, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Post@update')) {
      let loader = app.loading(app.translate('routes.home.bulletin.Updating Post'));

      api.put(`/portal/post/${post}`, {data: {post: data}, params})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.bulletin.Post Updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.bulletin', 'Post',
            app.translate('routes.home.bulletin.Updating Post Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Post', 'Post')} - ${app.translate('routes.home.basic.roles.update', 'update')}`,
          },
          'permission error',
        ), 'error');
    }
  };
}

/**
 *
 * @param {Number} post
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(post, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Post@destroy')) {
      let loader = app.loading(app.translate('routes.home.bulletin.Removing Post'));

      api.delete(`/portal/post/${post}`, {params})
        .then((res) => {
          dispatch(_destroySuccess(post));
          loader.hide(() => app.message(app.translate('routes.home.bulletin.Post Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.bulletin', 'Post',
            app.translate('routes.home.bulletin.Removing Post Failed'),
          ));
          callback(err);
        });
    } else {
      callback(undefined);
      app.message(
        app.translate(
          'routes.permission error',
          {
            permission: `${app.translate('routes.home.basic.roles.Post', 'Post')} - ${app.translate('routes.home.basic.roles.destroy', 'destroy')}`,
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
  posts: [],
  post: {},
  meta: {},
}, action) {
  let posts;
  let _index;
  switch (action.type) {
    case INDEX_BULLETIN_POSTS_SUCCESS:
      return Object.assign({}, state, {
        posts: action.payload.data.posts,
        meta: action.payload.meta,
      });
    case SHOW_BULLETIN_POST_SUCCESS:
      return Object.assign({}, state, {
        post: action.payload.post,
      });
    case STORE_BULLETIN_POST_SUCCESS:
      posts = app._.cloneDeep(state.posts);
      posts.push(action.payload);
      return Object.assign({}, state, {
        posts,
      });
    case UPDATE_BULLETIN_POST_SUCCESS:
      posts = app._.cloneDeep(state.posts);
      _index = posts.findIndex((_post) => _post.id === action.payload.id);
      posts[_index] = action.payload;
      return Object.assign({}, state, {
        posts,
      });
    case DESTROY_BULLETIN_POST_SUCCESS:
      posts = app._.cloneDeep(state.posts);
      _index = posts.findIndex((_post) => _post.id === action.payload);
      posts.splice(_index, 1);
      return Object.assign({}, state, {
        posts,
      });
    default:
      return state;
  }
}
