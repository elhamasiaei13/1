import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';
import store from 'store';

const validate = (values) => {
  let _errors = {};

  let required = [
    'clockingReasonId',
    'deviceReasonId',
    'type',
  ];

  required.map((r) => {
    if (!values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  let _reasons = store.getState().Attendance.Device.device.reasons;
  if (_reasons && _reasons.findIndex((item) => item.pivot.deviceReasonId == values.deviceReasonId) > -1) {
    _errors.deviceReasonId = app.translate('main.Duplicate entry');
  }

  validateMany([
    'deviceReasonId',
  ], values, _errors, regex.number, app.translate('main.Enter numbers only'));

  return _errors;
};

export default validate;
