import React from 'react';
import {Modal} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ListContainer from './ListContainer';
import {index, destroy, emptyPolicies} from './../Module';

@connect((state) => ({
  policies: state.Attendance.Policy.Definition.policies,
  meta: state.Attendance.Policy.Definition.metaPolicies,
}), {
  index,
  destroy,
  emptyPolicies,
})
@autobind
/**
 *
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    destroy: PropTypes.func,
    emptyPolicies: PropTypes.func,
    policies: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
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
    this._onReload();
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {index, meta} = this.props;

    this.setState({loading: true}, () => index({
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
    const {index, emptyPolicies} = this.props;
    this.setState({loading: true}, () => {
      emptyPolicies();
      index({page, limit}, () => this.setState({loading: false}));
    });

  }

  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _onDelete(item) {
    const {destroy} = this.props;

    Modal.confirm({
      title: app.translate('routes.home.attendance.policy.Removing Policy'),
      content: app.translate('routes.home.attendance.policy.Are you sure about removing policy', {policy: item.name}),
      onOk: () => destroy(item.id, () => this.props.onCancel()),
    });
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _pagination() {
    const {meta} = this.props;

    return {
      total: meta && meta.total,
      pageSize: meta && meta.limit,
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
    const {policies, activeItem, onClick, onAdd, onEdit, meta} = this.props;
    const {loading} = this.state;

    return (
      <ListContainer
        items={policies}
        loading={loading}
        onSearch={this._onSearch}
        onReload={() => this._onReload(meta.currentPage, meta.limit)} // meta.currentPage
        pagination={this._pagination()}
        onDelete={this._onDelete}
        activeItem={activeItem}
        onClick={onClick}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    );
  }
}
