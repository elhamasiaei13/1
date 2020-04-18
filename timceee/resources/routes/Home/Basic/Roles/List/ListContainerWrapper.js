import React from 'react';
import {connect} from 'react-redux';
import {indexRoles, emptyPermissions} from './../Module';
import PropTypes from 'prop-types';
import ListContainer from './ListContainer';

@connect((state) => ({
  roles: state.Basic.Roles.roles,
  meta: state.Basic.Roles.meta,
}), {
  indexRoles,
  emptyPermissions,
})
@autobind
/**
 *
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    indexRoles: PropTypes.func,
    title: PropTypes.string,
    roles: PropTypes.arrayOf(
      PropTypes.object,
    ),
    meta: PropTypes.object,
    menuItemTouch: PropTypes.func,
    onItemClick: PropTypes.func,
    onAdd: PropTypes.func,
    onInfo: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    emptyPermissions: PropTypes.func,
    statusAdd: PropTypes.bool,
    activeItem: PropTypes.number,
  };

  static defaultProps = {
    title: '',
    roles: [],
    activeItem: null,
    statusAdd: false,
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
    this._onReload();
  }


  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (app._.isEmpty(np.roles)) {
      if (!app._.isEqual(np.meta.prev, np.meta.currentPage) && np.meta.prev) {
        this._onReload(np.meta.prev, np.meta.limit);
      }
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyPermissions();
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {indexRoles, meta} = this.props;

    this.setState({loading: true}, () => indexRoles({
      includes: ['perms'],
      filterGroups: [
        {
          or: true,
          filters: [
            {
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
        },
      ],
      limit: meta.limit,
    }, () => this.setState({loading: false})));
  }

  /**
   *
   * @private
   */
  _onReload(page = 0, limit = app.config.pagination.limit) {
    const {indexRoles} = this.props;
    this.setState({loading: true});
    indexRoles({includes: ['perms'], page, limit}, () => this.setState({loading: false}));
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _pagination() {
    const {meta} = this.props;

    return {
      current: meta.currentPage + 1,
      total: meta.total,
      pageSize: meta.limit,
      showTotal: (total, range) => app.translate('main.showingFromToOf', {
        start: range[0],
        end: range[1],
        total,
      }),
      onChange: (page, limit) => this._onReload(page - 1, limit),
      onShowSizeChange: (page, limit) => this._onReload(page - 1, limit),
    };
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {title, roles, onItemClick, menuItemTouch, meta, onAdd, onInfo, onEdit, onDelete, statusAdd, activeItem} = this.props;

    return (
      <ListContainer
        activeItem={activeItem}
        title={title}
        items={roles}
        onReload={() => this._onReload(meta.currentPage, meta.limit)}
        onItemClick={onItemClick}
        menuItemTouch={menuItemTouch}
        onAdd={onAdd}
        onInfo={onInfo}
        onEdit={onEdit}
        onDelete={onDelete}
        statusAdd={statusAdd}
        loading={loading}
        onSearch={this._onSearch}
        pagination={this._pagination()}
      />
    );
  }
}
