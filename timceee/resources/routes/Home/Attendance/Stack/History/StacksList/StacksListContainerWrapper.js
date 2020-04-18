import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StacksListContainer from './StacksListContainer';
import {index, emptyStacks} from './../Module';

@connect((state) => ({
  stacks: state.Attendance.Stack.History.stacks,
  meta: state.Attendance.Stack.History.meta,
}), {
  index,
  emptyStacks,
})
@autobind
/**
 *
 */
export default class StacksListContainerWrapper extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    emptyStacks: PropTypes.func,
    stacks: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    personnel: PropTypes.object,
    onClick: PropTypes.func,
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
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyStacks();
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
  }

  /**
   *
   * @private
   */
  _onReload(page = 0, limit = app.config.pagination.limit) {
    const {index, personnel} = this.props;
    this.setState({loading: true});

    index(personnel.id, {page, limit}, (err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _pagination() {
    const {meta} = this.props;

    return {
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
    const {stacks, personnel, activeItem, onClick, onCancel, meta} = this.props;
    const {loading} = this.state;

    return (
      <StacksListContainer
        items={stacks}
        loading={loading}
        onSearch={this._onSearch}
        onReload={()=> this._onReload(meta.currentPage, meta.limit)}
        pagination={this._pagination()}
        activeItem={activeItem}
        onClick={onClick}
        onCancel={onCancel}
        personnel={personnel}
      />
    );
  }
}
