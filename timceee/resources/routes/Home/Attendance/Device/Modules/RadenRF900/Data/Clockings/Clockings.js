import React from 'react';
import PropTypes from 'prop-types';
import Receive from './Receive';
import Remove from './Remove';
import Data from 'routes/Home/Attendance/Device/Modules/Components/Data';
import {Tabs} from 'antd';

@autobind
/**
 *
 */
export default class Clockings extends Data {
  static propTypes = {
    device: PropTypes.object,
  };

  /**
   *
   * @return {XML[]}
   * @private
   */
  _tabs() {
    const {device} = this.props;

    return [
      <Tabs.TabPane
        tab={app.translate('routes.home.attendance.device.Receive from device')}
        key="1"
      >
        <Receive device={device} ref={(input) => this._ref1 = input && input.getWrappedInstance()}/>
      </Tabs.TabPane>,
      <Tabs.TabPane
        tab={app.translate('routes.home.attendance.device.Remove from device')}
        key="2"
      >
        <Remove device={device} ref={(input) => this._ref1 = input && input.getWrappedInstance()}/>
      </Tabs.TabPane>,
    ];
  }
}
