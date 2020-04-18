const TEST = 'TEST';

/**
 *
 * @param {mix} data
 * @return {{type: string, data: *}}
 */
function success(data) {
  return {
    type: TEST,
    data,
  };
}

/**
 *
 * @return {Function}
 */
export function test() {
  return (dispatch, getState, api) => {
    api.get('/')
      .then((r) => {
      //  console.log(3);
        dispatch(success(r));
      })
      .catch((r) => {
       // console.log(4);
      });
  };
}

/**
 *
 * @param {object} state
 * @param {object} action
 * @return {object}
 */
export default function reducer(state = {
  test: 1,
}, action) {
  switch (action.type) {
    case TEST:
      break;
    default:
      return state;
  }
}
