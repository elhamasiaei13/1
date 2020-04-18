import React from 'react';
import {Modal} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PacksListContainer from './PacksListContainer';
import {indexPacks, destroyPack} from './../Module';

@connect((state) => ({
  packs: state.Attendance.Stack.Packs.packs,
  meta: state.Attendance.Stack.Packs.metaPacks,
}), {
  indexPacks,
  destroyPack,
})
@autobind
/**
 *
 */
export default class PacksListContainerWrapper extends React.PureComponent {
  static propTypes = {
    indexPacks: PropTypes.func,
    destroyPack: PropTypes.func,
    packs: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
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
   * @param {Number} page
   * @param {Number} limit
   * @private
   */
  _onReload(page = 0, limit = app.config.pagination.limit) {
    const {indexPacks} = this.props;

    this.setState({loading: true});

    indexPacks({page, limit}, (err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @param {Object} item - item to delete
   * @private
   */
  _onDelete(item) {
    const {destroyPack} = this.props;

    Modal.confirm({
      title: app.translate('routes.home.attendance.stack.Removing Stack Pack'),
      content: app.translate('routes.home.attendance.stack.Are you sure about removing stack pack', {stackPack: item.name}),
      onOk: () => destroyPack(item.id),
    });
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {indexPacks, meta} = this.props;

    this.setState({loading: true}, () => indexPacks({
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
    const {packs, activeItem, onClick, onAdd, onEdit, meta} = this.props;
    const {loading} = this.state;

    return (
      <PacksListContainer
        items={packs}
        loading={loading}
        onSearch={this._onSearch}
        onReload={()=> this._onReload(meta.currentPage, meta.limit)}
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
