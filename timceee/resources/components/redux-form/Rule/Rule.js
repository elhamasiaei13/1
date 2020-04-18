import React from 'react';
import {Input, Form} from 'antd';
import PropTypes from 'prop-types';
// import MaterialIcon from 'components/common/MaterialIcon';
import RulesList from 'routes/Home/Attendance/Rules/List/ListWrapper';

@autobind
/**
 *
 */
export default class Rule extends React.PureComponent {
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
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
        ),
      ]),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    componentName: PropTypes.string,
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
      input,label, required,meta, ...rest
    } = this.props;

    return (
      <Form.Item
        help={meta.touched && meta.error}
        validateStatus={this._validateStatus()}
        hasFeedback
        required={required}
      >
        <RulesList
          {...rest}
          title={<span>{!!required && <span className="required">*</span>}{label}</span>}
          selected={input.value ? Array.isArray(input.value) ? input.value : [input.value] : []}
          onCheck={input.onChange}
          />
      </Form.Item>
    );
  }
}
