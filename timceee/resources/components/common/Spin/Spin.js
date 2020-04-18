import React from 'react';
import PropTypes from 'prop-types';
import {Spin as AntdSpin} from 'antd';

@autobind
/**
 *
 */
export default class Spin extends React.PureComponent {
  static propTypes = {
    size: PropTypes.oneOf([
      'small', 'default', 'large',
    ]),
    spinning: PropTypes.bool,
    tip: PropTypes.string,
    delay: PropTypes.number,
    wrapperClassName: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    size: 'default',
    spinning: true,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      children,
      size,
      spinning,
      tip,
      delay,
      wrapperClassName,
      ...rest
    } = this.props;

    return (
      <AntdSpin
        size={size}
        spinning={spinning}
        tip={tip}
        delay={delay}
        wrapperClassName={wrapperClassName}
        {...rest}
      >
        {children}
      </AntdSpin>
    );
  }
}
