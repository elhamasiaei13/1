import React from 'react';
import PropTypes from 'prop-types';
import {Avatar as AntdAvatar} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class Avatar extends React.PureComponent {
  static propTypes = {
    shape: PropTypes.oneOf([
      'circle', 'square',
    ]),
    size: PropTypes.oneOf([
      'large', 'small', 'default',
    ]),
    src: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    text: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  /**
   *
   * @return {*}
   * @private
   */
  _renderChild() {
    const {icon, text} = this.props;

    if (icon) {
      if (app._.isString(icon)) {
        return <MaterialIcon name={icon} style={{left: -4, position: 'relative'}}/>;
      }

      return icon;
    }

    if (!text) {
      return <MaterialIcon name="account" style={{left: -4, position: 'relative'}}/>;
    }

    let _child = '';
    let _texts = text.split(' ');

    _texts.map((_text) => _text[0] && (_child = `${_child}‌${_text[0]}`));

    return _child;
  }

  /**
   *
   * @param {String} [string='jgpr']
   * @return {String}
   * @static
   * @private
   */
  static _stringToColor(string = 'jgpr') {
    let _hash = 0;

    for (let _i = 0; _i < string.length; _i++) {
      _hash = string.charCodeAt(_i) + ((_hash << 5) - _hash);
    }

    let _c = (_hash & 0x00FFFFFF).toString(16).toUpperCase();

    return `#${'00000'.substring(0, 6 - _c.length) + _c}`;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {shape, size, src, text, style} = this.props;

    return (
      <AntdAvatar
        className="avatar"
        shape={shape}
        size={size}
        src={src}
        style={src ? style : {...style, backgroundColor: Avatar._stringToColor(text)}}
      >
        {this._renderChild()}
      </AntdAvatar>
    );
  }
}
