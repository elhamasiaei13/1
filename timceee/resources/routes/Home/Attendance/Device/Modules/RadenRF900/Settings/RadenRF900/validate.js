const validate = (values) => {
  let _errors = {};

  let required = [];

  if (values.date) {
    required.push('time');
  }

  if (values.time) {
    required.push('date');
  }

  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return _errors;
};

export default validate;
