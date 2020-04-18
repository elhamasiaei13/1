import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  validateMany([
    'name',
  ], values, _errors, regex.persianAndLatin, app.translate('main.Enter Persian/Latin words only'));

  return _errors;
};

export default validate;
