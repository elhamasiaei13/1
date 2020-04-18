import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  validateMany([
    'certificateId',
    'nationalId',
  ], values, _errors, regex.number, app.translate('routes.home.basic.personnel.Enter Numbers Only'));


  let required = [
    'provinceId',
    'cityId',
    'name',
    'birthday',
    'fatherName',
    'family',
    'certificateId',
    'nationalId',
    'sex',
    'relation',
    'supported',
  ];

  if (values['nationalId'] && !regex.nationalCode.test(values['nationalId'])) {
    _errors['nationalId'] = app.translate('routes.home.basic.personnel.National Code is not valid');
  }

  if (values['nationalId'] && (!regex.number.test(values['nationalId']) || regex.persianAndLatin.test(values['nationalId']))) {
    _errors['nationalId'] = app.translate('main.Enter numbers only');
  }



  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return _errors;
};

export default validate;
