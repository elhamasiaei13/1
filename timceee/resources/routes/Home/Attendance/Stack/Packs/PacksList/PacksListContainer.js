import React from 'react';
import {Menu, Button} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import PacksList from './PacksList';

@authorize
@autobind
/**
 *
 */
export default class PacksListContainer extends React.PureComponent {
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
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {can, onEdit, onDelete} = this.props;

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
        <Menu.Item key="edit" disabled={!can('StackPack@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('StackPack@destroy')}>
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
    const {can, onReload, onAdd, loading} = this.props;

    return (
      <Button.Group>
        <Button
          type="dashed"
          onClick={onReload}
          disabled={!can('StackPack@index') || loading}
        >
          <MaterialIcon name="reload" size="tiny" spin={loading}/>
        </Button>
        <Button
          type="primary"
          icon="plus"
          onClick={onAdd}
          disabled={!can('StackPack@store')}
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
      <PacksList
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
