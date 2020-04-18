import React from 'react';
import PropTypes from 'prop-types';
import User from 'components/classes/User';
import MaterialIcon from 'components/common/MaterialIcon';
import { Menu, Button, Tooltip, Modal } from 'antd';
import { setSearchValue, indexUsers as index, destroyUser as destroy } from './../Module';

@autobind
/**
 *
 */
export default class List extends User.List {
  static propTypes = Object.assign({}, User.List.propTypes, {
    onAdd: PropTypes.func,
    onView: PropTypes.func,
    deletable: PropTypes.bool,
    component: PropTypes.string, // sheep shit
  });

  static defaultProps = Object.assign({}, User.List.defaultProps, {
    deletable: true,
  });

  /**
   *
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.state, {
      search: app.state.Basic.Personnel.searchValue,
    });
  }

  /**
   *
   */
  componentDidMount() {
    this.unsubscribe = app.subscribe(() => this.forceUpdate());
    this._list.resetSearch(this.state.search);

    if (this._users.length === 0 && this.state.search === '') {
      this._onReload(undefined, undefined, true);
    } else {
      this._loaded();
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.unsubscribe();
  }

  /**
   *
   * @return {Array}
   */
  get _users() {
    return app.state.Basic.Personnel.users;
  }

  /**
   *
   * @return {Object}
   */
  get _pagination() {
    return {
      ...app.state.Basic.Personnel.pagination,
      onChange: (page, limit) => this._onReload(page, limit),
      onShowSizeChange: (page, limit) => this._onReload(page, limit),
    };
  }

  /**
   * renders extra for list
   * @function _renderExtra
   * @return {XML}
   * @private
   */
  get _extra() {
    const { loading } = this.state;
    const { onAdd } = this.props;
    const pagination = app.state.Basic.Personnel.pagination;

    return (
      <Button.Group>
        <Tooltip title={app.translate('main.Reload')} placement="bottom">
          <Button
            type="dashed"
            onClick={() => this._onReload(pagination.current, pagination.pageSize, true)}
            disabled={!app.authorize.can('User@index') || loading}
          >
            <MaterialIcon name="reload" spin={loading}/>
          </Button>
        </Tooltip>
        {/* <Tooltip title={app.translate('main.Trash')} placement="bottom">*/}
          {/* <Button*/}
            {/* disabled={!app.authorize.can('User@index') || loading}*/}
          {/* >*/}
            {/* <MaterialIcon name="delete"/>*/}
          {/* </Button>*/}
        {/* </Tooltip>*/}
        {
          onAdd &&
          <Button
            type="primary"
            icon="plus"
            onClick={onAdd}
            disabled={!app.authorize.can('User@store')}
          >
            {app.translate('main.Add')}
          </Button>
        }
      </Button.Group>
    );
  }

  /**
   *
   */
  _resetSearch() {
    this.setState({ search: '' }, () => {
      this._list.resetSearch();
      app.dispatch(setSearchValue());
    });
  }

  /**
   * reloading all devices data including connection status
   * @param {Number} [page=1]
   * @param {Number} [limit=app.config.pagination.limit]
   * @param {Boolean} [force=false]
   * @private
   */
  _onReload(page = 1, limit = app.config.pagination.limit, force = false) {
    this._load(() => {
      let params = {
        includes: [
          'profile',
        ],
        page: page - 1,
        limit,
      };

      if (force) {
        if (!app._.isEmpty(this.state.search)) params.page = 0;
        this._resetSearch();
      } else {
        params.filterGroups = [{
          filters: [{
            key: 'search',
            value: this.state.search,
            operator: 'ct',
          }],
        }];
      }

      app.dispatch(index(params, this._loaded, this.props.component));
    });
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    this._load(() => this.setState({ search: value }, () => app.dispatch(index({
      includes: [
        'profile',
      ],
      filterGroups: [{
        filters: [{
          key: 'search',
          value,
          operator: 'ct',
        }],
      }],
      limit: app.state.Basic.Personnel.pagination.pageSize,
    }, (...res) => {
      this._loaded(...res);
      app.dispatch(setSearchValue(value));
    }))));
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onDelete(item) {
    Modal.confirm({
      title: app.translate('routes.home.basic.personnel.Removing person'),
      content: app.translate('routes.home.basic.personnel.Are you sure removing person with name', { name: `${item.profile.firstName} ${item.profile.lastName}` }),
      onOk: () => app.dispatch(destroy(item.id)),
    });
  }

  /**
   *
   * @param {Object} item
   * @return {XML}
   * @private
   */
  _menu(item) {
    const { onView, deletable } = this.props;
    let _items = [];

    if (onView) {
      _items.push(
        <Menu.Item key="view" disabled={!app.authorize.can('User@index')}>
          <MaterialIcon name="eye"/>
          {app.translate('main.View')}
        </Menu.Item>
      );
    }

    if (deletable && this._onDelete) {
      _items.push(
        <Menu.Item key="delete" disabled={item.id === app.state.Auth.currentUser.id || !app.authorize.can('User@destroy')}>
        <MaterialIcon name="delete"/>
        {app.translate('main.Delete')}
      </Menu.Item>
      );
    }

    if (_items.length === 0) {
      return null;
    }

    return (
      <Menu
        onClick={({key}) => {
          switch (key) {
            case 'view':
              onView(item);
              break;
            case 'delete':
            default:
              this._onDelete(item);
          }
        }}
      >
        {_items}
      </Menu>
    );
  }
}
