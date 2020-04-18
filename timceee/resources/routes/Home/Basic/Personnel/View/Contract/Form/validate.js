import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  if (values['rate'] && !regex.number.test(values['rate'])) {
    _errors['rate'] = app.translate('routes.home.basic.personnel.Enter Numbers Only');
  } else {
    delete _errors['rate'];
  }

  return _errors;
};

export default validate;
