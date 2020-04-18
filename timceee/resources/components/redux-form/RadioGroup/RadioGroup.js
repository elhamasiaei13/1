import React from 'react';
import PropTypes from 'prop-types';
import {Radio, Form} from 'antd';

@autobind
/**
 *
 */
export default class RadioGroup extends React.PureComponent {
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
    defaultValue: PropTypes.any,
    size: PropTypes.oneOf([
      'small', 'default', 'large',
    ]),
    options: PropTypes.oneOfType([
      PropTypes.arrayOf([
        PropTypes.string,
      ]),
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          disabled: PropTypes.bool,
        }),
      ),
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    disabled: PropTypes.bool,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    style: PropTypes.object,
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    required: false,
    input: {},
    style: {},
    disabled: false,
    size: 'default',
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
   * @return {Object}
   * @private
   */
  _getStyle() {
    const {style} = this.props;
    let _style = {
      height: 32,
      lineHeight: '32px',
    };

    _style = Object.assign({}, _style, style);

    return _style;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultValue, size, options, children, disabled, label,
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
        <Radio.Group
          {...rest}
          name={input.name}
          value={input.value}
          defaultValue={defaultValue}
          size={size}
          disabled={disabled}
          options={options}
          onChange={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          style={this._getStyle()}
        >
          {children}
        </Radio.Group>
      </Form.Item>
    );
  }
}
