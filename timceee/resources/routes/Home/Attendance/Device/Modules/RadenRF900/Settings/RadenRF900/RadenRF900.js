import React from 'react';
import {Row, Col, Button} from 'antd';
import {reduxForm, Field, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {Date, Time} from 'components/redux-form';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import {request} from './../../../../Module';

@reduxForm({
  form: 'devices-raden-rf900-specific-settings',
  validate,
  onSubmit: (values, dispatch, props) => {
    let loader = app.loading(app.translate('routes.home.attendance.device.Updating Device'));

    dispatch(request(props.device.id, 'setDatetime', values, (err) => {
      if (err) {
        loader.hide(() => app.message(app.translate('routes.home.attendance.device.Updating Device Failed'), 'error'));
      } else {
        loader.hide(() => app.message(app.translate('routes.home.attendance.device.Device updated Successfully')));
      }
    }));
  },
})
@connect((state) => ({
  values: getFormValues('devices-raden-rf900-specific-settings')(state),
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

  _Command(command = '') {
    const {request} = this.props;
    request(this.props.device.id, command, {}, (err) => {
      console.info(command, err);
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    let admin = false;
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
            prefix={<MaterialIcon name="alphabetical"/>}
            component={Date}
          />
        </Col>

        <Col md={12} lg={8}>
          <Field
            name="time"
            label={app.translate('routes.home.attendance.device.Time')}
            prefix={<MaterialIcon name="alphabetical"/>}
            component={Time}
          />
        </Col>
        { admin &&
          <Col sm={24}>
            <Button onClick={() => this._Command('InitDeviceAdmin')}>Init Device Admin</Button>
            <Button onClick={() => this._Command('DeleteAllEmployee')}>Delete All Employee</Button>
            <Button onClick={() => this._Command('DeleteAllRecord')}>Delete All Record</Button>
            <Button onClick={() => this._Command('DeleteUploadedRecord')}>Delete Uploaded Record</Button>
            <Button onClick={() => this._Command('ClearWorkCode')}>Clear Work Code</Button>
            <Button onClick={() => this._Command('ClearWorkStatus')}>Clear Work Status</Button>
            <Button onClick={() => this._Command('InitDevice')}>Factory Settings</Button>
          </Col>
        }
      </Row>
    );
  }
}
