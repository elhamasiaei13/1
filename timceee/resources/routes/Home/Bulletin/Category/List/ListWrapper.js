import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {index} from './../Module';
import MaterialIcon from 'components/common/MaterialIcon';
import moment from 'moment';

@connect((state) => ({
  categories: state.Bulletin.Category.categories,
  meta: state.Bulletin.Category.meta,
}), {
  index,
})
@autobind
/**
 *
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    index: PropTypes.func,
    onSearch: PropTypes.func,
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
    const {index} = this.props;
    let toyDay = moment().format('YYYY-MM-DD');

    this.setState({loading: true}, () => {
      index({
        includes: ['questionnaires'],
        filterGroups: [{
          filters: [
            {
              key: 'date_from',
              value: toyDay,
              operator: 'lte',
            },
            {
              key: 'date_to',
              value: toyDay,
              operator: 'gte',
            },
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
    const {index, meta} = this.props;
    let toyDay = moment().format('YYYY-MM-DD');

    this.setState({loading: true}, () => index({
      filterGroups: [{
          filters: [
            {
              key: 'date_from',
              value: toyDay,
              operator: 'lte',
            },
            {
              key: 'date_to',
              value: toyDay,
              operator: 'gte',
            },
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
    }, (err) => this.setState({loading: false})));
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
    let {categories} = this.props;

    app._.map(categories, (category) => {
      category.icon = 'camera-timer';
    });
    return categories;
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
