import React from 'react';
import {Menu, Button} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import List from './List';

@autobind
/**
 *
 */
export default class ListContainer extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onSearch: PropTypes.func,
    onClick: PropTypes.func,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
  };

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {onEdit, onDelete} = this.props;

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'edit':
              onEdit(item);
              break;
            case 'delete':
            default:
              onDelete(item);
          }
        }}
      >
        <Menu.Item key="edit">
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete">
          <MaterialIcon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @function _renderExtra
   * @return {XML}
   * @private
   */
  _extra() {
    const {onReload, onAdd, loading} = this.props;

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
          onClick={onAdd}
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
    const {items, activeItem, onSearch, onClick, loading, pagination, ...rest} = this.props;

    return (
      <List
        menu={this._menu}
        extra={this._extra()}
        items={items}
        activeItem={activeItem}
        onSearch={onSearch}
        onClick={onClick}
        loading={loading}
        pagination={pagination}
        {...rest}
      />
    );
  }
}
