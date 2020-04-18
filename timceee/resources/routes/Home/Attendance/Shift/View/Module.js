// -------------------------------------------------------------------- constants --------------------------------------------------------------------

// *************************************************************** shifts assignment *****************************************************************
const GET_ALL_SHIFT_USER_ASSIGNMENT_SUCCESS = 'GET_ALL_SHIFT_USER_ASSIGNMENT_SUCCESS';

// ----------------------------------------------------------------< action creators >----------------------------------------------------------------

// *************************************************************** shifts assignment *****************************************************************
/**
 *
 * @param {{data: Object}} payload
 * @return {{type: String, payload: Object}}
 * @private
 */
function _getSuccess(payload) {
  return {
    type: GET_ALL_SHIFT_USER_ASSIGNMENT_SUCCESS,
    payload: payload.data,
  };
}

/**
 *
 * @return {{type: String, payload: Object}}
 */
export function emptyShifts() {
  return _getSuccess({data: {shifts: []}});
}


// --------------------------------------------------------------------< actions >--------------------------------------------------------------------

// *************************************************************** shifts assignment *****************************************************************

/**
 *
 * @param {Number} shift
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function index(shift, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('ShiftAssignment@update')) {

      api.get(`/ta/shifts/${shift}/positions`, {params})
        .then((res) => {
          dispatch(_getSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          let data = [{
            id: 1,
            name: 'شیفت ۱',
            start: '2018-08-12',
            end: '2018-09-12',
          }, {
            id: 2,
            name: 'شیفت 2',
            start: '2018-07-12',
            end: '2018-09-11',
          }, {
            id: 3,
            name: 'شیفت 3',
            start: '2018-08-23',
            end: '2018-09-23',
          }];
          dispatch(_getSuccess({data: {shifts: data}}));
          callback(undefined);
          // callback(err);
        });
    }
  };
}

/**
 *
 * @param {Number} shift
 * @param {Object} [data={}]
 * @param {Object} [params={}]
 * @param {Function} [callback=(function())]
 * @return {Function}
 */
export function changeShift(shift, data, params = {}, callback = () => {
}) {
  return (dispatch, gs, api) => {
    if (app.authorize.can('ShiftAssignment@update')) {

      api.put(`/ta/shifts/${shift}/positions`, {data: {shift: data}, params})
        .then((res) => {
          dispatch(_getSuccess(res));
          callback(undefined, res);
        })
        .catch((err) => {
          callback(err);
        });
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
  shifts: [],
}, action) {

  switch (action.type) {
    case GET_ALL_SHIFT_USER_ASSIGNMENT_SUCCESS:
      return Object.assign({}, state, {
        shifts: action.payload.shifts,
      });
    default:
      return state;
  }
}
