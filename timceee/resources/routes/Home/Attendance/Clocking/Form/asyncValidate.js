const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncValidate = (values, dispatch) => {
  return sleep(0)
    .then(() => {
      let _errors = {};

      let required = [
      //  'reason',
      ];

      required.map((r) => {
        if (!values[r]) {
          _errors[r] = app.translate('main.This field is required');
        }
      });

      if (!app._.isEmpty(_errors)) {
        throw _errors;
      }
    });
};

export default asyncValidate;
