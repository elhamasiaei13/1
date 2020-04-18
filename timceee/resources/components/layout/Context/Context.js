import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd';

@autobind
/**
 *
 */
export default class Context extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {children} = this.props;

    return (
      <Layout.Content
        className="context"
        style={{
          padding: 0,
          // margin: '0 0 24px',
          margin: 0,
        }}
      >
        {children}
      </Layout.Content>
    );
  }
}
