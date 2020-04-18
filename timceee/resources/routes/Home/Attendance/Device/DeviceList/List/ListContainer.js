import React from 'react';
import { Menu, Button, Tooltip } from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import PropTypes from 'prop-types';
import List from './List';

@authorize
@autobind
/**
 * Devices List Container
 */
export default class ListContainer extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onSearch: PropTypes.func,
    reference: PropTypes.func,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onView: PropTypes.func,
    onClockingTypes: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    icon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
    can: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    onSearch: () => {},
    loading: true,
    pagination: {},
  };

  /**
   * renders menu for every list item
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _renderMenu(item) {
    const { can, onView, onClockingTypes, onEdit, onDelete } = this.props;

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'view':
              onView(item);
              break;
            case 'clockingTypes':
              onClockingTypes(item);
              break;
            case 'edit':
              onEdit(item);
              break;
            case 'delete':
            default:
              onDelete(item);
          }
        }}
      >
        <Menu.Item key="view" disabled={!can('Device@index')}>
          <MaterialIcon name="eye"/>
          {app.translate('main.View')}
        </Menu.Item>
        <Menu.Item key="clockingTypes" disabled={!can('ClockingReason@index')}>
          <MaterialIcon name="swap-vertical"/>
          {app.translate('routes.home.attendance.clocking.Types')}
        </Menu.Item>
        <Menu.Item key="edit" disabled={!can('Device@update')}>
          <MaterialIcon name="settings"/>
          {app.translate('main.Settings')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('Device@destroy')}>
          <MaterialIcon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   * renders extra for list
   * @function _renderExtra
   * @return {XML}
   * @private
   */
  get _extra() {
    const { can, onReload, onAdd, loading } = this.props;

    return (
      <Button.Group>
        <Tooltip title={app.translate('main.Reload')} placement="bottom">
          <Button
            type="dashed"
            onClick={onReload}
            disabled={!can('Device@index') || loading}
          >
            <MaterialIcon name="reload" spin={loading}/>
          </Button>
        </Tooltip>
        <Button
          type="primary"
          icon="plus"
          onClick={onAdd}
          disabled={!can('Device@store')}
        >
          {app.translate('main.Add')}
        </Button>
      </Button.Group>
    );
  }

  /**
   * render devices list
   * @function render
   * @return {XML}
   */
  render() {
    const { can, items, activeItem, onSearch, onClick, loading, pagination, icon, reference } = this.props;

    return (
      <List
        menu={this._renderMenu}
        extra={this._extra}
        items={items}
        activeItem={activeItem}
        loading={loading}
        onSearch={onSearch}
        onClick={(item) => can('Device@index') && onClick(item)}
        pagination={pagination}
        icon={icon}
        reference={reference}
      />
    );
  }
}
