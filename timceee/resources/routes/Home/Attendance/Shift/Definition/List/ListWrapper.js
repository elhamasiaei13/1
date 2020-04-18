import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import { connect } from 'react-redux';
import { index, setSearchValue } from './../Module';

@connect((state) => ({
  shifts: state.Attendance.Shift.Definition.shifts,
  pagination: state.Attendance.Shift.Definition.pagination,
  searchValue: state.Attendance.Shift.Definition.searchValue,
}), {
  index,
  setSearchValue,
})
@autobind
/**
 *
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    shifts: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    searchValue: PropTypes.string,
    index: PropTypes.func,
    setSearchValue: PropTypes.func,
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

    this._list.resetSearch(searchValue);

    if (shifts.length === 0 && searchValue === '') {
      this._index(undefined, undefined, true);
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
   * @param  {Number} [page=0]
   * @param  {Number} [limit=app.config.pagination.limit]
   * @param {Boolean} [force=false]
   * @private
   */
  _index(page = 1, limit = app.config.pagination.limit, force = false) {
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
    const { index, pagination } = this.props;

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
   * renders pagination object
   * @return {Object}
   * @private
   */
  get _pagination() {
    const { pagination } = this.props;

    return {
      ...pagination,
      onChange: (page, limit) => this._index(page, limit),
      onShowSizeChange: (page, limit) => this._index(page, limit),
    };
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { shifts, ...rest } = this.props;
    return (
      <List
        {...rest}
        reference={(input) => this._list = input}
        items={shifts}
        loading={loading}
        pagination={this._pagination}
        onSearch={this._onSearch}
      />
    );
  }
}
