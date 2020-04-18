import React from 'react';
import {Col} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class ToolbarGroup extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    firstChild: PropTypes.bool,
    lastChild: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    firstChild: false,
    lastChild: false,
    style: {display: 'flex',},
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {firstChild, lastChild, children, style} = this.props;

    return (
      <Col
        md={(firstChild || lastChild) ? 12 : 24}
        sm={24}
        pull={firstChild ? 12 : 0}
        push={lastChild ? 12 : 0}
        style={style}
      >
        {children}
      </Col>
    );
  }
}
