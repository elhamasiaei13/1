import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from './List';
import { index, setSearchValue } from '../../Module';

@connect((state) => ({
  devices: state.Attendance.Device.devices,
  pagination: state.Attendance.Device.pagination,
  searchValue: state.Attendance.Device.searchValue,
}), {
  index,
  setSearchValue,
})
@autobind
/**
 * Devices List Wrapper
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func,
    index: PropTypes.func,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    menu: PropTypes.func,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    onClick: () => {},
    onAdd: () => {},
    onView: () => {},
    onEdit: () => {},
    onDelete: () => {},
  };

  /**
   *
   * @function constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: props.devices.length === 0,
    };
  }

  /**
   * indexing devices list
   * @function componentDidMount
   */
  componentDidMount() {
    const { devices, searchValue } = this.props;

    this._list.resetSearch(searchValue);

    if (devices.length === 0 && searchValue === '') {
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
   * @param  {Number} [page=1]
   * @param  {Number} [limit=app.config.pagination.limit]
   * @param  {boolean} [force=false]
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
            {
              key: 'address',
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
          {
            key: 'address',
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
   * @function _renderPagination
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
   * render devices list
   * @function render
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { devices, onClick, menu, extra } = this.props;

    return (
      <List
        items={devices}
        loading={loading}
        pagination={this._pagination}
        onSearch={this._onSearch}
        onClick={onClick}
        menu={menu}
        extra={extra}
      />
    );
  }
}
