import React from 'react';
import jMoment from 'moment-jalaali';
import {Layout} from 'antd';

@autobind
/**
 *
 */
export default class Footer extends React.PureComponent {
  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Layout.Footer style={{textAlign: 'center'}}>
        {app.translate('main.copyrights', {date: jMoment().format(app.translate('main.YYYY'))})}
      </Layout.Footer>
    );
  }
}
