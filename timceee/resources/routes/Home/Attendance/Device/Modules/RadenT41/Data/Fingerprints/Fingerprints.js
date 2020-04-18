import React from 'react';
import Send from './Send';
import Remove from './Remove';
import Receive from './Receive';
import PropTypes from 'prop-types';
import Data from 'routes/Home/Attendance/Device/Modules/Components/Data';
import {Tabs} from 'antd';

@autobind
/**
 *
 */
export default class Fingerprints extends Data {
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
        tab={app.translate('routes.home.attendance.device.Send to device')}
        key="1"
      >
        <Send device={device} ref={(input) => this._ref1 = input}/>
      </Tabs.TabPane>,
      <Tabs.TabPane
        tab={app.translate('routes.home.attendance.device.Receive from device')}
        key="2"
      >
        <Receive device={device} ref={(input) => this._ref2 = input}/>
      </Tabs.TabPane>,
      <Tabs.TabPane
        tab={app.translate('routes.home.attendance.device.Remove from device')}
        key="3"
      >
        <Remove device={device} ref={(input) => this._ref3 = input}/>
      </Tabs.TabPane>,
    ];
  }
}
