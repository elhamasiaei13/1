import React from 'react';
import PropTypes from 'prop-types';
import {Card, Dropdown, Menu, Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import ClockingTable from './ClockingTable';

@authorize
@autobind
/**
 *
 */
export default class ClockingTableContainer extends React.PureComponent {
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
    onClickAccepted: PropTypes.func,
    onDevice: PropTypes.func,
    loading: PropTypes.bool,
    title: PropTypes.string,
    onSearch: PropTypes.func,
    approveAll: PropTypes.func,
    can: PropTypes.func,
    reasons: PropTypes.arrayOf(
      PropTypes.object,
    ),
    get: PropTypes.func,
    params: PropTypes.object,
    personnel: PropTypes.array,
    meta: PropTypes.object,
    onLimitCount: PropTypes.func,
    onPagination: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    onMenuTouch: () => {
    },
    onClickAccepted: () => {
    },
    onDevice: () => {
    },
    columns: [],
    dataSource: [],
    meta: {},
    title: '',
    reasons: [],
    personnel: [],
  };

  /**
   *
   * @param {Object} props
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
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {can, onMenuTouch} = this.props;
    const menuItems = (
      <Menu
        onClick={(key) => {
          this.setState({isContesMenuOpen: false});
          onMenuTouch(item, key);
        }}
      >
        <Menu.Item key="1"
                   disabled={
                     !(app.authorize.can('Clocking@forPerson') || app.authorize.can('Clocking@all') || app.authorize.can('Clocking@sub') || app.authorize.can('Clocking@selft')) || !!item[0].deletedAt || item[0].datetime === '0000-00-00 00:00:00'}>
          <MaterialIcon name="information-outline"/>
          {app.translate('main.Info')}
        </Menu.Item>
        <Menu.Item key="2" disabled={!can('Clocking@update') || !!item[0].deletedAt || item[0].datetime === '0000-00-00 00:00:00'}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="3" disabled={!can('Clocking@destroy') || !!item[0].deletedAt}>
          <MaterialIcon name="delete-empty"/>
          {app.translate('main.Delete')}
        </Menu.Item>
        {(item[0].deletedAt) && [
          <Menu.Divider key="0"/>,
          <Menu.Item key="4" disabled={!can('Clocking@restore')}>
            <MaterialIcon name="restore"/>
            {app.translate('routes.home.attendance.clocking.Restore')}
          </Menu.Item>,
        ]}
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
   * @param {Object} record
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
      dataSource, loading, onCancel, onDevice, onPagination,
      onAdd, onInfo, onEdit, onDelete, title, onLimitCount,
      onClickAccepted, get, params, approveAll,
      onChangeTable, personnel, onSearch, meta,
      onSelectAllTable, onSelectTable, reasons,
    } = this.props;

    return (
      <Card
        title={personnel.length > 0 ? `${app.translate('routes.home.attendance.clocking.Clocking')} : ${title}` : `${app.translate('routes.All Clocking')}`}
        extra={onCancel &&
        <Button
          onClick={onCancel}
        >
          {app.translate('main.Back')}
        </Button>
        }
        style={{
          overflowY: 'auto',
          height: '100%',
        }}
        className="paddingCard-0-16"
      >
        <ClockingTable
          loading={loading}
          dataSource={dataSource}
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
          onClickAccepted={onClickAccepted}
          onClickDevice={onDevice}
          reasons={reasons}
          personnel={personnel}
          get={get}
          params={params}
          onSearch={onSearch}
          approveAll={approveAll}
          meta={meta}
          onLimitCount={onLimitCount}
          onPagination={onPagination}
        />
      </Card>
    );
  }
}
