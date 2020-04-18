const validate = (values) => {
  let _errors = {};

  let required = [
    'clockingReasonId',
    'registrationDatetime',
    'dateFrom',
    'dateTo',
    'timeFrom',
    'timeTo',
  ];
  if (values['dateFrom'] > values['dateTo']) {
    _errors['dateTo'] = app.translate('routes.home.requestsThis field should be greater than the start time');
  }
  if (values['dateFrom'] === values['dateTo'] && values['timeFrom'] > values['timeTo']) {
    _errors['timeTo'] = app.translate('routes.home.requestsThis field should be greater than the start time');
  }
  if (app._.isEmpty(values['clockingReasonId'])) {
    _errors['clockingReasonId'] = app.translate('main.This field is required');
  }

  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return _errors;
};

export default validate;
