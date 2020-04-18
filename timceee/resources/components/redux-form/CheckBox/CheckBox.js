import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Form} from 'antd';

@autobind
/**
 *
 */
export default class CheckBox extends React.PureComponent {
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
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.arrayOf([
        PropTypes.string,
        PropTypes.bool,
      ]),
    ]),
    options: PropTypes.arrayOf([
      PropTypes.string,
    ]),
    disabled: PropTypes.bool,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.arrayOf([
          PropTypes.string,
          PropTypes.bool,
        ]),
      ]),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    inline: PropTypes.bool,
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    required: false,
    input: {},
    disabled: false,
    checked: false,
    defaultChecked: false,
    inline: false,
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
      input, defaultValue, disabled, options, label, inline,
      required, validateStatus, checked, defaultChecked, meta, ...rest
    } = this.props;
    return (
      <Form.Item
        label={!inline ? label : undefined}
        help={meta.error}
        required={required}
        validateStatus={meta.error ? 'error' : validateStatus}
        hasFeedback
      >
        <Checkbox.Group
          {...rest}
          name={input.name}
          defaultValue={defaultValue}
          disabled={disabled}
          options={options}
          onChange={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
        >
          {!inline ?
            <Checkbox value={input.value}/> :
            <Checkbox value={input.value}>{label}</Checkbox>
          }
        </Checkbox.Group>
      </Form.Item>
    );
  }
}
