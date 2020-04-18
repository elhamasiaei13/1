import React from 'react';
import {Menu, Button, Card, Dropdown} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import StacksLogsList from './StacksLogsList';

@authorize
@autobind
/**
 *
 */
export default class StacksLogsListContainer extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.number,
    onSearch: PropTypes.func,
    onClick: PropTypes.func,
    onReload: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onInfo: PropTypes.func,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    title: PropTypes.string,
    can: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      isContesMenuOpen: false,
    };
  }

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {can, onEdit, onInfo} = this.props;

    const menuItems = (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'info':
              onInfo(item);
              break;
            case 'edit':
            default:
              onEdit(item);
          }
        }}
      >
        <Menu.Item key="info" disabled={!can('StackLog@index')}>
          <MaterialIcon name="information"/>
          {app.translate('main.Info')}
        </Menu.Item>
        {
          !item[0].stackLogId &&
          <Menu.Item key="edit" disabled={!can('StackLog@update')}>
            <MaterialIcon name="pencil"/>
            {app.translate('main.Edit')}
          </Menu.Item>
        }
      </Menu>
    );

    return (
      <Dropdown
        overlay={menuItems}
        trigger={['click']}
        onVisibleChange={(isContesMenuOpen) => {
          this.setState({isContesMenuOpen});
        }}
      >
        <a className="ant-dropdown-link">
          <MaterialIcon
            name="dots-vertical"
            style={{
              width: 24,
              height: 24,
              fontSize: 24,
            }}
          />
        </a>
      </Dropdown>
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
          disabled={!can('StackLog@index') || loading}
        >
          <MaterialIcon name="reload" size="tiny" spin={loading}/>
        </Button>
        <Button
          type="primary"
          icon="plus"
          onClick={onAdd}
          disabled={!can('StackLog@store')}
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
    const {items, activeItem, onSearch, onClick, loading, pagination, onCancel, title, ...rest} = this.props;

    return (
      <Card
        title={title}
        extra={this._extra()}
        style={{
          height: '100%',
        }}
      >
        <StacksLogsList
          menu={this._menu}
          items={items}
          activeItem={activeItem}
          onSearch={onSearch}
          onClick={onClick}
          loading={loading}
          pagination={pagination}
          {...rest}
        />
      </Card>
    );
  }
}
