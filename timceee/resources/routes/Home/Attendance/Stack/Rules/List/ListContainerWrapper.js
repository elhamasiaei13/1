import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ListContainer from './ListContainer';
import {index, emptyRules} from './../Module';

@connect((state) => ({
  rules: state.Attendance.Stack.Rules.rules,
  modules: state.General.modules,
  meta: state.Attendance.Stack.Rules.meta,
}), {
  index,
  emptyRules,
})
@autobind
/**
 *
 * @class ListContainerWrapper
 * @extends PureComponent
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    index: PropTypes.func,
    emptyRules: PropTypes.func,
    rules: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    onClick: PropTypes.func,
    modules: PropTypes.array,
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

  _reload(page = 0, limit = app.config.pagination.limit) {
    const {index, emptyRules, modules} = this.props;
    this.setState({loading: true});
    let _modules = modules.find((item) => item.name === 'Stack');
    emptyRules();
    index({
      includes: ['type'],
      filterGroups: [
        {
          filters: [
            {
              key: 'module_id',
              value: _modules && _modules.id,
              operator: 'eq',
            },
            {
              key: 'visible',
              value: '1',
              operator: 'eq',
            },
          ],
        },
      ], page, limit,
    }, () => this.setState({loading: false}));
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {index, meta, modules} = this.props;
    let _modules = modules.find((item) => item.name === 'Stack');

    this.setState({loading: true}, () => index({
      filterGroups: [
        {
          filters: [
            {
              key: 'module_id',
              value: _modules && _modules.id,
              operator: 'eq',
            },
            {
              key: 'visible',
              value: '1',
              operator: 'eq',
            },
          ],
        },
        {
          or: true,
          filters: [
            {
              key: 'label',
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
    app._.map(rules, (rule) => {
      rule.icon = (rule.type === 'rule' ? 'gavel' : 'file-chart');
    });
    return rules;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {activeItem, meta, onClick, ...rest} = this.props;
    const {loading} = this.state;

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
