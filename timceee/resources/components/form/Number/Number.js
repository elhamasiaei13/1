import React from 'react';
import PropTypes from 'prop-types';
import {InputNumber} from 'antd';

@autobind
/**
 *
 */
export default class Number extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {name, ...rest} = this.props;

    return (
      <InputNumber
        {...rest}
        id={name}
        name={name}
        style={{width: '100%'}}
      />
    );
  }
}
