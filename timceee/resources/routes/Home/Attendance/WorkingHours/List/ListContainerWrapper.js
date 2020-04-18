import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import ListContainer from './ListContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { index, destroy, setSearchValue } from './../Module';

@connect((state) => ({
  workingHours: state.Attendance.WorkingHours.workingHours,
  pagination: state.Attendance.WorkingHours.workingHoursPagination,
  searchValue: state.Attendance.WorkingHours.workingHoursSearchValue,
}), {
  index,
  destroy,
  setSearchValue,
})
@autobind
/**
 *
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    workingHours: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func,
    index: PropTypes.func,
    destroy: PropTypes.func,
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
    const { workingHours, searchValue } = this.props;

    this._list.resetSearch(this.props.searchValue);

    if (workingHours.length === 0 && searchValue === '') {
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
      title: app.translate('routes.home.attendance.working-hours.Removing Working Hour'),
      content: app.translate('routes.home.attendance.working-hours.Are you sure about removing working hour', { workingHour: item.name }),
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
    const { workingHours, pagination, ...rest } = this.props;

    return (
      <ListContainer
        { ...rest }
        reference={(input) => this._list = input}
        items={workingHours}
        loading={loading}
        onReload={() => this._onReload(pagination.current, pagination.pageSize, true)}
        onSearch={this._onSearch}
        pagination={this._pagination}
        onDelete={this._onDelete}
        icon={(item) => <MaterialIcon name="format-color-fill" style={{color: item.color}}/>
    }
    />
  );
}
}
