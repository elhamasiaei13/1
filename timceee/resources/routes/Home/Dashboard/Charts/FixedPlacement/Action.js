// import './test';
export const RULE_FILE_NAME = '596f1a67555a7';// 'fixedplacement';
export function run(callback = null) {
  return (dispatch, getState, api) => {
    return api.post(`ta/rules/${RULE_FILE_NAME}/run`)
      .then((r) => {
        if (callback) {
          callback(r.data);
        }
      })
      .catch((e) => {
        // dispatch(receiveErrors(e));
      });
  };
}
