import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import {connect} from 'react-redux';
import {index} from './../Module';

@connect((state) => ({
  settings: state.Basic.Setting.Definition.settings,
  meta: state.Basic.Setting.Definition.meta,
}), {
  index,
})
@autobind
/**
 *
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    settings: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    index: PropTypes.func,
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

    this.setState({loading: true}, () => {
      index({
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
    let {settings} = this.props;

    app._.map(settings, (setting) => {
      setting.icon = 'settings';
    });
    return settings;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {...rest} = this.props;

    let _props = app._.omit(rest, ['items', 'loading', 'pagination', 'onSearch']);

    return (
      <List
        items={this._dataSource()}
        loading={loading}
        pagination={this._renderPagination()}
        onSearch={this._onSearch}
        {..._props}
      />
    );
  }
}
