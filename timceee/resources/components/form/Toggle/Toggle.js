import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'antd';

@autobind
/**
 *
 */
export default class Toggle extends React.PureComponent {
  static propTypes = {
    value: PropTypes.bool,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {value, ...rest} = this.props;

    return (
      <Switch
        {...rest}
        checked={value}
      />
    );
  }
}
