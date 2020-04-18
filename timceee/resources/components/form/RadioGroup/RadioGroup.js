import React from 'react';
import PropTypes from 'prop-types';
import {Radio} from 'antd';

@autobind
/**
 *
 */
export default class RadioGroup extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    addonAfter: PropTypes.node,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  /**
   *
   * @return {Object}
   * @private
   */
  get _style() {
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
    const {children, addonAfter, ...rest} = this.props;

    return (
      <div>

        <Radio.Group
          {...rest}
          style={this._style}
        >
          {children}
        </Radio.Group>

        <span
          className="ant-input-group-addon right"
          style={{
            width: 'inherit',
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            lineHeight: '22px',
          }}
        >
          {addonAfter}
        </span>

      </div>
    );
  }
}
