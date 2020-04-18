import React from 'react';
import {Input, Form} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Text extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
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

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultValue, disabled, label, meta,
      required, validateStatus, inline, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
        {...this._inline()}
      >
        <Input
          {...rest}
          type="text"
          dir="auto"
          id={input.name}
          name={input.name}
          value={input.value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={(e) => {
            input.onChange( app.transform.fa2en(e.target.value));
          }}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
        />
      </Form.Item>
    );
  }
}
