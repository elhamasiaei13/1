import React from 'react';
import {Row, Col, Form} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Information extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {device} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
        }}
      >

        <Col md={12}>
          <Form.Item
            label={app.translate('routes.home.attendance.device.Address')}
            style={{display: 'flex'}}
          >
            <span className="ant-form-text">{device.address}</span>
          </Form.Item>
        </Col>

        <Col md={12}>
          <Form.Item
            label={app.translate('routes.home.attendance.device.Port')}
            style={{display: 'flex'}}
          >
            <span className="ant-form-text">{device.port}</span>
          </Form.Item>
        </Col>

      </Row>
    );
  }
}
