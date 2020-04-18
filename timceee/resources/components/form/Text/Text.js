import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/MaterialIcon';
import {Input} from 'antd';

@autobind
/**
 *
 */
export default class Text extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {name, ...rest} = this.props;

    return (
      <Input
        prefix={<Icon name="alphabetical"/>}
        {...rest}
        type="text"
        dir="auto"
        id={name}
        name={name}
      />
    );
  }
}
