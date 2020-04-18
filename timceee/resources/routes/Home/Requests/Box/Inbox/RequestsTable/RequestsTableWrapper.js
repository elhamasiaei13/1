import React from 'react';
import PropTypes from 'prop-types';
import RequestsTable from './RequestsTable';
import {connect} from 'react-redux';
import {getRequests} from './../Module';
import {Types} from 'routes/General/Types';

@connect((state) => ({
  requests: state.Requests.Box.Inbox.requests,
}), {
  getRequests,
})
@autobind
/**
 *
 */
export default class RequestsTableWrapper extends React.PureComponent {
  static propTypes = {
    requests: PropTypes.object,
    getRequests: PropTypes.func,
    onAdd: PropTypes.func,
    onInfo: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSearch: PropTypes.func,
    onLimitCount: PropTypes.func,
    onSort: PropTypes.func,
    onFilter: PropTypes.func,
    onChangeTable: PropTypes.func,
    onPagination: PropTypes.func,
    onSelectAllTable: PropTypes.func,
    onSelectTable: PropTypes.func,
    onTableRowClick: PropTypes.func,
    handleMenuClick: PropTypes.func,
    menu: PropTypes.func,
    activeItem: PropTypes.number,
    personnel: PropTypes.arrayOf(
      PropTypes.object,
    ),
  };

  static defaultProps = {
    requests: {},
    requestTypes: [],
    columns: [],
    dataSource: [],
    personnel: [],
    meta: {},
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      requestTypes: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.props.getRequests({});
    this.setState({requestTypes: Types.items('Request')});
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    this.setState({
      loading: false,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const dataSource = this.props.requests;
    const {
      onAdd, onInfo, onEdit, onDelete,
      onSearch, onSort, onFilter,
      onLimitCount, onChangeTable, onPagination,
      onSelectAllTable, onSelectTable,
      onTableRowClick, menu, handleMenuClick,
      activeItem,
    } = this.props;
    const {requestTypes, loading} = this.state;

    return (
      <RequestsTable
        dataSource={dataSource}
        requestTypes={requestTypes}
        menu={menu}
        loading={loading}
        onMenuTouch={handleMenuClick}
        onTableRowClick={onTableRowClick}
        activeItem={activeItem}
        onSort={onSort}
        onFilter={onFilter}
        onAdd={onAdd}
        onDelete={onDelete}
        onEdit={onEdit}
        onInfo={onInfo}
        onSearch={onSearch}
        onLimitCount={onLimitCount}
        onPagination={onPagination}
        onChangeTable={onChangeTable}
        onSelectAllTable={onSelectAllTable}
        onSelectTable={onSelectTable}
      />
    );
  }
}
