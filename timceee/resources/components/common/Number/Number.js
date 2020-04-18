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
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value ? props.value : '',
    };
  }

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
        onChange={(value) => this.setState({value})}
        value={this.state.value}
        onBlur={() => {
          this.props.onChange(this.state.value);
        }}
        style={{width: '100%'}}
      />
    );
  }
}
