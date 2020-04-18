import regex from 'services/regex';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncValidate = (values) => {
  return sleep(0)
    .then(() => {
      let _errors = {};

      let required = [
        'firstName',
        'lastName',
        'nationalCode',
        'birthCertificateNumber',
        'fatherName',
        'birthday',
        'birthPlace',
        'birthRegisterPlace',
      ];

      required.map((r) => {
        if (app._.isEmpty(values[r])) {
          _errors[r] = app.translate('main.This field is required');
        }
      });

      if (values['nationalCode'] && !regex.nationalCode.test(values['nationalCode'])) {
        _errors['nationalCode'] = app.translate('routes.home.basic.personnel.National Code is not valid');
      }

      if (!app._.isEmpty(_errors)) {
        throw _errors;
      }
    });
};

export default asyncValidate;
