// import './test';
export const RULE_FILE_NAME = '59704313b5a96';// '596dd65c32d0b';// 'basiccolumn';
export function run(callback = null) {
  return (dispatch, getState, api) => {
    return api.post(`ta/rules/${RULE_FILE_NAME}/run`)
      .then((r) => {
        if (callback) {
          callback(r.data);
        }
      })
      .catch( (e) => {
       // dispatch(receiveErrors(e));
      });
  };
}
