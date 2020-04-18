import React from 'react';
import ListContainer from './ListContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { index, destroy, setSearchValue } from './../Module';

@connect((state) => ({
  shifts: state.Attendance.Shift.Definition.shifts,
  pagination: state.Attendance.Shift.Definition.pagination,
  searchValue: state.Attendance.Shift.Definition.searchValue,
}), {
  index,
  setSearchValue,
  destroy,
})
@autobind
/**
 *
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    shifts: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    searchValue: PropTypes.string,
    activeItem: PropTypes.number,
    index: PropTypes.func,
    setSearchValue: PropTypes.func,
    destroy: PropTypes.func,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
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
    const { shifts, searchValue } = this.props;

    this._list.resetSearch(this.props.searchValue);

    if (shifts.length === 0 && searchValue === '') {
      this._onReload(undefined, undefined, true);
    } else {
      this.setState({ loading: false });
    }
  }

  /**
   *
   */
  _resetSearch() {
    this._list.resetSearch();
    this.props.setSearchValue();
  }

  /**
   *
   * @param {Number} [page=1]
   * @param {Number} [limit=app.config.pagination.limit]
   * @param {Boolean} [force=false]
   * @private
   */
  _onReload(page = 1, limit = app.config.pagination.limit, force = false) {
    const { index, searchValue } = this.props;

    this.setState({ loading: true }, () => {
      let params = {
        page: page - 1,
        limit,
      };

      if (force) {
        if (!app._.isEmpty(searchValue)) params.page = 0;
        this._resetSearch();
      } else if (!app._.isEmpty(searchValue)) {
        params.filterGroups = [{
          or: true,
          filters: [{
              key: 'name',
              value: searchValue,
              operator: 'ct',
            },
            {
              key: 'description',
              value: searchValue,
              operator: 'ct',
            },
          ],
        }];
      }

      index(params, () => this.setState({ loading: false }));
    });
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const { index, pagination, setSearchValue } = this.props;

    this.setState({ loading: true }, () => index({
      filterGroups: [{
        or: true,
        filters: [{
            key: 'name',
            value,
            operator: 'ct',
          },
          {
            key: 'description',
            value,
            operator: 'ct',
          },
        ],
      }],
      limit: pagination.pageSize,
    }, (err) => {
      if (!err) setSearchValue(value);
      this.setState({ loading: false });
    }));
  }

  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _onDelete(item) {
    const { destroy } = this.props;

    Modal.confirm({
      title: app.translate('routes.home.attendance.shift.Removing Shift'),
      content: app.translate('routes.home.attendance.shift.Are you sure about removing shift', { shift: item.name }),
      onOk: () => destroy(item.id),
    });
  }

  /**
   *
   * @return {Object}
   * @private
   */
  get _pagination() {
    const { pagination } = this.props;

    return {
      ...pagination,
      onChange: (page, limit) => this._onReload(page, limit),
      onShowSizeChange: (page, limit) => this._onReload(page, limit),
    };
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { shifts, pagination, ...rest } = this.props;

    return (
      <ListContainer
        {...rest}
        reference={(input) => this._list = input}
        items={shifts}
        loading={loading}
        pagination={this._pagination}
        icon={this._renderIcon}
        onSearch={this._onSearch}
        onReload={() => this._onReload(pagination.current, pagination.pageSize, true)}
        onDelete={this._onDelete}
      />
    );
  }
}
