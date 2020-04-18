import React from 'react';
import {Row, Col, Form} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spin from 'components/common/Spin';
import {request} from '../../../Module';

@connect(null, {
  request,
})
@autobind
/**
 *
 */
export default class Information extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    request: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      information: {},
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {request, device} = this.props;

    request(device.id, 'getDeviceInfo', null, (err, res) => !err && this.setState({information: res.data, loading: false}));
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {information, loading} = this.state;

    return (
      <Spin spinning={loading}>
        <Row
          gutter={16}
          style={{
            height: '100%',
          }}
        >

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Name')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.deviceName}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Identifier')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.deviceId}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Firmware')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.firmware}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Clockings Count')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.countIoEvent}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.FingerPrints Count')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.countFinger}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Cards Count')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.countCard}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Adapter State')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.adapterState ? app.translate('main.Active') : app.translate('main.Disabled')}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Battery State')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.batteryState ? information.batteryIndex : app.translate('main.Disabled')}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Memory Size')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.memorySize} {app.translate('main.KB')}</span>
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label={app.translate('routes.home.attendance.device.Memory Used')}
              style={{display: 'flex'}}
            >
              <span className="ant-form-text">{information.memoryUsed} {app.translate('main.KB')}</span>
            </Form.Item>
          </Col>

        </Row>
      </Spin>
    );
  }
}
