import React from 'react';
import PropTypes from 'prop-types';
import ClockingTable from './ClockingTable';
import {connect} from 'react-redux';
import {index} from './../Module';

@connect((state) => ({
  clockings: state.Attendance.Clocking.clockings,
}), {
  index,
})
@autobind
/**
 *
 */
export default class ClockingTableWrapper extends React.PureComponent {
  static propTypes = {
    clockings: PropTypes.arrayOf(
      PropTypes.object,
    ),
    reasons: PropTypes.arrayOf(
      PropTypes.object,
    ),
    index: PropTypes.func,
    getReasons: PropTypes.func,
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
    clockings: [],
    reasons: [],
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
    };
  }

  /**
   *
   */
  componentDidMount() {
    app._.isEmpty(this.props.personnel) ?
      this.props.index({
        filterGroups: [
          {
            filters: [
              {
                key: 'user_id',
                value: (this.props.personnel.pluck('userId')),
                operator: 'in',
              },
            ],
          },
        ],
      }) : this.props.index();
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
    const dataSource = this.props.clockings;
    const {
      onAdd, onInfo, onEdit, onDelete,
      onSearch, onSort, onFilter,
      onLimitCount, onChangeTable, onPagination,
      onSelectAllTable, onSelectTable,
      onTableRowClick, menu, handleMenuClick,
      activeItem,
    } = this.props;
    const {loading} = this.state;

    return (
      <ClockingTable
        dataSource={dataSource}
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
