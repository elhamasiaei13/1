import React from 'react';
import {Card, Modal, Table as AntdTable} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {show, emptyDevice, destroyReason} from '../Module';
import MaterialIcon from 'components/common/MaterialIcon';

@connect((state) => ({
  device: state.Attendance.Device.device,
}), {
  show,
  emptyDevice,
  destroy: destroyReason,
})
@autobind
/**
 *
 */
export default class Table extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    clockingReasons: PropTypes.arrayOf(PropTypes.object),
    device: PropTypes.object,
    show: PropTypes.func,
    emptyDevice: PropTypes.func,
    destroy: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      tHeight: 400,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {show, item} = this.props;

    show(item.id, {
      includes: [
        'reasons',
      ],
    });

    this.setState({
      tHeight: $('.devices .clocking-table .ant-table').height() - 119,
    });
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyDevice();
  }

  /**
   *
   * @param {Object[]} clockingReasons
   * @param {Number} reason
   * @return {String}
   * @private
   */
  _getReasonName(clockingReasons, reason) {
    let _name;

    clockingReasons.map((clockingReason) => {
      if (clockingReason.id === reason) {
        _name = clockingReason.label;
      } else if (!app._.isEmpty(clockingReason.children)) {
        let _child = this._getReasonName(clockingReason.children, reason);
        if (_child) {
          _name = `${clockingReason.label}, ${_child}`;
        }
      }
    });

    return _name;
  }

  /**
   *
   * @param {Number} type
   * @return {String}
   * @private
   */
  _getTypeName(type) {
    let _types = [
      {
        id: 1,
        name: app.translate('routes.home.attendance.clocking.In'),
      },
      {
        id: 2,
        name: app.translate('routes.home.attendance.clocking.Out'),
      },
      {
        id: 3,
        name: app.translate('routes.home.attendance.clocking.Check-in'),
      },
    ];
    let _name;

    _types.map((_type) => {
      if (_type.id === type) {
        _name = _type.name;
      }
    });

    return _name;
  }

  /**
   *
   * @return {Object[]}
   * @private
   */
  _getColumns() {
    const {clockingReasons, destroy} = this.props;

    return [
      {
        title: app.translate('routes.home.attendance.device.Code'),
        key: '1',
        width: 50,
        render: (item) => item.pivot.deviceReasonId,
      },
      {
        title: app.translate('routes.home.attendance.device.Reason'),
        key: '2',
        width: 150,
        render: (item) => this._getReasonName(clockingReasons, item.pivot.typeId),
      },
      {
        title: app.translate('routes.home.attendance.device.Clocking Type'),
        key: '3',
        width: 150,
        render: (item) => this._getTypeName(item.pivot.type),
      },
      {
        key: 'action',
        width: 50,
        render: (item) => (
          <MaterialIcon
            name="close"
            size="tiny"
            onClick={() => Modal.confirm({
              title: app.translate('routes.home.attendance.device.Removing clocking Type'),
              content: app.translate('routes.home.attendance.device.Are you sure about removing clocking type with code', {code: item.pivot.deviceReasonId}),
              onOk: () => destroy(item.pivot.id),
            })}
            style={{color: '#f44336', cursor: 'pointer'}}
          />
        ),
      },
    ];
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {device} = this.props;

    return (
      <Card className="wrapper clocking-table">
        <AntdTable
          columns={this._getColumns()}
          dataSource={device.reasons}
          size="small"
          rowKey={(item) => item.pivot.id}
          scroll={{y: this.state.tHeight}}
          pagination={{pageSize: 100}}
        />
      </Card>
    );
  }
}
