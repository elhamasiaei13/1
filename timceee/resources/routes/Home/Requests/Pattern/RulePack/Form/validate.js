import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};


  if (!app._.isEmpty(_errors)) {
    throw _errors;
  }
  validateMany([
    'name',
  ], values, _errors, regex.persianAndLatin, app.translate('main.Enter Persian/Latin words only'));

  let required = [
    'name',
    'endDate',
    'beginDate',
  ];

  if (values['beginDate'] > values['endDate']) {
    _errors['endDate'] = app.translate('routes.home.requests.This field should be greater than the start time');
  }

  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });
  return _errors;
};

export default validate;
