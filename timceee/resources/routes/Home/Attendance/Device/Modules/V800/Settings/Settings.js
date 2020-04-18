import React from 'react';
import {Card, Button, Tabs} from 'antd';
import {connect} from 'react-redux';
import {submit} from 'redux-form';
import PropTypes from 'prop-types';
import Setting from './../../../Setting';
import V800 from './V800';

@connect(null, {
  submit,
})
@autobind
/**
 *
 */
export default class Settings extends React.PureComponent {
  static propTypes = {
    submit: PropTypes.func,
    device: PropTypes.object,
    onCancel: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      tab: '1',
    };
  }

  /**
   *
   * @private
   */
  _submit() {
    const {submit} = this.props;
    const {tab} = this.state;

    switch (tab) {
      case '2':
        submit('devices-v800-specific-settings');
        break;
      case '1':
      default:
        submit('devices-v800-general-settings');
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {tab} = this.state;
    const {onCancel, device} = this.props;

    return (
      <Card
        className="wrapper settings"
        title={app.translate('routes.home.attendance.device.Settings')}
        extra={
          <Button
            type="dashed"
            onClick={() => onCancel()}
          >
            {app.translate('main.Back')}
          </Button>
        }
      >
        <Tabs
          style={{
            height: '100%',
          }}
          onChange={(tab) => this.setState({tab})}
          activeKey={tab}
          tabBarExtraContent={
            <Button
              type="primary"
              onClick={this._submit}
            >
              {app.translate('main.Submit')}
            </Button>
          }
        >
          <Tabs.TabPane
            tab={app.translate('routes.home.attendance.device.General Settings')}
            key="1"
          >
            <Setting device={device}/>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={app.translate('routes.home.attendance.device.V800 Settings')}
            key="2"
          >
            <V800 device={device}/>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}
