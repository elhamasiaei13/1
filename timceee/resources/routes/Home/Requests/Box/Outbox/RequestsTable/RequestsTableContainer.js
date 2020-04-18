import React from 'react';
import PropTypes from 'prop-types';
import {Card, Dropdown, Menu, Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import RequestsTable from './RequestsTable';

@autobind
/**
 *
 */
export default class RequestsTableContainer extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(
      PropTypes.object,
    ),
    onAdd: PropTypes.func,
    onInfo: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onChangeTable: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onMenuTouch: PropTypes.func,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
    requestTypes: PropTypes.arrayOf(
      PropTypes.object,
    ),
    get: PropTypes.func,
    params: PropTypes.object,
    onLimitCount: PropTypes.func,
    onPagination: PropTypes.func,
    meta: PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    onMenuTouch: () => {
    },
    columns: [],
    dataSource: [],
    meta: {},
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,

      isContesMenuOpen: false,
      activeItem: 0,
      searchValue: '',
    };
  }

  /**
   *
   * @param {element} e
   */
  handleMenuClick(e) {
  }

  /**
   *
   * @param {object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {onMenuTouch} = this.props;
    const menuItems = (<Menu
      onClick={(key) => {
        this.setState({isContesMenuOpen: false});
        onMenuTouch(item, key);
      }}
    >
      <Menu.Item key="1">
        <MaterialIcon name="information-outline" disabled={!app.authorize.can('Request@index')}/>
        {app.translate('main.Info')}
      </Menu.Item>
      <Menu.Item key="4" disabled={!app.authorize.can('Request@store') || !app.authorize.can('Request@update')}>
        <MaterialIcon name="redo-variant"/>
        {app.translate('routes.home.requests.ReAdd')}
      </Menu.Item>
      <Menu.Item key="2" disabled={!item[0].active || item[0].status === 'accepted' || !app.authorize.can('Request@update')}>
        <MaterialIcon name="pencil"/>
        {app.translate('main.Edit')}
      </Menu.Item>
      <Menu.Item key="3" disabled={!item[0].active || item[0].status === 'accepted' || !app.authorize.can('Request@destroy')}>
        <MaterialIcon name="delete-empty"/>
        {app.translate('main.Delete')}
      </Menu.Item>
    </Menu> );
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
      </Dropdown>);
  }

  /**
   *
   * @param {object} record
   * @private
   */
  _onRowClick(record) {
    const {isContesMenuOpen} = this.state;
    if (!isContesMenuOpen) {
      this.setState({activeItem: record.id});
    }
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {
      dataSource, loading, onCancel, get, params,
      onAdd, onInfo, onEdit, onDelete, requestTypes, onChangeTable,
      onSelectAllTable, onSelectTable, meta, onLimitCount, onPagination,
    } = this.props;

    return (
      <Card
        title={`${app.translate('routes.home.requests.Posted Requests')}`}
        style={{
          overflowY: 'auto',
          height: '100%',
        }}
      >
        <RequestsTable
          loading={loading}
          dataSource={dataSource}
          requestTypes={requestTypes}
          menu={this._menu}
          onMenuTouch={this.handleMenuClick}
          onTableRowClick={this._onRowClick}
          activeItem={this.state.activeItem}
          onAdd={onAdd}
          onDelete={onDelete}
          onEdit={onEdit}
          onInfo={onInfo}
          onChangeTable={onChangeTable}
          onSelectAllTable={onSelectAllTable}
          onSelectTable={onSelectTable}
          get={get}
          params={params}
          meta={meta}
          onLimitCount={onLimitCount}
          onPagination={onPagination}
        />
      </Card>
    );
  }
}
