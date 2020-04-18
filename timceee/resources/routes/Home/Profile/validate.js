import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  let required = [
    'oldPassword',
    'newPassword',
    'newPasswordConfirmation',
  ];

  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  if (values['oldPassword'] && values['oldPassword'].length < 6) {
    _errors['oldPassword'] = app.translate('main.minCharacters', { count: 6 });
  }

  if (values['newPassword'] && values['newPassword'].length < 6) {
    _errors['newPassword'] = app.translate('main.minCharacters', { count: 6 });
  }

  if (values['newPasswordConfirmation'] && values['newPasswordConfirmation'].length < 6) {
    _errors['newPasswordConfirmation'] = app.translate('main.minCharacters', { count: 6 });
  }

  if (values['newPassword'] !== values['newPasswordConfirmation']) {
    _errors['newPasswordConfirmation'] = app.translate('routes.auth.Password doesn\'t match');
  }

  return _errors;
};

export default validate;
