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
    onPagination: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onMenuTouch: PropTypes.func,
    onCancel: PropTypes.func,
    get: PropTypes.func,
    loading: PropTypes.bool,
    onRowDoubleClick: PropTypes.func,
    requestTypes: PropTypes.arrayOf(
      PropTypes.object,
    ),
    params: PropTypes.object,
    onLimitCount: PropTypes.func,
    meta: PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    onMenuTouch: () => {
    },
    columns: [],
    dataSource: [],
    meta: {},
    params: {},
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
      dataSource, loading, onCancel,
      onAdd, onInfo, onEdit, onDelete,requestTypes,
      onChangeTable, params, meta, onLimitCount, onPagination,
      onSelectAllTable, onSelectTable, onRowDoubleClick,
    } = this.props;

    return (
      <Card
        title={`${app.translate('routes.home.requests.History Requests')}`}
        style={{
          overflowY: 'auto',
          height: '100%',
        }}
      >
        <RequestsTable
          loading={loading}
          dataSource={dataSource}
          requestTypes={requestTypes}
          onMenuTouch={this.handleMenuClick}
          onTableRowClick={this._onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          activeItem={this.state.activeItem}
          onChangeTable={onChangeTable}
          onSelectAllTable={onSelectAllTable}
          onSelectTable={onSelectTable}

          params={params}
          get={this.props.get}
          meta={meta}
          onLimitCount={onLimitCount}
          onPagination={onPagination}
        />
      </Card>
    );
  }
}
