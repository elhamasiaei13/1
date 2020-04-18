const validate = (values) => {
  let _errors = {};

  let required = [
    'typeId',
    'entryType',
    'date',
    'time',
  ];

  required.map((r) => {
    if (!values[r] || ( Array.isArray(values[r]) && app._.isEmpty(values[r]))) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return _errors;
};

export default validate;
