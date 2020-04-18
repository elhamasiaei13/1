// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const AUTH_AUTHENTICATING = 'AUTH_AUTHENTICATING';
const AUTH_AUTHENTICATE_SUCCESS = 'AUTH_AUTHENTICATE_SUCCESS';
const AUTH_INDEX_PERMISSIONS_SUCCESS = 'AUTH_INDEX_PERMISSIONS_SUCCESS';
const AUTH_AUTHORITY_CHANGED = 'AUTH_AUTHORITY_CHANGED';
const AUTH_CURRENT_USER_SUCCESS = 'AUTH_CURRENT_USER_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _authenticateSuccess(payload) {
  return {
    type: AUTH_AUTHENTICATE_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexPermissionsSuccess(payload) {
  return {
    type: AUTH_INDEX_PERMISSIONS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showCurrentUserSuccess(payload) {
  return {
    type: AUTH_CURRENT_USER_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 *
 * @param {Boolean} [authenticating=true]
 * @return {{type: String, payload: *, source: *}}
 */
export function authenticating(authenticating = true) {
  return {
    type: AUTH_AUTHENTICATING,
    payload: {
      authenticating,
    },
  };
}

/**
 *
 * @param {Boolean} [authenticated=true]
 * @return {{type: String, payload: *, source: *}}
 */
export function authenticated(authenticated = true) {
  return {
    type: AUTH_AUTHORITY_CHANGED,
    payload: {
      authenticated,
    },
  };
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function authenticate(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    const loader = app.loading(app.translate('routes.auth.Logging in'));
    dispatch(authenticating());

    api.post('/login', {data})
      .then((res) => {
        dispatch(_authenticateSuccess(res));
        loader.hide(() => app.message(app.translate('routes.auth.Logged in successfully')));
        // app.message(app.translate('routes.auth.Logged in successfully'));
        callback(undefined, res);
      })
      .catch((err) => {
        dispatch(authenticated(false));
        loader.hide(() => app.error(
          err, 'routes.auth', 'Login',
          app.translate('routes.auth.Username or Password is incorrect'),
        ));
        // app.message(app.translate('routes.auth.Username or Password is incorrect'), 'error');
        callback(err);
      })
      .then(() => dispatch(authenticating(false)));
  };
}

/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function logout(callback = () => {
}) {
  return (dispatch, gs, api) => {
    const loader = app.loading(app.translate('routes.auth.Logging out'));

    api.post('/logout', {data: {}})
      .then((res) => {
        dispatch(authenticated(false));
        loader.hide(() => app.message(app.translate('routes.auth.Logged out successfully')));
        callback(undefined, res);
      })
      .catch((err) => {
        loader.hide(() => app.error(
          err, 'routes.auth', 'Logout',
          app.translate('routes.auth.Logging out failed'),
        ));
        callback(err);
      });
  };
}

/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function verifyAuthentication(callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post('/login/refresh', {data: {refreshToken: localStorage.getItem('refresh-token')}})
      .then((res) => {
        dispatch(_authenticateSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        dispatch(authenticated(false));
        callback(err);
      });
  };
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function emailResetToken(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post('/password/email', {data})
      .then((res) => {
        app.message(app.translate('routes.auth.Email Sent'));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.auth', 'Email',
          app.translate('routes.auth.Email Not Found'),
        );
        callback(err);
      });
  };
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function resetPassword(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post('/password/reset', {data})
      .then((res) => {
        app.message(app.translate('routes.auth.Password changed successfully'));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function loginResetPassword(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post('/login/password/reset', {data})
      .then((res) => {
        app.message(app.translate('routes.auth.Password changed successfully'));
        callback(undefined, res);
        dispatch(authenticated(false));
      })
      .catch((err) => {
        app.message(app.translate('routes.auth.Password reset failed'), 'error');
        callback(err);
      });
  };
}

/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexPermissions(callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/user/permissions')
      .then((res) => {
        if (!res.data.permissions || res.data.permissions.length === 0) {
          app.message(app.translate('routes.auth.You don\'t have any permissions'), 'warning');
          dispatch(authenticated(false));
        } else {
          dispatch(_indexPermissionsSuccess(res));
        }
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
export function showCurrentUser(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/user', {params})
      .then((res) => {
        dispatch(_showCurrentUserSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  authenticating: false,
  authenticated: localStorage.getItem('access-token') ? null : false,
  permissions: [],
  currentUser: {},
}, action) {
  let permissions;

  switch (action.type) {
    case AUTH_AUTHENTICATE_SUCCESS:
      localStorage.setItem('access-token', action.payload.accessToken);
      localStorage.setItem('refresh-token', action.payload.refreshToken);
      return Object.assign({}, state, {
        authenticated: true,
        authenticating: false,
      });
    case AUTH_AUTHORITY_CHANGED:
      if (!action.payload.authenticated) {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        permissions = [];
      } else {
        permissions = state.permissions;
      }
      return Object.assign({}, state, {
        authenticated: action.payload.authenticated,
        permissions,
      });
    case AUTH_AUTHENTICATING:
      return Object.assign({}, state, {
        authenticating: action.payload.authenticating,
      });
    case AUTH_INDEX_PERMISSIONS_SUCCESS:
      permissions = action.payload.permissions.pluck('name');
      permissions.push(...app._.uniq(permissions.map((permission) => permission.split('@')[0])));
      permissions = app._.uniq(permissions);
      return Object.assign({}, state, {
        permissions,
      });
    case AUTH_CURRENT_USER_SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.payload.user,
      });
    default:
      return state;
  }
}
