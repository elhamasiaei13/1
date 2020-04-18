import React from 'react';
import {Input, Form} from 'antd';
import PropTypes from 'prop-types';
import DatePicker from 'components/common/DatePicker';
// import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class Date extends React.PureComponent {
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
      <DatePicker
        {...rest}
        id={name}
        name={name}
      />
    );
  }
}
