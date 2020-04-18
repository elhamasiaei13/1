import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  let required = [
    'username',
    'password',
  ];

  required.map((r) => {
    if (app._.isEmpty(values[r])) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  if (values.username && values.username !== '' && !(regex.number.test(values.username * 1) || regex.email.test(values.username))) {
    _errors.username = app.translate('routes.auth.Username\'s format is not valid');
  }

  return _errors;
};

export default validate;
