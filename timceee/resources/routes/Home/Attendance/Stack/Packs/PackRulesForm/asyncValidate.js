const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncValidate = (values) => {
  return sleep(0)
    .then(() => {
      let _errors = {};
      let required = [
        'name',
        'ruleId',
        'dateFrom',
        'dateTo',
      ];

      if (values['dateFrom'] > values['dateTo']) {
        _errors['dateTo'] = app.translate('routes.home.attendance.stack.This field should be greater than the start time');
      }


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
