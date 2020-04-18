import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import ListContainer from './ListContainer';
import { index, setSearchValue, testConnection, destroy } from '../../Module';

@connect((state) => ({
  devices: state.Attendance.Device.devices,
  pagination: state.Attendance.Device.pagination,
  searchValue: state.Attendance.Device.searchValue,
}), {
  index,
  setSearchValue,
  destroy,
  testConnection,
})
@autobind
/**
 * Devices List Container Wrapper
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func,
    activeItem: PropTypes.number,
    index: PropTypes.func,
    destroy: PropTypes.func,
    testConnection: PropTypes.func,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onClockingTypes: PropTypes.func,
    onView: PropTypes.func,
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
      statuses: {},
    };
  }

  /**
   * indexing devices list
   */
  componentDidMount() {
    const { devices, searchValue } = this.props;

    this._list.resetSearch(searchValue);

    if (devices.length === 0 && searchValue === '') {
      this._onReload(undefined, undefined, true);
    } else {
      this._onReloadStatus(devices, true);

      this.setState({ loading: false });
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.devices, np.devices)) {
      this._onReloadStatus(np.devices);
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
   * reloading all devices data including connection status
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
        sort: [{key: 'name', direction: 'ASC'}],
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

      index(params, (err, res) => {
        if (!err) {
          this._onReloadStatus(res.data.devices, true);
        }

        this.setState({ loading: false });
      });
    });
  }

  /**
   * reloading devices connection status
   * @param {Object[]} devices - devices to reload their connection status
   * @param {Boolean} [force=false] - force reload all or just reload unknown ones
   * @private
   */
  _onReloadStatus(devices, force = false) {
    const { testConnection } = this.props;

    if (force) {
      this.setState({ statuses: {} });

      devices.map((device) => testConnection(device.id, null, (err, res) => !err && this.setState({
        statuses: { ...this.state.statuses, [device.id]: res.status },
      })));
    } else {
      devices.map((device) => {
        if (!this.state.statuses[device.id]) {
          testConnection(device.id, null, (err, res) => !err && this.setState({
            statuses: { ...this.state.statuses, [device.id]: res.status },
          }));
        }
      });
    }
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
      sort: [{key: 'name', direction: 'ASC'}],
      limit: pagination.pageSize,
    }, (err) => {
      if (!err) setSearchValue(value);
      this.setState({ loading: false });
    }));
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onClick(item) {
    const { statuses } = this.state;
    const { onClick } = this.props;

    switch (statuses[item.id]) {
      case 200:
        onClick(item);
        break;
      case 401:
        app.message(app.translate('routes.home.attendance.device.Device is not authenticated'), 'warning');
        break;
      case 500:
        app.message(app.translate('routes.home.attendance.device.Device is not connected'), 'error');
        break;
      default:
        app.message(app.translate('routes.home.attendance.device.Device status is unknown'), 'warning');
        break;
    }
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onView(item) {
    const { statuses } = this.state;
    const { onView } = this.props;

    switch (statuses[item.id]) {
      case 200:
        onView(item);
        break;
      case 401:
        app.message(app.translate('routes.home.attendance.device.Device is not authenticated'), 'warning');
        break;
      case 500:
        app.message(app.translate('routes.home.attendance.device.Device is not connected'), 'error');
        break;
      default:
        app.message(app.translate('routes.home.attendance.device.Device status is unknown'), 'warning');
        break;
    }
  }

  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _onDelete(item) {
    const { destroy } = this.props;

    Modal.confirm({
      title: app.translate('routes.home.attendance.device.Removing Device'),
      content: app.translate('routes.home.attendance.device.Are you sure about removing device', { device: item.name }),
      onOk: () => destroy(item.id),
    });
  }

  /**
   *
   * @param {Object} item
   * @return {XML} - connection status icon
   * @private
   */
  _renderIcon(item) {
    const { statuses } = this.state;

    switch (statuses[item.id]) {
      case 200:
        return <MaterialIcon name="cloud-check" style={{color: '#009688'}}/>;
      case 401:
        return <MaterialIcon name="cloud-outline" style={{color: '#ff9800'}}/>;
      case 500:
        return <MaterialIcon name="cloud-off-outline" style={{color: '#f44336'}}/>;
      default:
        return <MaterialIcon name="cloud-sync" style={{color: '#42A5F5'}}/>;
    }
  }

  /**
   * renders list pagination object
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
   * render devices list
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { devices, activeItem, onAdd, onClockingTypes, onEdit, pagination } = this.props;

    return (
      <ListContainer
        items={devices}
        activeItem={activeItem}
        loading={loading}
        pagination={this._pagination}
        icon={this._renderIcon}
        onSearch={this._onSearch}
        onReload={() => this._onReload(pagination.current, pagination.pageSize, true)}
        onDelete={this._onDelete}
        onClick={this._onClick}
        onAdd={onAdd}
        onView={this._onView}
        onClockingTypes={onClockingTypes}
        onEdit={onEdit}
        reference={(input) => this._list = input}
      />
    );
  }
}
