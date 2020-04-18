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
      addonAfter, disabled, label, required, validateStatus,
      meta, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
      >
        <DatePicker
          {...rest}
          // type="date"
          id={input.name}
          name={input.name}
          value={input.value}
          // defaultValue={defaultValue}
          size={size}
          disabled={disabled}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          onPressEnter={onPressEnter}
          onChange={(value) => {
            input.onChange(app.transform.fa2en(value));
          }}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
        />
        {/*<Input*/}
        {/*{...rest}*/}
        {/*type="date"*/}
        {/*id={input.name}*/}
        {/*name={input.name}*/}
        {/*value={input.value}*/}
        {/*defaultValue={defaultValue}*/}
        {/*size={size}*/}
        {/*disabled={disabled}*/}
        {/*addonBefore={addonBefore}*/}
        {/*addonAfter={addonAfter}*/}
        {/*onPressEnter={onPressEnter}*/}
        {/*onChange={input.onChange}*/}
        {/*onBlur={input.onBlur}*/}
        {/*onFocus={input.onFocus}*/}
        {/*prefix={<MaterialIcon name="calendar"/>}*/}
        {/*/>*/}
      </Form.Item>
    );
  }
}
