import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Form} from 'antd';

@autobind
/**
 *
 */
export default class CheckBoxGroup extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    required: PropTypes.bool,
    meta: PropTypes.object,
    validateStatus: PropTypes.oneOf([
      'success', 'warning', 'error', 'validating',
    ]),
    defaultValue: PropTypes.arrayOf([
      PropTypes.string,
    ]),
    options: PropTypes.arrayOf([
      PropTypes.string,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    disabled: PropTypes.bool,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.arrayOf([
        PropTypes.string,
      ]),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    required: false,
    input: {},
    disabled: false,
  };

  /**
   *
   */
  componentWillMount() {
    super.componentWillMount();

    const {input, defaultValue} = this.props;

    input.onChange(defaultValue);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultValue, disabled, options, children, label,
      required, validateStatus, meta, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.error}
        required={required}
        validateStatus={meta.error ? 'error' : validateStatus}
        hasFeedback
      >
        <Checkbox.Group
          {...rest}
          name={input.name}
          value={input.value}
          defaultValue={defaultValue}
          disabled={disabled}
          options={options}
          onChange={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
        >
          {children}
        </Checkbox.Group>
      </Form.Item>
    );
  }
}
