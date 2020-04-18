import validateMany from 'services/redux-form/validateMany';
import regex from 'services/regex';
import store from 'store';

const validate = (values, props) => {
  let formFields = props.formFields ? props.formFields : props.fields ? props.fields : undefined;
  let _values = values.values ? values.values : {};
  let _errors = {};

  let required = [];

  let time = [
    'timeFrom',
    'timeTo',
    'time',
    'timeFromGoing',
    'timeToGoing',
    'timeFromBack',
    'timeToBack',
  ];

  if (!formFields) {
    formFields = store.getState().FormBuilder.fields;
  }

  if (formFields && formFields.fields) {
    formFields.fields.map((field) => {
      required.push(app._.camelCase(field.name));
    });
  }

  validateMany([
    'substituteId',
  ], _values, _errors, regex.number, app.translate('main.Enter numbers only'));

  if (_values['dateFrom'] && _values['dateTo']) {
    if (_values['dateFrom'] > _values['dateTo']) {
      _errors['dateTo'] = app.translate('components.form-builder.This field should be greater than the start time');
    }
    if (_values['dateFrom'] === _values['dateTo'] && _values['timeFrom'] && _values['timeTo'] && _values['timeFrom'] > _values['timeTo']) {
      _errors['timeTo'] = app.translate('components.form-builder.This field should be greater than the start time');
    }
  }
  if (_values['date'] && _values['timeFrom'] && _values['timeTo'] && _values['timeFrom'] >= _values['timeTo']) {
    _errors['timeTo'] = app.translate('components.form-builder.This field should be greater than the start time');
  }
  if (app._.isEmpty(_values['requestTypeId'])) {
    _errors['requestTypeId'] = app.translate('main.This field is required');
  }

  if (app._.isEmpty(_values['positionId']) || _values['positionId'] === '0') {
    _errors['positionId'] = app.translate('components.form-builder.Please select one of positions');
  }

  if (_values['dateFromGoing'] && _values['dateToGoing']) {
    if (_values['dateFromGoing'] > _values['dateToGoing']) {
      _errors['dateToGoing'] = app.translate('components.form-builder.This field should be greater than the start time');
    }
    if (_values['dateFromGoing'] === _values['dateToGoing'] && _values['timeFromGoing'] && _values['timeToGoing'] && _values['timeFromGoing'] > _values['timeToGoing']) {
      _errors['timeToGoing'] = app.translate('components.form-builder.This field should be greater than the start time');
    }
  }

  if (_values['dateToGoing'] && _values['dateFromBack']) {
    if (_values['dateToGoing'] > _values['dateFromBack']) {
      _errors['dateFromBack'] = app.translate('components.form-builder.This field should be greater than the start time');
    }
    if (_values['dateToGoing'] === _values['dateFromBack'] && _values['timeToGoing'] && _values['timeFromBack'] && _values['timeToGoing'] > _values['timeFromBack']) {
      _errors['timeFromBack'] = app.translate('components.form-builder.This field should be greater than the start time');
    }
  }

  if (_values['dateFromBack'] && _values['dateToBack']) {
    if (_values['dateFromBack'] > _values['dateToBack']) {
      _errors['dateToBack'] = app.translate('components.form-builder.This field should be greater than the start time');
    }
    if (_values['dateFromBack'] === _values['dateToBack'] && _values['timeFromBack'] && _values['timeToBack'] && _values['timeFromBack'] > _values['timeToBack']) {
      _errors['timeToBack'] = app.translate('components.form-builder.This field should be greater than the start time');
    }
  }

  if (_values['dailyReport']) {
    _values['dailyReport'].map((item, index) => {
      if (item['timeFrom'] && !item['timeTo']) {
        if (!_errors['dailyReport']) {
          _errors['dailyReport'] = [];
        }
        if (!_errors['dailyReport'][index]) {
          _errors['dailyReport'][index] = [];
        }
        _errors['dailyReport'][index]['timeTo'] = app.translate('main.This field is required');
      }
      if (!item['timeFrom'] && item['timeTo']) {
        if (!_errors['dailyReport']) {
          _errors['dailyReport'] = [];
        }
        if (!_errors['dailyReport'][index]) {
          _errors['dailyReport'][index] = [];
        }
        _errors['dailyReport'][index]['timeFrom'] = app.translate('main.This field is required');
      }
      if (item['timeFrom'] && item['timeTo'] && item['timeFrom'] > item['timeTo']) {
        if (!_errors['dailyReport']) {
          _errors['dailyReport'] = [];
        }
        if (!_errors['dailyReport'][index]) {
          _errors['dailyReport'][index] = [];
        }
        _errors['dailyReport'][index]['timeTo'] = app.translate('components.form-builder.This field should be greater than the start time');
      }
    });
  }

  time.map((r) => {
    if (_values[r] && _values[r].length < 5) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  required.map((r) => {
    if (!_values[r]) {
      _errors[r] = app.translate('main.This field is required');
    }
  });

  return {values: _errors};
};

export default validate;
