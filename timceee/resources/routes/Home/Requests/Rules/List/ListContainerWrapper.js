import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ListContainer from './ListContainer';
import {index, emptyRules} from './../Module';

@connect((state) => ({
  rules: state.Requests.Rules.rules,
  meta: state.Requests.Rules.meta,
}), {
  index,
  emptyRules,
})
@autobind
/**
 *
 * @extends React.PureComponent
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    emptyRules: PropTypes.func,
    rules: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
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
    this._reload();
  }

  /**
   *
   * @private
   */
  _reload(page = 0, limit = app.config.pagination.limit) {
    const {index, emptyRules} = this.props;

    this.setState({loading: true}, () => {
      emptyRules();

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
    const {meta} = this.props;

    return {
      total: meta.total,
      pageSize: meta.limit,
      showTotal: (total, range) => app.translate('main.showingFromToOf', {
        start: range[0],
        end: range[1],
        total,
      }),
      onChange: (page, limit) => this._reload(page - 1, limit),
      onShowSizeChange: (page, limit) => this._reload(page - 1, limit),
    };
  }


  /**
   *
   * @return {ListWrapper.props.rules}
   * @private
   */
  _dataSource() {
    let {rules} = this.props;

    rules.map((rule) => {
      rule.icon = (rule.type === 'rule' ? 'gavel' : 'file-chart');
    });

    return rules;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {activeItem, meta, onClick, ...rest} = this.props;

    return (
      <ListContainer
        items={this._dataSource()}
        loading={loading}
        reload={() => this._reload(meta.currentPage, meta.limit)}
        onSearch={this._onSearch}
        pagination={this._pagination()}
        activeItem={activeItem}
        onClick={onClick}
        {...rest}
      />
    );
  }
}
