import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PacksList from './PacksList';
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
export default class PacksListWrapper extends React.PureComponent {
  static propTypes = {
    indexPacks: PropTypes.func,
    destroyPack: PropTypes.func,
    packs: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    menu: PropTypes.func,
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
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
   * @private
   */
  _onReload(page = 0, limit = app.config.pagination.limit) {
    const {indexPacks} = this.props;

    this.setState({loading: true});

    indexPacks({page, limit}, (err) => !err && this.setState({loading: false}));
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
    const {packs, activeItem, onClick, menu, extra, ...rest} = this.props;
    const {loading} = this.state;

    return (
      <PacksList
        items={packs}
        loading={loading}
        onSearch={this._onSearch}
        pagination={this._pagination()}
        activeItem={activeItem}
        onClick={onClick}
        menu={menu}
        extra={extra}
        {...rest}
      />
    );
  }
}
