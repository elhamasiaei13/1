import React from 'react';
import {InputNumber, Form} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Number extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    required: PropTypes.bool,
    inline: PropTypes.bool,
    meta: PropTypes.object,
    validateStatus: PropTypes.oneOf([
      'success', 'warning', 'error', 'validating',
    ]),
    min: PropTypes.number,
    max: PropTypes.number,
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
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    hint: PropTypes.string,
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    required: false,
    inline: false,
    input: {},
    disabled: false,
    hint: undefined,
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
        if (meta.error || validateStatus === 'error') {
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
   * @return {Object}
   * @private
   */
  _inline() {
    const {inline} = this.props;

    if (inline) {
      return {
        labelCol: {span: 6},
        wrapperCol: {span: 18},
      };
    }

    return {};
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultValue, size, onPressEnter, addonBefore,
      addonAfter, prefix, suffix, min, max, disabled, label, hint,
      required, validateStatus, meta, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.touched ? meta.error ? meta.error : hint : undefined}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
        {...this._inline()}
      >
        <InputNumber
          {...rest}
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
          onChange={(value) => {
            input.onChange(app.transform.fa2en(`${value}`));
          }}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          min={min}
          max={max}
          style={{width: '100%'}}
        />
      </Form.Item>
    );
  }
}
