import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  validateMany([
    'nationalCode',
    'birthCertificateNumber',
  ], values, _errors, regex.number, app.translate('main.Enter numbers only'));

  if (values['firstName'] && values['firstName'].length < 3) {
    _errors['firstName'] = app.translate('main.minCharacters', {count: 3});
  }

  if (values['lastName'] && values['lastName'].length < 3) {
    _errors['lastName'] = app.translate('main.minCharacters', {count: 3});
  }

  validateMany([
    'firstName',
    'lastName',
    'fatherName',
    // 'birthPlace',
    // 'birthRegisterPlace',
    'nationality',
  ], values, _errors, regex.persianAndLatin, app.translate('main.Enter Persian/Latin words only'));

  return _errors;
};

export default validate;
