import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { indexUsers, destroyUser } from './../Module';
import PropTypes from 'prop-types';
import ListContainer from './ListContainer';

@connect((state) => ({
  users: state.Basic.Personnel.users,
  pagination: state.Basic.Personnel.pagination,
}), {
  index: indexUsers,
  destroy: destroyUser,
})
@autobind
/**
 * Gets all personnel from api and adds them all to ListContainer
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    users: PropTypes.array,
    pagination: PropTypes.object,
    index: PropTypes.func,
    destroy: PropTypes.func,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    component: PropTypes.string, // sheep shit
  };

  static defaultProps = {
    onClick: () => {},
    onAdd: () => {},
    onView: () => {},
    onEdit: () => {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: props.users.length === 0,
      search: '',
    };
  }

  /**
   * getting users from api
   */
  componentDidMount() {
    const { users } = this.props;

    if (users.length === 0) {
      this._onReload(undefined, undefined, true);
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  /**
   * reloading all devices data including connection status
   * @param {Number} [page=1]
   * @param {Number} [limit=app.config.pagination.limit]
   * @param {Boolean} [force=false]
   * @private
   */
  _onReload(page = 1, limit = app.config.pagination.limit, force = false) {
    const { index, component } = this.props;

    this._list.resetSearch();

    this.setState({ loading: true }, () => index({
      includes: [
        'profile',
      ],
      page: page - 1,
      limit,
    }, () => this.setState({
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

    this.setState({ loading: true }, () => index({
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
    }, () => this.setState({ loading: false })));
  }

  /**
   *
   * @param {Object} item
   * @private
   */
  _onDelete(item) {
    const { destroy } = this.props;

    Modal.confirm({
      title: app.translate('routes.home.basic.personnel.Removing person'),
      content: app.translate('routes.home.basic.personnel.Are you sure removing person with name', { name: `${item.profile.firstName} ${item.profile.lastName}` }),
      onOk: () => destroy(item.id),
    });
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
   *
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { users, onClick, onAdd, onView, onEdit, pagination } = this.props;

    return (
      <ListContainer
        reference={(input) => this._list = input}
        items={users}
        loading={loading}
        onSearch={this._onSearch}
        pagination={this._pagination}
        onClick={onClick}
        onAdd={onAdd}
        onView={onView}
        onEdit={onEdit}
        onDelete={this._onDelete}
        onReload={() => this._onReload(pagination.current, pagination.pageSize, true)}
      />
    );
  }
}
