import React from 'react';
import Icon from 'components/common/MaterialIcon';
import Avatar from 'components/common/Avatar';
import PropTypes from 'prop-types';
import 'assets/styles/chip.styl';

@autobind
/**
 *
 */
export default class Chip extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    onClick: () => {
    },
  };

  /**
   *
   * @return {Number}
   * @private
   */
  get _avatarIndex() {
    const {children} = this.props;

    if (app._.isArray(children)) {
      return children.findIndex((child) => {
        return child.type === Avatar;
      });
    }

    return -1;
  }

  /**
   *
   * @return {Number}
   * @private
   */
  get _iconIndex() {
    const {children} = this.props;

    if (app._.isArray(children)) {
      return children.findIndex((child) => {
        return child.type === Icon;
      });
    }

    return -1;
  }

  /**
   *
   * @param {Number} [avatar=-1]
   * @param {Number} [icon=-1]
   * @return {Element}
   * @private
   */
  _content(avatar = -1, icon = -1) {
    const {children} = this.props;
    let _children = app._.clone(children);

    if (app._.isArray(_children)) {
      if (icon > avatar) {
        if (icon > -1) {
          _children.splice(icon, 1);
        }
        if (avatar > -1) {
          _children.splice(avatar, 1);
        }
      } else {
        if (avatar > -1) {
          _children.splice(avatar, 1);
        }
        if (icon > -1) {
          _children.splice(icon, 1);
        }
      }
    }

    return _children;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {className, children, onClick, ...rest} = this.props;

    let _avatar = this._avatarIndex;
    let _icon = this._iconIndex;

    return (
      <div
        className={`chip ${className}`}
        onClick={onClick}
        {...rest}
      >

        {children[_avatar]}

        <span className="content">{this._content(_avatar, _icon)}</span>

        {children[_icon]}

      </div>
    );
  }
}
