import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {index} from './../Module';
import MaterialIcon from 'components/common/MaterialIcon';
import moment from 'moment';

@connect((state) => ({
  periods: state.Evaluation360.Period.periods,
  meta: state.Evaluation360.Period.meta,
}), {
  index,
})
@autobind
/**
 *
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    periods: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    index: PropTypes.func,
    onSearch: PropTypes.func,
    getAll: PropTypes.bool,
  };

  static defaultProps = {
    getAll: true,
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
    const {index, getAll} = this.props;
    let toyDay = moment().format('YYYY-MM-DD');
    let filters = [];
    if (!getAll) {
      filters = [{
        key: 'date_from',
        value: toyDay,
        operator: 'lte',
      },
        {
          key: 'date_to',
          value: toyDay,
          operator: 'gte',
        }];
    }
    this.setState({loading: true}, () => {
      index({
        includes: ['questionnaires'],
        filterGroups: [{
          filters: [
            ...filters,
            {
              key: 'enable',
              value: '1',
              operator: 'eq',
            },
          ],
        }],
        page,
        limit,
      }, () => this.setState({loading: false}));
    });
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {index, meta, getAll} = this.props;
    let toyDay = moment().format('YYYY-MM-DD');
    let filters = [];
    if (!getAll) {
      filters = [{
        key: 'date_from',
        value: toyDay,
        operator: 'lte',
      },
        {
          key: 'date_to',
          value: toyDay,
          operator: 'gte',
        }];
    }
    this.setState({loading: true}, () => index({
      filterGroups: [{
        filters: [
          ...filters,
          {
            key: 'enable',
            value: '1',
            operator: 'eq',
          },
        ],
      },
        {
          or: true,
          filters: [
            {
              key: 'title',
              value,
              operator: 'ct',
            },
          ],
        },
      ],
      limit: meta && meta.limit,
    }, (err) => !err && this.setState({loading: false})));
  }

  /**
   * renders pagination object
   * @return {Object}
   * @private
   */
  _renderPagination() {
    const {meta} = this.props;

    return {
      total: meta && meta.total,
      pageSize: meta && meta.limit,
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
    let {periods} = this.props;

    app._.map(periods, (period) => {
      period.icon = 'camera-timer';
    });
    return periods;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {...rest} = this.props;
    const {onSearch} = this.props;

    let _props = app._.omit(rest, ['items', 'loading', 'pagination', 'onSearch']);

    return (
      <List
        extra={[
          <Button key='btnReload' type='dashed' onClick={() => {
            this._reload();
          }}>
            <MaterialIcon name="reload" spin={loading}/>
          </Button>,
        ]}
        items={this._dataSource()}
        loading={loading}
        pagination={this._renderPagination()}
        onSearch={onSearch ? onSearch : onSearch === null ? undefined : this._onSearch}
        {..._props}
      />
    );
  }
}
