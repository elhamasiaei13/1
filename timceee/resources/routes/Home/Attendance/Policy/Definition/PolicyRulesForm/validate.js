const validate = (values) => {
  let _errors = {};

  let required = [
    'name',
    'ruleId',
  ];

  if (app._.isEmpty(values['ruleId'])) {
    _errors['ruleId'] = app.translate('main.This field is required');
  }

  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return _errors;
};

export default validate;
