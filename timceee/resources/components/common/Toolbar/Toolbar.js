import React from 'react';
import {Row} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Toolbar extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {style, children} = this.props;

    return (
      <Row
        type="flex"
        align="middle"
        style={Object.assign(
          {
            minHeight: 48,
            backgroundColor: '#d3d3d3',
            padding: 8,
          },
          style,
        )}
      >
        {children}
      </Row>
    );
  }
}
