// import './test';

// -------------------------------------------------------------------< constants >-------------------------------------------------------------------
const INDEX_REQUESTS_STATUS_SUCCESS = 'INDEX_REQUESTS_STATUS_SUCCESS';
const SHOW_REQUESTS_STATUS_SUCCESS = 'SHOW_REQUESTS_STATUS_SUCCESS';
const REQUEST_STATUS_ACCEPT_SUCCESS = 'REQUEST_STATUS_ACCEPT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------
/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _indexRequestsStatusSuccess(payload) {
  return {
    type: INDEX_REQUESTS_STATUS_SUCCESS,
    payload: payload,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _showRequestsStatusSuccess(payload) {
  return {
    type: SHOW_REQUESTS_STATUS_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @param {*} payload
 * @return {{type: string, payload: *}}
 */
function _acceptSuccess(payload) {
  return {
    type: REQUEST_STATUS_ACCEPT_SUCCESS,
    payload: payload,
  };
}

// --------------------------------------------------------------------< actions >--------------------------------------------------------------------
/**
 *
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function indexRequestsStatus(params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('RequestStatus@index')) {
      api.get('/requests/unprocessed', {params})
        .then((res) => {
          dispatch(_indexRequestsStatusSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.requests.status', 'Request Status',
            app.translate('routes.home.requests.status.Indexing Request Statuses Failed'),
          );
          callback(err);
        });
    }
  };
}

export function showRequestsStatus(id, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('RequestStatus@index')) {
      api.get(`/requests/${id}`, {params})
        .then((res) => {
          dispatch(_showRequestsStatusSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          app.error(
            err, 'routes.home.requests.status', 'Request Status',
            app.translate('routes.home.requests.status.Showing Request Statuses Failed'),
          );
          callback(err);
        });
    }
  };
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyRequestsStatus() {
  return _indexRequestsStatusSuccess({data: {requests: []}, meta: {}});
}

/**
 *
 * @return {{type: string, payload: *}}
 */
export function emptyRequestStatus() {
  return _showRequestsStatusSuccess({data: {request: {}}});
}

// export function getRequestsStatus(meta = {}, filter = {}, sort = {}, callback = (r) => {
// }) {
//   return (dispatch, gs, api) => {
//     api.get('/requestStatus/')
//       .then((r) => {
//         dispatch(_indexRequestsStatusSuccess(r));
//         callback(r);
//       })
//       .catch((e) => {
//       });
//   };
// }

/**
 *
 * @param {Array} requests - [1,2,3,4,5]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function accept(requests, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('RequestStatus@approve')) {
      api.put(`/requests/${requests}/done`, {})
        .then((res) => {
          dispatch(_acceptSuccess(requests));
          callback(undefined, res);
        })
        .catch((err) => {
          app.message(app.translate('routes.home.requests.Accepting Request Failed'), 'error');
          callback(err);
        });
    }
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
  requests: [],
  request: {},
  meta: {},
}, action) {
  let requests = app._.cloneDeep(state.requests);
  let _index;

  switch (action.type) {
    case INDEX_REQUESTS_STATUS_SUCCESS:
      return Object.assign({}, state, {
        requests: action.payload.data.requests,
        meta: action.payload.meta,
      });
    case SHOW_REQUESTS_STATUS_SUCCESS:
      return Object.assign({}, state, {
        request: action.payload.request,
      });
    case REQUEST_STATUS_ACCEPT_SUCCESS:
      action.payload.sort();
      action.payload.map((payload) => {
        _index = requests.findIndex((_request) => _request.id === payload);
        requests.splice(_index, 1);
      });
      return Object.assign({}, state, {
        requests,
      });
    default:
      return state;
  }
}
