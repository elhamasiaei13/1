import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  if (values['code'] && !regex.number.test(values['code'])) {
    _errors['code'] = app.translate('routes.home.basic.personnel.Enter Numbers Only');
  } else {
    delete _errors['code'];
  }

  return _errors;
};

export default validate;
