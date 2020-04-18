import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  // validateMany([
  //   'name',
  // ], values, _errors, regex.persianAndLatin, app.translate('main.Enter Persian/Latin words only'));

  validateMany([
    'fact',
    'priority',
  ], values, _errors, regex.number, app.translate('main.Enter numbers only'));

  let required = [
    'name',
    'ruleId',
    'timeFrom',
    'timeTo',
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
