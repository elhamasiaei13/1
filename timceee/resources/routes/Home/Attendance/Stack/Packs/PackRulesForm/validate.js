import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  validateMany([
    'title',
  ], values, _errors, regex.persianAndLatin, app.translate('main.Enter Persian/Latin words only'));

  if (values['dateFrom'] > values['dateTo']) {
    _errors['dateTo'] = app.translate('routes.home.attendance.stack.This field should be greater than the start time');
  }

  validateMany([
    'cycle',
    'fact',
    'ruleId',
    'priority',
  ], values, _errors, regex.number, app.translate('main.Enter numbers only'));

  return _errors;
};

export default validate;
