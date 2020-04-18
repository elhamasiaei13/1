// import './test';

// -------------------------------------------------------------------< constants >-------------------------------------------------------------------

// ******************************************************************* positions *********************************************************************
const INDEX_POSITIONS_SUCCESS = 'INDEX_POSITIONS_SUCCESS';
const SHOW_POSITION_SUCCESS = 'SHOW_POSITION_SUCCESS';
const MOVE_CHART_NODE_SUCCESS = 'MOVE_CHART_NODE_SUCCESS';
const STORE_POSITION_SUCCESS = 'STORE_POSITION_SUCCESS';
const UPDATE_POSITION_SUCCESS = 'UPDATE_POSITION_SUCCESS';
const DESTROY_POSITION_SUCCESS = 'DESTROY_POSITION_SUCCESS';
const DESTROY_WITH_CHILD_POSITION_SUCCESS = 'DESTROY_WITH_CHILD_POSITION_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ******************************************************************** positions ********************************************************************
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexPositionsSuccess(payload) {
  return {
    type: INDEX_POSITIONS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _showPositionSuccess(payload) {
  return {
    type: SHOW_POSITION_SUCCESS,
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
    type: STORE_POSITION_SUCCESS,
    payload: payload,
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
    type: UPDATE_POSITION_SUCCESS,
    payload: payload,
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
    type: DESTROY_POSITION_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyWithChildSuccess(payload) {
  return {
    type: DESTROY_WITH_CHILD_POSITION_SUCCESS,
    payload: payload,
  };
}

// ********************************************************************* move ************************************************************************
/**
 *
 * @param {*} id
 * @param {*} target
 * @return {{type: string, payload: *}}
 */
export function _moveSuccess(id, target) {
  return {
    type: MOVE_CHART_NODE_SUCCESS,
    payload: {id: id, target: target},
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ******************************************************************** positions ********************************************************************
/**
 *
 * @param {String} Component
 * @param {Function} callback
 * @return {Function}
 */
export function indexPositions(Component = '', callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Position@index')) {
      // Default routes
      let routes = '';
      let include = ['positions:id,user_id', 'positions.user:id', 'positions.user.profile::id,user_id,first_name,last_name,avatar'];
      let type = 'user';

      // For Self
      if ((app.authorize.can('Position@self') && Component === 'Chart') ||
        (app.authorize.can('Report@self') && Component === 'Report')) {
        routes = '/user';
        include = ['positions:id,user_id', 'positions.user:id', 'positions.user.profile::id,user_id,first_name,last_name,avatar'];
        type = 'user';
      }

      // For Subset Positions
      if ((app.authorize.can('Position@sub') && Component === 'Chart') ||
        (app.authorize.can('Report@sub') && Component === 'Report')) {
        routes = '/user/positions/subset';
        include = ['user:id', 'user.profile:id,user_id,first_name,last_name,avatar'];
        type = 'positions';
      }

      // For all positions
      if ((app.authorize.can('Position@all') && Component === 'Chart') ||
        (app.authorize.can('Report@all') && Component === 'Report')) {
        routes = '/positions';
        include = ['user:id', 'user.profile:id,user_id,first_name,last_name,avatar'];
        type = 'positions';
      }

      if (routes !== '') {
        api.get(routes, {
          params: {
            includes: [...include, 'roles:id,name,color,display_name'],
          },
        })
          .then((res) => {
            if (type === 'user') {
              dispatch(_indexPositionsSuccess(res.data.user));
            } else {
              dispatch(_indexPositionsSuccess(res.data));
            }
            callback(undefined, res);
          })
          .catch((err) => {
            app.error(
              err, 'routes.home.basic.organization-chart', 'Position',
              app.translate('routes.home.basic.organization-chart.Indexing Positions Failed'),
            );
            callback(err);
          });
      }
    }
  };
}

/**
 *
 * @param {number} id
 * @param {Function} callback
 * @return {Function}
 */
export function showPosition(id, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Position@index')) {
      api.get(`/positions/${id}`, {
        params: {
          includes: [
            'user',
            'user.profile',
            'roles',
            'roles.perms',
          ],
        },
      })
        .then((res) => {
          dispatch(_showPositionSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.organization-chart', 'Position',
            app.translate('routes.home.basic.organization-chart.Showing Positions Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {Function}
 */
export function emptyPosition() {
  return _showPositionSuccess({data: {position: {}}});
}

/**
 *
 * @param {Object} data
 * @param {Boolean} [acceptAll=false]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, acceptAll = false, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Position@store')) {
      let loader = app.loading(app.translate('routes.home.basic.organization-chart.Adding New Position'));

      api.post('/positions', {
        data,
      })
        .then((res) => {
          if (res.data.id) {
            dispatch(_storeSuccess(Object.assign(res.data, data.position)));
            loader.hide(() => app.message(app.translate('routes.home.basic.organization-chart.New Position Added Successfully')));
            callback(undefined, res);
          } else {
            loader.hide(() => app.message(app.translate('routes.home.basic.organization-chart.Please check it')));
            callback(undefined, res, 'store');
          }
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.organization-chart', 'Position',
            app.translate('routes.home.basic.organization-chart.Adding New Position Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} position
 * @param {Object} data
 * @param {string} acceptAll
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(position, data, acceptAll, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Position@update')) {
      let loader = app.loading(app.translate('routes.home.basic.organization-chart.Updating Position'));
      let _path = `/positions/${position}`;

      if (acceptAll) {
        _path = `${_path}?acceptAll=true`;
      }
      api.put(_path, {data})
        .then((res) => {
          {
            if (res.data.id) {
              dispatch(_updateSuccess(Object.assign({}, res.data, data.position)));
              loader.hide(() => app.message(app.translate('routes.home.basic.organization-chart.Position Updated Successfully')));
              callback(undefined);
            } else {
              loader.hide(() => app.message(app.translate('routes.home.basic.organization-chart.Please check it')));
              callback(undefined, res, 'update');
            }
          }
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.organization-chart', 'Position',
            app.translate('routes.home.basic.organization-chart.Updating Position Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} position
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(position, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Position@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.organization-chart.Removing Position'));

      api.delete(`/positions/${position}`)
        .then((res) => {
          dispatch(_destroySuccess(position));
          loader.hide(() => app.message(app.translate('routes.home.basic.organization-chart.Position Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.organization-chart', 'Position',
            app.translate('routes.home.basic.organization-chart.Removing Position Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} position
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyWithChild(position, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Position@destroy')) {
      let loader = app.loading(app.translate('routes.home.basic.organization-chart.Removing Position'));

      api.delete(`/positions/${position}`, {
        params: {
          ['withChildren']: true,
        },
      })
        .then((res) => {
          dispatch(_destroyWithChildSuccess(position));
          loader.hide(() => app.message(app.translate('routes.home.basic.organization-chart.Position Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.organization-chart', 'Position',
            app.translate('routes.home.basic.organization-chart.Removing Position Failed'),
          );
          callback(err);
        });
    }
  };
}

// ********************************************************************* move ************************************************************************
/**
 *
 * @param {Number} id
 * @param {Number} target
 * @param {function} callback
 * @return {Function}
 */
export function moveNode(id, target, callback = (r) => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Position@update')) {
      let data = {position: {positionId: target}};
      api.put(`/positions/${id}`, {data})
        .then((res) => {
          dispatch(_moveSuccess(id, target));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.basic.organization-chart', 'Position',
          );
          callback(err);
        });
    }
  };
}

// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {Array} positions
 * @param {*} payload
 * @return {Array}
 * @private
 */
function _blockList(positions, payload) {
  let list = [];
  let _list;
  let _index;
  positions.map((_position) => {
    if (_position.positionId === payload) {
      _index = positions.findIndex((__position) => __position.id === _position.id);
      if (_index > -1) {
        list.push(_index);
      }
      _list = _blockList(positions, _position.id);
      if (!app._.isEmpty(_list)) {
        list.push(..._list);
      }
    }
  });
  return list;
}

/**
 *
 * @param {Array} positions
 * @param {number} payload
 * @return {Array}
 * @private
 */
function _destroyWithChild(positions = [], payload = 0) {
  let blackList = _blockList(positions, payload);
  let _index = positions.findIndex((_position) => _position.id === payload);
  if (_index > -1) {
    blackList.push(_index);
  }
  blackList.sort((a, b) => b - a);
  blackList.map((_blackList) => {
    positions.splice(_blackList, 1);
  });
  return positions;
}

/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  positions: [],
  position: {},
}, action) {
  let positions = app._.cloneDeep(state.positions);
  let _index;

  switch (action.type) {
    case INDEX_POSITIONS_SUCCESS:
      return Object.assign({}, state, {
        positions: action.payload.positions,
      });
    case SHOW_POSITION_SUCCESS:
      return Object.assign({}, state, {
        position: action.payload.position,
      });
    case STORE_POSITION_SUCCESS:
      positions.push(action.payload);
      return Object.assign({}, state, {
        positions,
        position: action.payload,
      });
    case UPDATE_POSITION_SUCCESS:
      _index = positions.findIndex((_position) => _position.id === action.payload.id);
      positions[_index] = action.payload;
      return Object.assign({}, state, {
        positions,
        position: action.payload,
      });
    case DESTROY_POSITION_SUCCESS:
      if (action.payload !== 1) {
        _index = positions.filter((_position) => _position.id === action.payload);

        positions.map((_position) => {
          if (_position.positionId === action.payload) {
            _position.positionId = _index[0].positionId;
          }
        });
        _index = positions.findIndex((_position) => _position.id === action.payload);
        positions.splice(_index, 1);
      }
      return Object.assign({}, state, {
        positions,
      });
    case DESTROY_WITH_CHILD_POSITION_SUCCESS:
      if (action.payload !== 1) {
        _index = _destroyWithChild(positions, action.payload);
      } else {
        _index = positions;
      }
      return Object.assign({}, state, {
        positions: _index,
      });
    case MOVE_CHART_NODE_SUCCESS:
      app._.map(positions, (position) => {
        if (position.id === action.payload.id) {
          position.positionId = action.payload.target;
        }
      });
      return Object.assign({}, state, {
        positions,
      });
    default:
      return state;
  }
}
