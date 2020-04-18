import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

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

  validateMany([
    'menuPassword',
  ], values, _errors, regex.number, app.translate('main.Enter numbers only'));

  return _errors;
};

export default validate;
