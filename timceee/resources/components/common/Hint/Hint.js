import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Tooltip} from 'antd';

@autobind
/**
 *
 */
export default class Hint extends React.PureComponent {
  static propTypes = {
    placement: PropTypes.oneOf([
      'top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom',
    ]),
    text: PropTypes.string,
  };

  static defaultProps = {
    text: 'hint',
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {text, placement, ...rest} = this.props;

    return (
      <Tooltip
        title={text}
        placement={placement}
        {...rest}
      >
        <span>
          <MaterialIcon
            name="help-circle"
            size="tiny"
            style={{color: '#9e9e9e'}}
          />
        </span>
      </Tooltip>
    );
  }
}
