import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import ListContainer from './ListContainer';
import { index, setSearchValue, emptyProcedures, destroy } from './../Module';

@connect((state) => ({
  procedures: state.Requests.Procedure.procedures,
  pagination: state.Requests.Procedure.pagination,
  searchValue: state.Requests.Procedure.searchValue,
}), {
  index,
  setSearchValue,
  empty: emptyProcedures,
  destroy,
})
@autobind
/**
 *
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    procedures: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    searchValue: PropTypes.string,
    index: PropTypes.func,
    setSearchValue: PropTypes.func,
    empty: PropTypes.func,
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
    const { procedures, searchValue } = this.props;

    this._list.resetSearch(this.props.searchValue);

    if (procedures.length === 0 && searchValue === '') {
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
      title: app.translate('routes.home.requests.procedure.Removing Procedure'),
      content: app.translate('routes.home.requests.procedure.Are you sure about removing procedure', { procedure: item.name }),
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
    const { procedures, pagination, ...rest } = this.props;

    return (
      <ListContainer
        { ...rest }
        reference={(input) => this._list = input}
        items={procedures}
        loading={loading}
        pagination={this._pagination}
        onSearch={this._onSearch}
        onReload={() => this._onReload(pagination.current, pagination.pageSize, true)}
        onDelete={this._onDelete}
        icon={(item) => (
          <MaterialIcon
            name={item.active ? 'check' : 'close'}
            style={{
              color: item.active ? '#009688' : '#F44336',
            }}
          />
    )
  }
  />
);
}
}
