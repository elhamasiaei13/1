import React from 'react';
import PropTypes from 'prop-types';
import {Card, Dropdown, Menu, Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import Toggle from 'components/common/Toggle';
import StatusTable from './StatusTable';
import uuidv1 from 'uuid/v1';

@authorize
@autobind
/**
 *
 */
export default class StatusTableContainer extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(
      PropTypes.object,
    ),
    onInfo: PropTypes.func,
    onAccept: PropTypes.func,
    onSearch: PropTypes.func,
    onSort: PropTypes.func,
    onFilter: PropTypes.func,
    onChangeTable: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onMenuTouch: PropTypes.func,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
    title: PropTypes.string,
    requestTypes: PropTypes.arrayOf(
      PropTypes.object,
    ),
    can: PropTypes.func,
    get: PropTypes.func,
    params: PropTypes.object,
    onLimitCount: PropTypes.func,
    onPagination: PropTypes.func,
    onUnprocessed: PropTypes.func,
    unprocessed: PropTypes.bool,
    meta: PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    onSearch: () => {
    },
    onMenuTouch: () => {
    },
    onAccept: () => {
    },
    onUnprocessed: () => {
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
   * @param {object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const {can, onMenuTouch, unprocessed} = this.props;

    const menuItems = (
      <Menu
        onClick={(key) => {
          this.setState({isContesMenuOpen: false});
          onMenuTouch(item, key);
        }}
      >
        <Menu.Item key="1" disabled={!can('RequestStatus@approve')}>
          <MaterialIcon name="information-outline"/>
          {app.translate('routes.home.requests.status.Check')}
        </Menu.Item>
        <Menu.Item key="2" disabled={!can('RequestStatus@approve') || unprocessed}>
          <MaterialIcon name="check-all"/>
          {app.translate('routes.home.requests.status.Accept')}
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
   * @param {Array} selectedRows
   * @return {Array}
   * @private
   */
  _extraButton(selectedRows = []) {
    const {can, onUnprocessed} = this.props;
    return (<Toggle
      label={app.translate('routes.home.requests.status.status')}
      onChange={(v) => onUnprocessed(v)}
      style={{
        width: '150px',
      }}
    />);
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {
      dataSource, loading, title, onInfo,
      requestTypes, get, params,
      onChangeTable, meta, onLimitCount, onPagination,
      onSelectAllTable, onSelectTable,
    } = this.props;

    return (
      <Card
        title={`${app.translate('routes.home.requests.Requests')}: ${title}`}
        style={{
          overflowY: 'auto',
          height: '100%',
        }}
        extra={this._extraButton()}
      >
        <StatusTable
          loading={loading}
          dataSource={dataSource}
          requestTypes={requestTypes}
          menu={this._menu}
          onTableRowClick={this._onRowClick}
          activeItem={this.state.activeItem}
          // onInfo={onInfo}
          onChangeTable={onChangeTable}
          onSelectAllTable={onSelectAllTable}
          onSelectTable={onSelectTable}
          // extraButton={this._extraButton}
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
