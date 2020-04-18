import React from 'react';
import {Menu, Button} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import List from './List';

@authorize
@autobind
/**
 *
 */
export default class ListContainer extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.object,
    ),
    menuItemTouch: PropTypes.func,
    onItemClick: PropTypes.func,
    onAdd: PropTypes.func,
    onInfo: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    statusAdd: PropTypes.bool,
    loading: PropTypes.bool,
    activeItem: PropTypes.number,
    can: PropTypes.func,
    onSearch: PropTypes.func,
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    onReload: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    statusAdd: false,
    items: [],
    activeItem: null,
    loading: false,
  };

  /**
   *
   * @return {XML}
   * @private
   */
  _button() {
    const {onReload, can, statusAdd, onAdd, loading} = this.props;

    return (
      <Button.Group>
        <Button
          type="dashed"
          onClick={onReload}
          disabled={loading}
        >
          <MaterialIcon name="reload" spin={loading}/>
        </Button>
        <Button
          type="primary"
          icon="plus"
          disabled={!can('Role@store') || statusAdd}
          onClick={onAdd}
        >
          {app.translate('main.Add')}
        </Button>
      </Button.Group>
    );
  }

  /**
   *
   * @param {object} listItem
   * @param {object} menuItem
   */
  handleMenuTouch(listItem, menuItem) {
    switch (menuItem.key) {
      case '1':
        this.props.onInfo(listItem);
        break;
      case '2':
        this.props.onEdit(listItem, true);
        break;
      case '3':
        this.props.onDelete(listItem);
        break;
    }
  }

  /**
   *
   * @param {object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {can} = this.props;

    return (
      <Menu
        onClick={(key) => {
          this.handleMenuTouch(item, key);
        }}
      >
        <Menu.Item key="1" disabled={!can('Role@index')}>
          <MaterialIcon name="information-outline"/>
          {app.translate('main.Info')}
        </Menu.Item>
        <Menu.Item key="2" disabled={!can('Role@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="3" disabled={!can('Role@destroy')}>
          <MaterialIcon name="delete-empty"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {can, activeItem, title, items, onItemClick,onSearch, pagination, loading} = this.props;

    return (
      <List
        activeItem={activeItem}
        title={title}
        extra={this._button()}
        menu={this._menu}
        items={items}
        onItemClick={(item) => can('Role@index') && onItemClick(item)}
        loading={loading}
        onSearch={onSearch}
        pagination={pagination}
      />
    );
  }
}
