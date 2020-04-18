import React from 'react';
import { Menu, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListView from 'components/common/ListView';
import MaterialIcon from 'components/common/MaterialIcon';
import { indexFactor, setFactorsSearchValue, destroyFactor, emptyFactors } from './../Module';

@authorize
@connect((state) => ({
  factors: state.Attendance.WorkingHours.factors,
  pagination: state.Attendance.WorkingHours.factorsPagination,
  searchValue: state.Attendance.WorkingHours.factorsSearchValue,
}), {
  index: indexFactor,
  setSearchValue: setFactorsSearchValue,
  destroy: destroyFactor,
  emptyFactors,
})
@autobind
/**
 *
 */
export default class FactorsList extends React.PureComponent {
  static propTypes = {
    factors: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    searchValue: PropTypes.string,
    index: PropTypes.func,
    setSearchValue: PropTypes.func,
    destroy: PropTypes.func,
    emptyFactors: PropTypes.func,
    workingHour: PropTypes.object,
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onFormCancel: PropTypes.func,
    can: PropTypes.func,
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
    this._list.resetSearch(this.props.searchValue);

    this._onReload(undefined, undefined, true);
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
    const { index, workingHour, searchValue } = this.props;

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

      index(workingHour.id, params, () => this.setState({ loading: false }));
    });
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const { index, workingHour, pagination, setSearchValue } = this.props;

    this.setState({ loading: true }, () => index(workingHour.id, {
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
    const { destroy, onFormCancel } = this.props;

    Modal.confirm({
      title: app.translate('routes.home.attendance.working-hours.Removing Factor'),
      content: app.translate('routes.home.attendance.working-hours.Are you sure about removing factor', { factor: item.name }),
      onOk: () => destroy(item.id, null, (err) => !err && onFormCancel(item.id)),
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
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const { can, onEdit } = this.props;

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'edit':
              onEdit(item);
              break;
            case 'delete':
            default:
              this._onDelete(item);
          }
        }}
      >
        <Menu.Item key="edit" disabled={!can('Factor@update')}>
          <MaterialIcon name="pencil"/>
          {app.translate('main.Edit')}
        </Menu.Item>
        <Menu.Item key="delete" disabled={!can('Factor@destroy')}>
          <MaterialIcon name="delete"/>
          {app.translate('main.Delete')}
        </Menu.Item>
      </Menu>
    );
  }

  /**
   *
   * @function _renderExtra
   * @return {XML}
   * @private
   */
  get _extra() {
    const { loading } = this.state;
    const { can, onAdd, pagination } = this.props;

    return (
      <Button.Group>
        <Button
          type="dashed"
          onClick={() => this._onReload(pagination.current, pagination.pageSize, true)}
          disabled={!can('Factor@index') || loading}
        >
          <MaterialIcon name="reload" size="tiny" spin={loading}/>
        </Button>
        <Button
          type="primary"
          icon="plus"
          onClick={onAdd}
          disabled={!can('Factor@store')}
        >
          {app.translate('main.Add')}
        </Button>
      </Button.Group>
    );
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { factors, activeItem, onClick } = this.props;

    return (
      <ListView
        ref={(input) => this._list = input}
        title={app.translate('routes.home.attendance.working-hours.Factors')}
        items={factors}
        primaryText="name"
        secondaryText="description"
        style={{height: '100%'}}
        menu={this._menu}
        extra={this._extra}
        onSearch={this._onSearch}
        loading={loading}
        pagination={this._pagination}
        activeItem={activeItem}
        onClick={onClick}
      />
    );
  }
}
