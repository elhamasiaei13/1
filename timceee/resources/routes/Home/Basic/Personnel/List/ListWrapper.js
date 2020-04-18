import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from './List.old';
import { setSearchValue, indexUsers, emptyUsers } from './../Module';
import MaterialIcon from 'components/common/MaterialIcon';
import { Button, Tooltip } from 'antd';

@authorize
@connect((state) => ({
  users: state.Basic.Personnel.users,
  search: state.Basic.Personnel.searchValue,
  pagination: state.Basic.Personnel.pagination,
}), {
  index: indexUsers,
}, null, { withRef: true })
@autobind
/**
 * Creates personnel list and gets personnel from api
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    menu: PropTypes.func,
    index: PropTypes.func,
    reference: PropTypes.func,
    users: PropTypes.array,
    search: PropTypes.string,
    pagination: PropTypes.object,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    height: PropTypes.string,
    activeItem: PropTypes.number,
    component: PropTypes.string, // sheep shit
    can: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {},
    reference: () => {},
    height: '100%',
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: props.users.length === 0,
      search: props.search,
    };
  }

  /**
   * getting users from api
   */
  componentDidMount() {
    const { users } = this.props;

    if (users.length === 0) {
      this._index(undefined, undefined, true);
    }
  }

  /**
   *
   */
  _resetSearch() {
    this.setState({ search: '' }, () => {
      if (this._list.resetSearch) this._list.resetSearch();
      else this._list.getWrappedInstance().resetSearch();

      app.dispatch(setSearchValue());
    });
  }

  /**
   *
   * @param  {Number} [page=1]
   * @param  {Number} [limit=app.config.pagination.limit]
   * @param  {Boolean} [force=false]
   */
  _index(page = 1, limit = app.config.pagination.limit, force = false) {
    const { index, component } = this.props;

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

    this.setState({ loading: true }, () => index(params, () => this.setState({
      loading: false,
    }), component));
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const { index, pagination } = this.props;

    this.setState({ loading: true, search: value }, () => index({
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
      limit: pagination.pageSize,
    }, () => {
      this.setState({ loading: false });
      app.dispatch(setSearchValue(value));
    }));
  }

  /**
   *
   */
  empty() {
    app.dispatch(emptyUsers());
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
    const { users, onClick, menu, can, extra, height, activeItem, reference, ...rest } = this.props;

    return (
      <List
        items={users}
        loading={loading}
        onSearch={this._onSearch}
        onClick={onClick}
        menu={menu}
        extra={extra ? extra : <Button.Group>
          <Tooltip title={app.translate('main.Reload')} placement="bottom">
            <Button
              type="dashed"
              onClick={()=> this._index(1, app.config.pagination.limit, true)}
              disabled={!can('User@index') || loading}
            >
              <MaterialIcon name="reload" spin={loading}/>
            </Button>
          </Tooltip>
        </Button.Group>}
        reference={(input) => {
          this._list = input;
          reference(input);
        }}
        height={height}
        activeItem={activeItem}
        {...rest}
        pagination={this._pagination}
      />
    );
  }
}
