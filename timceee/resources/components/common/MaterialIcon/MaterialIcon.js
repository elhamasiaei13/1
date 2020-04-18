import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'antd';

@autobind
/**
 *
 */
export default class MaterialIcon extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf([
      'tiny', 'small', 'medium', 'large',
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    spin: PropTypes.bool,
    disabled: PropTypes.bool,
    tooltip: PropTypes.string,
  };

  static defaultProps = {
    name: 'help',
    style: {},
    className: '',
    spin: false,
    disabled: false,
  };

  static compName = 'MaterialIcon';

  /**
   *
   * @return {Object}
   * @private
   */
  get _style() {
    const {size, style} = this.props;
    let _style = {};
    let _size = 0;

    // noinspection FallThroughInSwitchStatementJS
    switch (size) {
      case 'large':
        _size += 2;
      case 'medium':
        _size += 2;
      case 'small':
        _size += 1;
      case 'tiny':
        _size += 1;
        _size += 'rem';
        break;
      default:
        _size = '';
    }

    _style = Object.assign(_style, {
      fontSize: _size,
    }, style);

    return _style;
  }

  /**
   *
   * @param {*} event
   * @private
   */
  _onClick(event) {
    const {onClick, disabled} = this.props;

    if (onClick) {
      event.stopPropagation();

      if (!disabled) {
        onClick(event);
      }
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {name, onClick, className, spin, disabled, tooltip} = this.props;

    let _icon = (
      <i
        ref={(input) => this._node = input}
        onClick={this._onClick}
        className={`mdi mdi-${name} ${spin && 'anticon-spin'} ${className} ${onClick ? 'click' : ''} ${disabled ? 'disabled' : ''}`}
        style={this._style}
      />
    );

    return tooltip ? (
      <Tooltip
        title={tooltip}
        getPopupContainer={() => this._node}
      >
        {_icon}
      </Tooltip>
    ) : _icon;
  }
}
