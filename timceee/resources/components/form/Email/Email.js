import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import {Input} from 'antd';

@autobind
/**
 *
 */
export default class Email extends React.PureComponent {
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
      <Input
        prefix={<MaterialIcon name="email"/>}
        {...rest}
        type="email"
        dir="auto"
        id={name}
        name={name}
      />
    );
  }
}
