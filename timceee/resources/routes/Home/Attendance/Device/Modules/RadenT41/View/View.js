import React from 'react';
import {Card, Button, Tabs} from 'antd';
import PropTypes from 'prop-types';
import Information from './Information';
import AccessPoints from './AccessPoints';

@autobind
/**
 *
 */
export default class View extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    onCancel: PropTypes.func,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {onCancel, device} = this.props;

    return (
      <Card
        title={app.translate('routes.home.attendance.device.View')}
        className="view"
        style={{height: '100%'}}
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
          style={{height: '100%'}}
        >
          <Tabs.TabPane
            tab={app.translate('routes.home.attendance.device.Information')}
            key="1"
          >
            <Information device={device}/>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={app.translate('routes.home.attendance.device.Access Points')}
            key="2"
          >
            <AccessPoints device={device}/>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}
