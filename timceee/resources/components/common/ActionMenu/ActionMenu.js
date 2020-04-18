import React from 'react';
import PropTypes from 'prop-types';
import {Popover, Menu} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class ActionMenu extends React.PureComponent {
  static propTypes = {
    menu: PropTypes.arrayOf(
      PropTypes.object,
    ),
    title: PropTypes.string,
    valueKey: PropTypes.string,
    defaultIcon: PropTypes.string,
    defaultColor: PropTypes.string,
    defaultBgColor: PropTypes.string,
    showActiveLabel: PropTypes.bool,
    defaultValue: PropTypes.string,
    onClickItem: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.object,
    item: PropTypes.object,
    checkOpen: PropTypes.bool,
  };

  static defaultProps = {
    showActiveLabel: false,
    defaultIcon: 'dots-vertical',
    onClickItem: () => {
    },
    onChange: () => {
      return true;
    },
    checkOpen: true,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      defaultColor: '#333',
      defaultBgColor: '#fff',
      defaultValue: props.defaultValue,
      visible: false,
      spin: false,
    };
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (np.defaultValue !== this.props.defaultValue) {
      this.setState({defaultValue: np.defaultValue});
    }
  }

  _getDefaultColor(value, color, bgColor) {
    const {menu} = this.props;
    let _color = {color: color, bgColor: bgColor};

    menu.map((item) => {
      if (item.color && item.value === value) {
        if (item.color) {
          _color.color = item.color;
        }
        if (item.background) {
          _color.bgColor = item.background;
        }
      }
    });

    return _color;
  }

  _getDefaultIcon(value, icon) {
    const {menu} = this.props;
    let _icon = icon;

    menu.map((item) => {
      if (item.icon && item.value === value) {
        _icon = item.icon;
      }
    });

    return _icon;
  }

  _getDefaultLabel() {
    const {menu, showActiveLabel, defaultValue} = this.props;
    let _label = '';

    if (showActiveLabel) {
      menu.map((item) => {
        if (item.value === defaultValue) {
          _label = item.label;
        }
      });
    }

    return _label;
  }

  _menu() {
    const {menu, valueKey, item} = this.props;
    let _menu = [];
    menu.map((_item) => {
      _menu.push(
        <Menu.Item
          key={_item.value}
          disabled={(_item.disabled)}
          className={item[valueKey] === _item.value ? 'checked' : ''}
        >
          <MaterialIcon
            name={_item.icon}
            size="tiny"
            style={{
              color: _item.color ? _item.color : '#333',
              //   background: _item.background ? _item.background : '#fff',
            }}
          />
          {_item.label}
        </Menu.Item>,
      );
    });
    return _menu;
  }

  _hide() {
    this.setState({
      visible: false,
    });
  }

  _handleVisibleChange(visible) {
    this.setState({visible});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    let {title, defaultIcon, style, onClickItem, item, defaultColor, defaultBgColor, checkOpen} = this.props;
    let {defaultValue, spin} = this.state;
    let color = this._getDefaultColor(this.props.defaultValue, defaultColor, defaultBgColor);

    defaultIcon = this._getDefaultIcon(this.props.defaultValue, defaultIcon);
    return (
      checkOpen ?
        <Popover
          content={
            <Menu
              selectable={false}
              onClick={(menu) => {
                this.setState({defaultValue: menu.key});
                onClickItem(item, menu.key);
                this._hide();
              }}
              defaultSelectedKeys={[defaultValue]}
              className="actionMenu"
            >
              {this._menu()}
            </Menu>
          }
          title={title}
          trigger="click"
          placement="bottom"
          visible={this.state.visible}
          onVisibleChange={this._handleVisibleChange}
          overlayClassName="action-menu"
        >
        <span
          style={{
            cursor: 'pointer',
          }}
        >
          <MaterialIcon
            style={Object.assign({}, style, {
              color: color.color ? color.color : '#333',
              //   background: color.bgColor ? color.bgColor : '#fff',
              margin: '0 5px',
              padding: '1px 6px',
              borderRadius: '50%',
            })}
            name={defaultIcon}
            spin={spin}
            size="tiny"
          />
          {this._getDefaultLabel()}
        </span>
        </Popover> :
        <MaterialIcon
          style={Object.assign({}, style, {
            color: color.color ? color.color : '#333',
            //   background: color.bgColor ? color.bgColor : '#fff',
            margin: '0 5px',
            padding: '1px 6px',
            borderRadius: '50%',
          })}
          name={defaultIcon}
          spin={spin}
          size="tiny"
        />
    );
  }


}
