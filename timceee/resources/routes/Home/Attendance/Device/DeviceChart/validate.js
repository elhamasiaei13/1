import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  let required = [
    'name',
    'type',
    'cityId',
    'deviceId',
    'provinceId',
  ];
  validateMany([
    'substituteId',
  ], values, _errors, regex.number, app.translate('main.Enter numbers only'));

  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return _errors;
};

export default validate;
