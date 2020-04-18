import React from 'react';
import PropTypes from 'prop-types';
import { Row, Modal } from 'antd';
import { connect } from 'react-redux';
import { request } from 'routes/Home/Attendance/Device/Module';

@connect(null, {
  request,
}, null, { withRef: true })
@autobind
/**
 *
 */
export default class Remove extends React.PureComponent {
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

    this.state = {};
  }
  /**
   *
   * @param {Function} [callback=(function())]
   */
  submit(callback = () => {}) {
    const { request, device } = this.props;

    Modal.confirm({
      title: app.translate('routes.home.attendance.device.Removing all users'),
      content: app.translate('routes.home.attendance.device.Are you sure about removing all users from device'),
      onOk: () => {
        let loader = app.loading(app.translate('routes.home.attendance.device.Removing Personnel'));

        request(device.id, 'removeAllPersons', null, (err) => {
          loader.hide(() => {
            if (err) {
              return app.message(app.translate('routes.home.attendance.device.Removing Personnel Failed'), 'error');
            }

            app.message(app.translate('routes.home.attendance.device.Removing Personnel Was Successful'));
          });

          callback();
        });
      },
      onCancel: () => callback(),
    });
  }

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
          textAlign: 'center',
        }}
      >

        {app.translate('routes.home.attendance.device.Removing all users from device')}

      </Row>
    );
  }
}
