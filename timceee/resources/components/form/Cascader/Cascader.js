import React from 'react';
import {Form, Cascader as AntdCascader} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Cascader extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    size: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    validateStatus: PropTypes.oneOf([
      'success', 'warning', 'error', 'validating',
    ]),
    meta: PropTypes.object,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
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
    items: [],
    label: undefined,
    validateStatus: undefined,
    input: {
      value: '',
    },
    disabled: false,
    required: false,
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
   * @return {String}
   * @private
   */
  _validateStatus() {
    const {disabled, required, validateStatus, input, meta} = this.props;
    let _status = validateStatus;

    if (!disabled) {
      if (meta.asyncValidating) {
        _status = 'validating';
      } else if (meta.touched) {
        if (meta.error) {
          _status = 'error';
        } else {
          if (!required && app._.isEmpty(input.value)) {
            _status = 'warning';
          } else if (meta.valid) {
            _status = 'success';
          }
        }
      }
    }

    return _status;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultValue, size, disabled, label, meta,
      required, items, validateStatus, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
      >
        <AntdCascader
          {...rest}
          id={input.name}
          name={input.name}
          options={items}
          size={size}
          onChange={input.onChange}
          onBlur={(proxy, event) => input.onBlur(event, input.value, '')}
          onFocus={input.onFocus}
          value={input.value}
          defaultValue={defaultValue}
          disabled={disabled}
          dir="auto"
          placeholder={app.translate('main.Please Select')}
        />
      </Form.Item>
    );
  }
}
