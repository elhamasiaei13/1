export const RULE_FILE_NAME ='59704313b5a79'; // 'Dashboard';//
export function run(callback = null) {
  return (dispatch, getState, api) => {
    return api.post(`/ta/rules/${RULE_FILE_NAME}/run`)
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