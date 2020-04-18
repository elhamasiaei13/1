import React from 'react';
import {Input, Form, Tooltip} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class InputTooltip extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    inline: PropTypes.bool,
    validateStatus: PropTypes.oneOf([
      'success', 'warning', 'error', 'validating',
    ]),
    meta: PropTypes.object,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    separator: PropTypes.string,
    mask: PropTypes.string,
    tooltip: PropTypes.string,
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    input: {
      value: '',
    },
    disabled: false,
    required: false,
    inline: false,
    separator: ' ',
    mask: '___',
    tooltip: '',
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


  formatNumber(value, separator, _length = 0) {
    const {mask} = this.props;
    value += '';
    let result = '';

    let num = value;
    let _list = mask.split(separator);
    for (let i = 0; i < _list.length; i++) {
      let length = (_length !== 0 ? _length : _list[i].length);
      if (num.length < length) {
        if (num.length === 0) {
          result = `${result}${_list[i]}${separator}`;
        } else {
          result = `${result}${num}${_list[i].slice(num.length)}${separator}`;
          num = '';
        }
      } else {
        result = `${result}${num.slice(0, length)}${separator}`;
        num = num.slice(length);
      }
    }

    return `${result}`;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultValue, disabled, label, meta, type, separator, tooltip,
      required, validateStatus, inline, ...rest
    } = this.props;

    const title = input.value ? (
      <span
        className="numeric-input-title"
        style={{
          direction: 'ltr',
          display: 'inline-block',
        }}>
        {input.value !== '-' ? this.formatNumber(input.value, separator) : '-'}
      </span>
    ) : tooltip;

    return (
      <Form.Item
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
        {...this._inline()}
      >
        <Tooltip
          trigger={['focus']}
          title={title}
          placement="topLeft"
          overlayClassName="numeric-input"
        >
          <Input
            {...rest}
            type={type}
            dir="auto"
            id={input.name}
            name={input.name}
            value={input.value}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={(e) => {
              input.onChange(app.transform.fa2en(e.target.value));
            }}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
          />
        </Tooltip>
      </Form.Item>
    );
  }
}
