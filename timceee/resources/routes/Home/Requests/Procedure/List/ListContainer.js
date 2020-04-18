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
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: true,
  };

  /**
   * renders menu for every list item
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _renderMenu(item) {
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
        <Menu.Item key="delete" disabled={!!item.final}>
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
  _renderExtra() {
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
    const {...rest} = this.props;

    return (
      <List
        menu={this._renderMenu}
        extra={this._renderExtra()}
        style={{height: '100%'}}
        {...rest}
      />
    );
  }
}
