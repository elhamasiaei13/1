import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import PropTypes from 'prop-types';
import List from './List';
import {Menu, Button} from 'antd';

@authorize
@autobind
/**
 *
 */
export default class ListContainer extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onCopy: PropTypes.func,
    onDelete: PropTypes.func,
    can: PropTypes.func,
  };

  static defaultProps = {
    loading: true,
  };

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _renderMenu(item) {
    const {can, onEdit, onCopy, onDelete} = this.props;

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'copy':
              onCopy(item);
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
        <Menu.Item key="copy" disabled={!can('Shift@store')}>
          <MaterialIcon name="content-copy"/>
          {app.translate('main.Copy')}
        </Menu.Item>
        <Menu.Item key="edit" disabled={!can('Shift@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('Shift@destroy')}>
          <MaterialIcon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  _renderExtra() {
    const {can, onReload, onAdd, loading} = this.props;

    return (
      <Button.Group>
        <Button
          type="dashed"
          onClick={onReload}
          disabled={!can('Shift@index') || loading}
        >
          <MaterialIcon name="reload" spin={loading}/>
        </Button>
        <Button
          type="primary"
          icon="plus"
          disabled={!can('Shift@store')}
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
    const {...rest} = this.props;

    let _props = app._.omit(rest, ['menu', 'extra', 'onEdit', 'onDelete', 'onReload', 'onAdd']);

    return (
      <List
        menu={this._renderMenu}
        extra={this._renderExtra()}
        {..._props}
      />
    );
  }
}
