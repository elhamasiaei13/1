// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// ********************************************************************* devices *********************************************************************
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE@ATTENDANCE/DEVICE';
const INDEX_DEVICES_SUCCESS = 'INDEX_DEVICES_SUCCESS';
const SHOW_DEVICE_SUCCESS = 'SHOW_DEVICE_SUCCESS';
const STORE_DEVICE_SUCCESS = 'STORE_DEVICE_SUCCESS';
const UPDATE_DEVICE_SUCCESS = 'UPDATE_DEVICE_SUCCESS';
const DESTROY_DEVICE_SUCCESS = 'DESTROY_DEVICE_SUCCESS';
// ***************************************************************** device groups *******************************************************************
const INDEX_DEVICE_GROUPS_SUCCESS = 'INDEX_DEVICE_GROUPS_SUCCESS';
// ***************************************************************** device reasons ******************************************************************
const STORE_DEVICE_REASON_SUCCESS = 'STORE_DEVICE_REASON_SUCCESS';
const DESTROY_DEVICE_REASON_SUCCESS = 'DESTROY_DEVICE_REASON_SUCCESS';
// ***************************************************************** device Chart ******************************************************************
const INDEX_DEVICES_CHART_SUCCESS = 'INDEX_DEVICES_CHART_SUCCESS';
const SHOW_DEVICE_CHART_SUCCESS = 'SHOW_DEVICE_CHART_SUCCESS';
const STORE_DEVICE_CHART_SUCCESS = 'STORE_DEVICE_CHART_SUCCESS';
const UPDATE_DEVICE_CHART_SUCCESS = 'UPDATE_DEVICE_CHART_SUCCESS';
const DESTROY_DEVICE_CHART_SUCCESS = 'DESTROY_DEVICE_CHART_SUCCESS';
// **************************************************************** Provinces & Cities *********************************************************************
const INDEX_PROVINCES_SUCCESS = 'INDEX_PROVINCES_SUCCESS';
const INDEX_CITIES_SUCCESS = 'INDEX_CITIES_SUCCESS';
// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// ********************************************************************* devices *********************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexSuccess(payload) {
  return {
    type: INDEX_DEVICES_SUCCESS,
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
    type: SHOW_DEVICE_SUCCESS,
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
    type: STORE_DEVICE_SUCCESS,
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
    type: UPDATE_DEVICE_SUCCESS,
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
    type: DESTROY_DEVICE_SUCCESS,
    payload: payload,
  };
}

// ***************************************************************** device groups *******************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexGroupsSuccess(payload) {
  return {
    type: INDEX_DEVICE_GROUPS_SUCCESS,
    payload: payload.data,
  };
}

// ***************************************************************** device reasons ******************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storeReasonSuccess(payload) {
  return {
    type: STORE_DEVICE_REASON_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyReasonSuccess(payload) {
  return {
    type: DESTROY_DEVICE_REASON_SUCCESS,
    payload: payload,
  };
}


// ***************************************************************** device chart ******************************************************************

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _indexDeviceChartSuccess(payload) {
  return {
    type: INDEX_DEVICES_CHART_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _showDeviceChartSuccess(payload) {
  return {
    type: SHOW_DEVICE_CHART_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _storeDeviceChartSuccess(payload) {
  return {
    type: STORE_DEVICE_CHART_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _updateDeviceChartSuccess(payload) {
  return {
    type: UPDATE_DEVICE_CHART_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {Number} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _destroyDeviceChartSuccess(payload) {
  return {
    type: DESTROY_DEVICE_CHART_SUCCESS,
    payload: payload,
  };
}

// **************************************************************** Provinces & Cities *********************************************************************

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexProvincesSuccess(payload) {
  return {
    type: INDEX_PROVINCES_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexCitiesSuccess(payload) {
  return {
    type: INDEX_CITIES_SUCCESS,
    payload: payload.data,
  };
}


// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// ********************************************************************* devices *********************************************************************

/**
 *
 * @param {String} [searchValue='']
 * @return {{type: String, payload: String}}
 */
export function setSearchValue(searchValue = '') {
  return {
    type: SET_SEARCH_VALUE,
    payload: searchValue,
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
    if (app.authorize.can('Device@index')) {
      api.get('/ta/devices', {params})
        .then((res) => {
          dispatch(_indexSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.device', 'Device',
            app.translate('routes.home.attendance.device.Indexing Devices Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyDevices() {
  return _indexSuccess({data: {devices: []}});
}

/**
 *
 * @param {Number} device
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function show(device, params, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@index')) {
      api.get(`/ta/devices/${device}`, {params})
        .then((res) => {
          dispatch(_showSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.device', 'Device',
            app.translate('routes.home.attendance.device.Indexing Device Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyDevice() {
  return _showSuccess({data: {device: {}}});
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function store(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.device.Adding New Device'));

      api.post('/ta/devices', {data: {device: data}})
        .then((res) => {
          dispatch(_storeSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.New Device Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.device', 'Device',
            app.translate('routes.home.attendance.device.Adding New Device Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} device
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function update(device, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.device.Updating Device'));

      api.put(`/ta/devices/${device}`, {data: {device: data}})
        .then((res) => {
          dispatch(_updateSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.device', 'Device',
            app.translate('routes.home.attendance.device.Updating Device Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} device
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroy(device, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.device.Removing Device'));

      api.delete(`/ta/devices/${device}`)
        .then((res) => {
          dispatch(_destroySuccess(device));
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.device', 'Device',
            app.translate('routes.home.attendance.device.Removing Device Failed'),
          ));
          callback(err);
        });
    }
  };
}

// ***************************************************************** device groups *******************************************************************
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexGroups(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/ta/devices/groups', {params})
      .then((res) => {
        dispatch(_indexGroupsSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.attendance.device', 'Device Group',
          app.translate('routes.home.attendance.device.Indexing Device Groups Failed'),
        );
        callback(err);
      });
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyGroups() {
  return _indexGroupsSuccess({data: {deviceGroups: []}});
}

// ***************************************************************** device reasons ******************************************************************
/**
 *
 * @param {Number} device
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeReason(device, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('ClockingReason@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.device.Adding Device Reason'));

      api.post(`/ta/devices/${device}/reasons`, {data: {reason: data}})
        .then((res) => {
          dispatch(_storeReasonSuccess(data));
          dispatch(show(device, {
            includes: [
              'reasons',
            ],
          }));
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device Reason Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.device', 'Reason',
            app.translate('routes.home.attendance.device.Adding Device Reason Device Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} reason
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyReason(reason, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('ClockingReason@destroy')) {
      let loader = app.loading(app.translate('routes.home.attendance.device.Removing Device Reason'));

      api.delete(`/ta/devices/reasons/${reason}`)
        .then((res) => {
          dispatch(_destroyReasonSuccess(reason));
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device Reason Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.device', 'Reason',
            app.translate('routes.home.attendance.device.Removing Device Reason Device Failed'),
          ));
          callback(err);
        });
    }
  };
}

// ****************************************************************** connections ********************************************************************
/**
 *
 * @param {Number} device - device id
 * @param {String} method
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function request(device, method, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post(`/ta/devices/${device}/connect/${method}`, {data})
      .then((res) => {
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}

/**
 *
 * @param {Number} device - device id to test connection
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function testConnection(device, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.post(`/ta/devices/${device}/connect/testConnection`, {params})
      .then((res) => {
        callback(undefined, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}


// **************************************************************** devices chart *********************************************************************

/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexDeviceChart(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@index')) {
      api.get('/ta/device_position', {params})
        .then((res) => {
          dispatch(_indexDeviceChartSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.device', 'Device Chart',
            app.translate('routes.home.attendance.device.Indexing Devices Chart Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyDevicesChart() {
  return _indexDeviceChartSuccess({data: {device_Positions: []}});
}

/**
 *
 * @param {Number} device
 * @param {Object} params
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function showDeviceChart(device, params, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@index')) {
      api.get(`/ta/device_position/${device}`, {params})
        .then((res) => {
          dispatch(_showDeviceChartSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.attendance.device', 'Device Chart',
            app.translate('routes.home.attendance.device.Indexing Device Chart Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyDeviceChart() {
  return _showDeviceChartSuccess({data: {device: {}}});
}

/**
 *
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function storeDeviceChart(data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@store')) {
      let loader = app.loading(app.translate('routes.home.attendance.device.Adding New Device Chart'));

      api.post('/ta/device_position', {data: {devicePosition: data}})
        .then((res) => {
          api.get(`/ta/device_position/${res.data.id}`, {params: {includes: ['device', 'city', 'province']}})
            .then((result) => {
              dispatch(_storeDeviceChartSuccess({data: result.data.devicePosition}));
            })
            .catch((err) => {
              dispatch(_storeDeviceChartSuccess(res));
            });
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.New Device Chart Added Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.device', 'Device Chart',
            app.translate('routes.home.attendance.device.Adding New Device Chart Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} device
 * @param {Object} data
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function updateDeviceChart(device, data, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.device.Updating Device Chart'));

      api.put(`/ta/device_position/${device}`, {data: {devicePosition: data}})
        .then((res) => {
          dispatch(_updateDeviceChartSuccess(res));
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device Chart updated Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.device', 'Device Chart',
            app.translate('routes.home.attendance.device.Updating Device Chart Failed'),
          ));
          callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} device
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function destroyDeviceChart(device, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('Device@update')) {
      let loader = app.loading(app.translate('routes.home.attendance.device.Removing Device Chart'));

      api.delete(`/ta/device_position/${device}`)
        .then((res) => {
          dispatch(_destroyDeviceChartSuccess(device));
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device Chart Removed Successfully')));
          callback(undefined, res);
        })
        .catch((err) => {
          loader.hide(() => app.error(
            err, 'routes.home.attendance.device', 'Device Chart',
            app.translate('routes.home.attendance.device.Removing Device Chart Failed'),
          ));
          callback(err);
        });
    }
  };
}


// **************************************************************** Provinces & Cities *********************************************************************


/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexProvinces(callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get('/countries/109/provinces')
      .then((res) => {
        dispatch(_indexProvincesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.basic.personnel', 'Provinces',
          app.translate('routes.home.basic.personnel.Indexing Cities failed'),
        );
        callback(err);
      });
  };
}


/**
 *
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexCities(callback = () => {
}) {
  return (dispatch, gs, api) => {
    api.get(`/countries/provinces/cities`)
      .then((res) => {
        dispatch(_indexCitiesSuccess(res));
        callback(undefined, res);
      })
      .catch((err) => {
        app.error(
          err, 'routes.home.basic.personnel', 'city',
          app.translate('routes.home.basic.personnel.Indexing Cities failed'),
        );
        callback(err);
      });
  };
}


// --------------------------------------------------------------------< reducer >--------------------------------------------------------------------
/**
 *
 * @param {{devices: Object[], groups: Object[]}} state
 * @param {{type: String, payload: Object}} action
 * @return {{devices: Object[]}}
 */
export default function reducer(state = {
  devices: [],
  devicesChart: [],
  pagination: {},
  searchValue: '',
  device: {},
  deviceChart: {},
  groups: [],
  provinces: [],
  cities: [],
}, action) {
  let devices;
  let devicesChart;
  let device;
  let deviceChart;
  let _index;
  let _meta;

  switch (action.type) {
    case SET_SEARCH_VALUE:
      return Object.assign({}, state, {searchValue: action.payload});
    case INDEX_DEVICES_SUCCESS:
      _meta = action.payload.meta;
      return Object.assign({}, state, {
        devices: action.payload.data.devices,
        pagination: _meta ? app.pagination(_meta.currentPage + 1, _meta.total, _meta.limit) : {},
      });
    case SHOW_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        device: action.payload.device,
      });
    case STORE_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        devices: [
          action.payload,
          ...state.devices,
        ],
      });
    case UPDATE_DEVICE_SUCCESS:
      devices = app._.cloneDeep(state.devices);
      _index = devices.findIndex((_device) => _device.id === action.payload.id);
      devices[_index] = action.payload;
      return Object.assign({}, state, {
        devices,
      });
    case DESTROY_DEVICE_SUCCESS:
      devices = app._.cloneDeep(state.devices);
      _index = devices.findIndex((_device) => _device.id === action.payload);
      devices.splice(_index, 1);
      return Object.assign({}, state, {
        devices,
      });
    case INDEX_DEVICE_GROUPS_SUCCESS:
      return Object.assign({}, state, {
        groups: action.payload.deviceGroups,
      });
    // case STORE_DEVICE_REASON_SUCCESS:
    //   device = app._.cloneDeep(state.device);
    //   device.reasons.push(action.payload);
    //   return Object.assign({}, state, {
    //     device,
    //   });
    case DESTROY_DEVICE_REASON_SUCCESS:
      device = app._.cloneDeep(state.device);
      _index = device.reasons.findIndex((_reason) => _reason.id === action.payload);
      device.reasons.splice(_index, 1);
      return Object.assign({}, state, {
        device,
      });
    case INDEX_DEVICES_CHART_SUCCESS:
      _meta = action.payload.meta;
      return Object.assign({}, state, {
        devicesChart: action.payload.data.devicePositions,
        pagination: _meta ? app.pagination(_meta.currentPage + 1, _meta.total, _meta.limit) : {},
      });
    case SHOW_DEVICE_CHART_SUCCESS:
      return Object.assign({}, state, {
        deviceChart: action.payload.devicePosition,
      });
    case STORE_DEVICE_CHART_SUCCESS:
      return Object.assign({}, state, {
        devicesChart: [
          action.payload,
          ...state.devicesChart,
        ],
      });
    case UPDATE_DEVICE_CHART_SUCCESS:
      devicesChart = app._.cloneDeep(state.devicesChart);
      _index = devicesChart.findIndex((_device) => _device.id === action.payload.id);
      devicesChart[_index] = action.payload;
      return Object.assign({}, state, {
        devicesChart,
      });
    case DESTROY_DEVICE_CHART_SUCCESS:
      devicesChart = app._.cloneDeep(state.devicesChart);
      _index = devicesChart.findIndex((_device) => _device.id === action.payload);
      devicesChart.splice(_index, 1);
      return Object.assign({}, state, {
        devicesChart,
      });


    case INDEX_PROVINCES_SUCCESS:
      return Object.assign({}, state, {
        provinces: action.payload.provinces,
      });

    case INDEX_CITIES_SUCCESS:
      return Object.assign({}, state, {
        cities: action.payload.cities,
      });
    default:
      return state;
  }
}
