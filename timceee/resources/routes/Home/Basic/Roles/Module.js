// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************** roles **********************************************************************
const INDEX_ROLES_SUCCESS = 'INDEX_ROLES_SUCCESS';
const SHOW_ROLE_SUCCESS = 'SHOW_ROLE_SUCCESS';
const STORE_ROLE_SUCCESS = 'STORE_ROLE_SUCCESS';
const UPDATE_ROLE_SUCCESS = 'UPDATE_ROLE_SUCCESS';
const DESTROY_ROLE_SUCCESS = 'DESTROY_ROLE_SUCCESS';
// ******************************************************************* permissions *******************************************************************
const INDEX_PERMISSIONS_SUCCESS = 'INDEX_PERMISSIONS_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************** roles **********************************************************************
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexRolesSuccess(payload) {
  return {
    type: INDEX_ROLES_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _showRoleSuccess(payload) {
  return {
    type: SHOW_ROLE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _storeRoleSuccess(payload) {
  return {
    type: STORE_ROLE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _updateRoleSuccess(payload) {
  return {
    type: UPDATE_ROLE_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _destroyRoleSuccess(payload) {
  return {
    type: DESTROY_ROLE_SUCCESS,
    payload: payload,
  };
}

// ******************************************************************* permissions *******************************************************************
/**
 *
 * @param {*} payload
 * @return {{type: object, payload: *}}
 */
function _indexPermissionsSuccess(payload) {
  return {
    type: INDEX_PERMISSIONS_SUCCESS,
    payload: payload.data,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 * @param {Object} [params]
 * @param {function} [callback=(function())]
 * @return {Function}
 */
export function indexRoles(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Role@index')) {
      api.get('/roles', {params})
        .then((res) => {
          dispatch(_indexRolesSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.roles', 'Role',
            app.translate('routes.home.basic.roles.Indexing Roles Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 * @param {Number} role
 * @param {function} [callback=(function())]
 * @return {Function}
 */
export function showRole(role, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Role@index')) {
      api.get(`/roles/${role}`, {
        params: {
          includes: [
            'perms',
          ],
        },
      })
        .then((res) => {
          dispatch(_showRoleSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.roles', 'Role',
            app.translate('routes.home.basic.roles.Indexing Role Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 * @param {object} data
 * @param {function} [callback=(function())]
 * @return {Function}
 */
export function storeRole(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Role@store')) {
      let loader = app.loading(app.translate('routes.home.basic.roles.Adding new role'));

      api.post(`/roles`, {data})
        .then((res) => {
          dispatch(_storeRoleSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.roles.New role added successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.roles', 'Role',
            app.translate('routes.home.basic.roles.Adding new role failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 * @param {Number} role
 * @param {object} data
 * @param {function} [callback=(function())]
 * @return {Function}
 */
export function updateRole(role, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Role@update')) {
      let loader = app.loading(app.translate('routes.home.basic.roles.Updating role'));
      api.put(`/roles/${role}`, {data})
        .then((res) => {
          dispatch(_updateRoleSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.basic.roles.Role updated successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.roles', 'Role',
            app.translate('routes.home.basic.roles.Updating role failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 * @param {Number} role
 * @param {function} [callback=(function())]
 * @return {Function}
 */
export function destroyRole(role, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Role@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.roles.Removing role'));

      api.delete(`/roles/${role}`)
        .then((res) => {
          dispatch(_destroyRoleSuccess(role));
          loader.hide(() => app.message(app.translate('routes.home.basic.roles.Role removed successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.roles', 'Role',
            app.translate('routes.home.basic.roles.Removing role failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {function} [callback=(function())]
 * @return {Function}
 */
export function indexPermissions(callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/roles/permissions', {
      params: {
        includes: [
          'children.children.children',
        ],
        filter_groups: [{
          filters: [{
            key: 'permission_id',
            value: null,
            operator: 'eq',
          }],
        }],
      },
    })
      .then((res) => {
        dispatch(_indexPermissionsSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.message(app.translate('routes.home.basic.roles.Indexing Permissions Failed'), 'error');
        callback(err);
      });
  };
}

export function emptyPermissions() {
  return _indexRolesSuccess({data: {roles: []} , meta:{}});
}

function _translate(permissions) {
  let name = '';
  app._.map(permissions, (permission) => {
    name = permission.name.split('@');
    name = name[1] || name[0];
    permission.name = app.translate(`routes.home.basic.roles.${name}`);
    if (!app._.isEmpty(permission.children)) {
      _translate(permission.children);
    }
  });
  return permissions;
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  roles: [],
  role: {},
  permissions: [],
  meta: {},
}, action) {
  let roles;
  let _index;

  switch (action.type) {
    case INDEX_ROLES_SUCCESS:
      return Object.assign({}, state, {
        roles: action.payload.data.roles,
        meta: action.payload.meta,
      });
    case SHOW_ROLE_SUCCESS:
      return Object.assign({}, state, {
        role: action.payload.role,
      });
    case STORE_ROLE_SUCCESS:
      roles = app._.cloneDeep(state.roles);
      roles.push(action.payload);
      return Object.assign({}, state, {
        roles,
        role: action.payload,
      });
    case UPDATE_ROLE_SUCCESS:
      roles = app._.cloneDeep(state.roles);
      _index = roles.findIndex((_role) => _role.id === action.payload.id);
      roles[_index] = action.payload;
      return Object.assign({}, state, {
        roles,
        role: action.payload,
      });
    case DESTROY_ROLE_SUCCESS:
      roles = app._.cloneDeep(state.roles);
      _index = roles.findIndex((_role) => _role.id === action.payload);
      roles.splice(_index, 1);
      return Object.assign({}, state, {
        roles,
      });
    case INDEX_PERMISSIONS_SUCCESS:
      let permissions = _translate(action.payload.permissions);
      return Object.assign({}, state, {
        permissions,
      });
    default:
      return state;
  }
}
