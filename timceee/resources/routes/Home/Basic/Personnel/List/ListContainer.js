import React from 'react';
import List from './List.old';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import { Menu, Button, Tooltip } from 'antd';
import { connect } from 'react-redux';

@authorize
@connect((state) => ({
  currentUser: state.Auth.currentUser,
}))
@autobind
/**
 * Creates personnel list and adds menu & other props except personnel to it
 */
export default class ListContainer extends React.PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
    items: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    onSearch: PropTypes.func,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onReload: PropTypes.func,
    can: PropTypes.func,
  };

  static defaultProps = {
    onSearch: () => {},
    onClick: () => {},
    onAdd: () => {},
    onView: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onReload: () => {},
    items: [],
    loading: true,
  };

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const { currentUser, can, onView, onEdit, onDelete } = this.props;

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'view':
              onView(item);
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
        <Menu.Item key="view" disabled={!can('User@index')}>
          <MaterialIcon name="eye"/>
          {app.translate('main.View')}
        </Menu.Item>
        {/* <Menu.Item key="edit" disabled={!can('User@update')}>*/}
        {/* <MaterialIcon name="pencil"/>*/}
        {/* {app.translate('main.Edit')}*/}
        {/* </Menu.Item>*/}
        <Menu.Item key="delete" disabled={item.id === currentUser.id || !can('User@destroy')}>
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
            disabled={!can('User@index') || loading}
          >
            <MaterialIcon name="reload" spin={loading}/>
          </Button>
        </Tooltip>
        {/* <Tooltip title={app.translate('main.Trash')} placement="bottom">*/}
          {/* <Button*/}
            {/* disabled={!can('User@index') || loading}*/}
          {/* >*/}
            {/* <MaterialIcon name="delete"/>*/}
          {/* </Button>*/}
        {/* </Tooltip>*/}
        <Button
          type="primary"
          icon="plus"
          onClick={onAdd}
          disabled={!can('User@store')}
        >
          {app.translate('main.Add')}
        </Button>
      </Button.Group>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { can, items, loading, onSearch, onClick, ...rest } = this.props;

    return (
      <List
        {...rest}
        items={items}
        loading={loading}
        onSearch={onSearch}
        onClick={(item) => can('User@index') && onClick(item)}
        menu={this._menu}
        extra={this._extra}
      />
    );
  }
}
