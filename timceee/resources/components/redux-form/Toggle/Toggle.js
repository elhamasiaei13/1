import React from 'react';
import {Switch, Form} from 'antd';
import PropTypes from 'prop-types';

@autobind
/**
 *
 */
export default class Toggle extends React.PureComponent {
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
    defaultChecked: PropTypes.bool,
    checkedChildren: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    unCheckedChildren: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    size: PropTypes.string,
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
      ]),
      onChange: PropTypes.func,
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
    defaultChecked: false,
    size: 'default',
  };

  /**
   *
   */
  componentWillMount() {
    super.componentWillMount();

    const {input, defaultChecked} = this.props;

    input.onChange(defaultChecked);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultChecked, checkedChildren, unCheckedChildren, size, label,
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
        <Switch
          checked={app._.isBoolean(input.value) ? input.value : defaultChecked}
          defaultChecked={defaultChecked}
          onChange={input.onChange}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          size={size}
          {...rest}
        />
      </Form.Item>
    );
  }
}
