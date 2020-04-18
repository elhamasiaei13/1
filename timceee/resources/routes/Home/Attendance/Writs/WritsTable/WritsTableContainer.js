import React from 'react';
import PropTypes from 'prop-types';
import {Card, Dropdown, Menu, Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import WritsTable from './WritsTable';

@authorize
@autobind
/**
 *
 */
export default class WritsTableContainer extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(
      PropTypes.object,
    ),
    onAdd: PropTypes.func,
    onInfo: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onChangeTable: PropTypes.func,
    onPagination: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onMenuTouch: PropTypes.func,
    onCancel: PropTypes.func,
    onClickAccepted: PropTypes.func,
    loading: PropTypes.bool,
    title: PropTypes.string,
    can: PropTypes.func,
    reasons: PropTypes.arrayOf(
      PropTypes.object,
    ),
    get: PropTypes.func,
    params: PropTypes.object,
    onLimitCount: PropTypes.func,
    meta: PropTypes.object,
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
        <Menu.Item key="1" disabled={!can('Writ@index') || !!item[0].deletedAt}>
          <MaterialIcon name="information-outline"/>
          {app.translate('main.Info')}
        </Menu.Item>
        <Menu.Item key="2" disabled={!can('Writ@update') || !!item[0].deletedAt}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="3" disabled={!can('Writ@destroy') || !!item[0].deletedAt}>
          <MaterialIcon name="delete-empty"/>
          {app.translate('main.Delete')}
        </Menu.Item>
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
      dataSource, loading, onCancel, get, params,
      onAdd, onInfo, onEdit, onDelete, title,
      onClickAccepted,onChangeTable, meta, onLimitCount, onPagination,
      onSelectAllTable, onSelectTable, reasons,
    } = this.props;

    return (
      <Card
        title={`${app.translate('routes.home.attendance.writs.Writs')} : ${title}`}
        extra={onCancel &&
        <Button
          onClick={onCancel}
        >
          {app.translate('main.Cancel')}
        </Button>
        }
        style={{
          overflowY: 'auto',
          height: '100%',
        }}
      >
        <WritsTable
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
          reasons={reasons}
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
