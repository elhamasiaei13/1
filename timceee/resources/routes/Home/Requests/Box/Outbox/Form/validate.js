import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';

const validate = (values) => {
  let _errors = {};

  let required = [
    'reason',
    'positionId',
    'typeId',
    'dateFrom',
    'dateTo',
    'timeFrom',
    'timeTo',
    'time',
    'date',
    'SelectField',
    'SelectRequest',
    'dateFromGoing',
    'timeFromGoing',
    'dateToGoing',
    'timeToGoing',
    'dateFromBack',
    'timeFromBack',
    'dateToBack',
    'timeToBack',
  ];
  let time = [
    'timeFrom',
    'timeTo',
    'time',
    'timeFromGoing',
    'timeToGoing',
    'timeFromBack',
    'timeToBack',
  ];
  validateMany([
    'substituteId',
  ], values, _errors, regex.number, app.translate('main.Enter numbers only'));

  validateMany(time, values, _errors, regex.time, app.translate('main.Enter time only'));

  if (values['dateFromGoing'] && values['dateToGoing']) {
    if (values['dateFromGoing'] > values['dateToGoing']) {
      _errors['dateToGoing'] = app.translate('routes.home.requests.This field should be greater than the start time');
    }
    if (values['dateFromGoing'] === values['dateToGoing'] && values['timeFromGoing'] && values['timeToGoing'] && values['timeFromGoing'] > values['timeToGoing']) {
      _errors['timeToGoing'] = app.translate('routes.home.requests.This field should be greater than the start time');
    }
  }

  if (values['dateToGoing'] && values['dateFromBack']) {
    if (values['dateToGoing'] > values['dateFromBack']) {
      _errors['dateFromBack'] = app.translate('routes.home.requests.This field should be greater than the start time');
    }
    if (values['dateToGoing'] === values['dateFromBack'] && values['timeToGoing'] && values['timeFromBack'] && values['timeToGoing'] > values['timeFromBack']) {
      _errors['timeFromBack'] = app.translate('routes.home.requests.This field should be greater than the start time');
    }
  }

  if (values['dateFromBack'] && values['dateToBack']) {
    if (values['dateFromBack'] > values['dateToBack']) {
      _errors['dateToBack'] = app.translate('routes.home.requests.This field should be greater than the start time');
    }
    if (values['dateFromBack'] === values['dateToBack'] && values['timeFromBack'] && values['timeToBack'] && values['timeFromBack'] > values['timeToBack']) {
      _errors['timeToBack'] = app.translate('routes.home.requests.This field should be greater than the start time');
    }
  }


  if (values['dateFrom'] && values['dateTo']) {
    if (values['dateFrom'] > values['dateTo']) {
      _errors['dateTo'] = app.translate('routes.home.requests.This field should be greater than the start time');
    }
    if (values['dateFrom'] === values['dateTo'] && values['timeFrom'] && values['timeTo'] && values['timeFrom'] > values['timeTo']) {
      _errors['timeTo'] = app.translate('routes.home.requests.This field should be greater than the start time');
    }
  }
  if (values['date'] && values['timeFrom'] && values['timeTo'] && values['timeFrom'] >= values['timeTo']) {
    _errors['timeTo'] = app.translate('routes.home.requests.This field should be greater than the start time');
  }
  if (app._.isEmpty(values['requestTypeId'])) {
    _errors['requestTypeId'] = app.translate('main.This field is required');
  }

  if (app._.isEmpty(values['positionId']) || values['positionId'] === '0') {
    _errors['positionId'] = app.translate('routes.home.requests.Please select one of positions');
  }
  if (app._.isEmpty(values['requestId']) || values['requestId'] === '0') {
    _errors['requestId'] = app.translate('routes.home.requests.Please select one of request');
  }
  time.map((r) => {
    if (values[r] && values[r].length < 5) {
      _errors[r] = app.translate('main.This field is required');
    }
  });
  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return _errors;
};

export default validate;
