import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {request} from '../../../Module';

@connect(null, {
  request,
})
@autobind
/**
 *
 * @extends React.PureComponent
 */
export default class AccessPoints extends React.PureComponent {
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
      accessPoints: [],
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {request, device} = this.props;

    request(device.id, 'getAccesspointList', null, (err, res) => !err && this.setState({
      accessPoints: res.data,
      loading: false,
    }));
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  _getColumns() {
    return [
      {title: app.translate('routes.home.attendance.device.SSID'), dataIndex: 'name', key: '1', width: 150},
      {title: app.translate('routes.home.attendance.device.MAC Address'), dataIndex: 'apAddr', key: '2', width: 150},
      {title: app.translate('routes.home.attendance.device.Auth Mode'), dataIndex: 'authMode', key: '3', width: 150},
      {title: app.translate('routes.home.attendance.device.Channel'), dataIndex: 'channel', key: '4', width: 150},
      {title: app.translate('routes.home.attendance.device.Encrypt Type'), dataIndex: 'encryptType', key: '5', width: 150},
      {title: app.translate('routes.home.attendance.device.Encryption Key'), dataIndex: 'encryptionKey', key: '6', width: 150},
      {
        title: app.translate('routes.home.attendance.device.Connection Status'),
        dataIndex: 'isConnected',
        key: '7',
        width: 150,
        render: (text) => text ? app.translate('routes.home.attendance.device.Connected') : app.translate('routes.home.attendance.device.Disconnected'),
      },
      {title: app.translate('routes.home.attendance.device.Network Type'), dataIndex: 'networkType', key: '8', width: 150},
    ];
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {accessPoints, loading} = this.state;

    return (
      <Table
        columns={this._getColumns()}
        dataSource={accessPoints}
        size="small"
        rowKey="name"
        style={{position: 'absolute', height: '100%'}}
        loading={loading}
        pagination={false}
      />
    );
  }
}
