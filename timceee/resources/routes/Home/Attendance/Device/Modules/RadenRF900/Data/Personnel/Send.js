import React from 'react';
import {Row, Col} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import UsersList from 'routes/Home/Basic/Personnel/List/ListWrapper';
import {request} from './../../../../Module';

@connect(null, {
  request,
}, null, {withRef: true})
@autobind
/**
 *
 */
export default class Send extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    request: PropTypes.func,
  };

  /**
   *
   * @param {Function} [callback=(function())]
   */
  submit(callback = () => {}) {
    const {request, device} = this.props;

    let loader = app.loading(app.translate('routes.home.attendance.device.Sending Personnel'));

    request(device.id, 'setPersons', {users: this.usersList.getSelected()}, (err) => {
      loader.hide(() => {
        if (err) {
          return app.message(app.translate('routes.home.attendance.device.Sending Personnel Failed'), 'error');
        }

        app.message(app.translate('routes.home.attendance.device.Sending Personnel Was Successful'));
      });

      callback();
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
        }}
      >

        <Col
          style={{
            height: '100%',
          }}
        >
          <UsersList
            style={{height: '100%'}}
            selected={[]}
            reference={(input) => this.usersList = input}
          />
        </Col>

      </Row>
    );
  }
}
