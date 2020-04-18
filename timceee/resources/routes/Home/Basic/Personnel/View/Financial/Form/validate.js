import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  validateMany([
    'accountNumber',
    'cardNumber',
  ], values, _errors, regex.number, app.translate('routes.home.basic.personnel.Enter Numbers Only'));

  let required = [
    'bankId',
    'accountNumber',
    // 'shabaNumber',
  ];


  if (values['cardNumber'] && values['cardNumber'].length < 16) {
    _errors['cardNumber'] = app.translate('main.minCharacters', {count: 16});
  }


  if (values['shabaNumber'] && values['shabaNumber'].length > 2 && values['shabaNumber'].length < 26) {
    _errors['shabaNumber'] = app.translate('main.minCharacters', {count: 26});
  }


  if (values['shabaNumber'] && values['shabaNumber'].length >= 3 && (!regex.number.test(values['shabaNumber'].slice(2)) || regex.persianAndLatin.test(values['shabaNumber'].slice(2)))) {
    _errors['shabaNumber'] = app.translate('main.Not valid');
  }

  if (values['shabaNumber'] && values['shabaNumber'].length >= 2 && values['shabaNumber'].slice(0, 2).toUpperCase() !== 'IR') {
    _errors['shabaNumber'] = 'با IR باید شروع شود';
  }

  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return _errors;
};

export default validate;
