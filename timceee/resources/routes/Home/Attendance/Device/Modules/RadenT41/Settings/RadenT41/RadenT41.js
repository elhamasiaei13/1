import React from 'react';
import { Row, Col } from 'antd';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { Date, Time, Password, Toggle } from 'components/redux-form';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import { request } from './../../../../Module';

@reduxForm({
  form: 'devices-raden-t41-specific-settings',
  validate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);
    let loader;

    if (data.menuPassword) {
      loader = app.loading(app.translate('routes.home.attendance.device.Updating Device'));

      dispatch(request(props.device.id, 'changeMenuPassword', { password: data.menuPassword }, (err) => {
        if (err) {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Updating Device Failed'), 'error'));
        } else {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device updated Successfully')));
        }
      }));
    }

    if (data.usbPortPassword) {
      loader = app.loading(app.translate('routes.home.attendance.device.Updating Device'));

      dispatch(request(props.device.id, 'changeFlashAccessPassword', { password: data.usbPortPassword }, (err) => {
        if (err) {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Updating Device Failed'), 'error'));
        } else {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device updated Successfully')));
        }
      }));
    }

    if (data.powerOffPassword) {
      loader = app.loading(app.translate('routes.home.attendance.device.Updating Device'));

      dispatch(request(props.device.id, 'changePowerOffPassword', { password: data.powerOffPassword }, (err) => {
        if (err) {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Updating Device Failed'), 'error'));
        } else {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device updated Successfully')));
        }
      }));
    }

    if (data.date && data.time) {
      loader = app.loading(app.translate('routes.home.attendance.device.Updating Device'));

      dispatch(request(props.device.id, 'setDatetime', {
        datetime: data.date.substr(0, 4) + '-' + data.date.substr(5, 2) + '-' + data.date.substr(8, 2) + ' ' + data.time.substr(0, 8),
      }, (err) => {
        if (err) {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Updating Device Failed'), 'error'));
        } else {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device updated Successfully')));
        }
      }));
    }

    if (data.resetPresent) {
      loader = app.loading(app.translate('routes.home.attendance.device.Updating Device'));

      dispatch(request(props.device.id, 'resetPresent', null, (err) => {
        if (err) {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Updating Device Failed'), 'error'));
        } else {
          loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device updated Successfully')));
        }
      }));
    }
  },
})
@connect((state) => ({
  values: getFormValues('devices-raden-t41-specific-settings')(state),
}), {
  request,
})
@autobind
/**
 *
 */
export default class RadenRF900 extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    values: PropTypes.object,
    initialize: PropTypes.func,
    request: PropTypes.func,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >

      <Col md={12} lg={8}>
        <Field
          name="date"
          label={app.translate('routes.home.attendance.device.Date')}
          component={Date}
        />
      </Col>

      <Col md={12} lg={8}>
        <Field
          name="time"
          label={app.translate('routes.home.attendance.device.Time')}
          component={Time}
        />
      </Col>

      <Col md={12} lg={8}>
        <Field
          name="menuPassword"
          label={app.translate('routes.home.attendance.device.Menu Password')}
          prefix={<MaterialIcon name="keyboard-variant"/>}
          component={Password}
        />
      </Col>

      <Col md={12} lg={8}>
        <Field
          name="usbPortPassword"
          label={app.translate('routes.home.attendance.device.USB Port Password')}
          prefix={<MaterialIcon name="keyboard-variant"/>}
          component={Password}
        />
      </Col>

      <Col md={12} lg={8}>
        <Field
          name="powerOffPassword"
          label={app.translate('routes.home.attendance.device.Power Off Password')}
          prefix={<MaterialIcon name="keyboard-variant"/>}
          component={Password}
        />
      </Col>

      <Col md={12} lg={8}>
        <Field
          name="resetPresents"
          label={app.translate('routes.home.attendance.device.Reset Presents')}
          component={Toggle}
        />
      </Col>

      </Row>
    );
  }
}
