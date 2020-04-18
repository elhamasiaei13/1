import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  if (values['isMember'] && (!values['password'] || values['password'] === '')) {
    _errors['password'] = app.translate('main.This field is required');
  } else {
    delete _errors['password'];
  }

  if (values['email'] && !regex.email.test(values['email'])) {
    _errors['email'] = app.translate('routes.home.basic.personnel.Email is not valid');
  } else {
    delete _errors['email'];
  }

  return _errors;
};

export default validate;
