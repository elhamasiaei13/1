import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  let required = [
    'email',
    'password',
    'passwordConfirmation',
    'token',
  ];

  required.map((r) => {
    if (app._.isEmpty(values[r])) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  if (values.email && values.email !== '' && !regex.email.test(values.email)) {
    _errors.email = app.translate('routes.auth.Email\'s format is not valid');
  }

  if (values.password && values.passwordConfirmation && values.password !== '' && values.password !== values.passwordConfirmation) {
    _errors.passwordConfirmation = app.translate('routes.auth.Password doesn\'t match');
  }

  return _errors;
};

export default validate;
