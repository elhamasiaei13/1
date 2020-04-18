import React from 'react';
import {Input, Form} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Phone extends React.PureComponent {
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
    defaultValue: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    addonBefore: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    addonAfter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    prefix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    onPressEnter: PropTypes.func,
    autosize: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        minRows: PropTypes.number,
        maxRows: PropTypes.number,
      }),
    ]),
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
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
      input, defaultValue, size, onPressEnter, addonBefore,
      addonAfter, disabled, prefix, suffix, label,
      required, validateStatus, meta, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
      >
        <Input
          type="tel"
          id={input.name}
          name={input.name}
          value={input.value}
          defaultValue={defaultValue}
          size={size}
          disabled={disabled}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          prefix={prefix}
          suffix={suffix}
          onPressEnter={onPressEnter}
          onChange={(e) => {
            input.onChange( app.transform.fa2en(e.target.value));
          }}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          {...rest}
        />
      </Form.Item>
    );
  }
}
