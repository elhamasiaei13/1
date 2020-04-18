import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import List from './List';
import {index, destroy, emptyRulePacks} from './../Module';

@connect((state) => ({
  rulePacks: state.Requests.Pattern.RulePack.rulePacks,
  meta: state.Requests.Pattern.RulePack.metaRulePacks,
}), {
  index,
  destroy,
  emptyRulePacks,
})
@autobind
/**
 *
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    emptyRulePacks: PropTypes.func,
    destroy: PropTypes.func,
    rulePacks: PropTypes.arrayOf(PropTypes.object),
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
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRulePacks();
  }

  /**
   *
   * @param {Number} page
   * @param {Number} limit
   * @private
   */
  _onReload(page = 0, limit = app.config.pagination.limit) {
    const {index} = this.props;
    this.setState({loading: true}, () => {
      index({page, limit}, () => this.setState({loading: false}));
    });
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
   * @return {Object}
   * @private
   */
  _pagination() {
    const { meta } = this.props;

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
   * @return {ListWrapper.props.rules}
   * @private
   */
  _dataSource() {
    let {rulePacks} = this.props;

    app._.map(rulePacks, (rulePack) => {
      rulePack.icon = 'content-paste';
    });
    return rulePacks;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {activeItem, onClick, menu, extra, ...rest} = this.props;
    const {loading} = this.state;

    return (
      <List
        items={this._dataSource()}
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
