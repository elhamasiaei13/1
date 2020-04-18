import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {index} from './../Module';
import MaterialIcon from 'components/common/MaterialIcon';
import moment from 'moment';

@connect((state) => ({
  posts: state.Bulletin.Post.posts,
  meta: state.Bulletin.Post.meta,
}), {
  index,
})
@autobind
/**
 *
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
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

  /**
   * @param {Number} page
   * @param {Number} limit
   * @private
   */
  _reload(page = 0, limit = app.config.pagination.limit) {
    const {index} = this.props;
    this.setState({loading: true}, () => index({
      includes: ['category'], page, limit,
    }, (err) =>this.setState({loading: false})));
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {index, meta} = this.props;

    this.setState({loading: true}, () => index({
      includes: ['category'],
      filterGroups: [
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

  // /**
  //  *
  //  * @return {ListWrapper.props.rules}
  //  * @private
  //  */
  // _dataSource() {
  //   let {posts} = this.props;
  //
  //   app._.map(posts, (post) => {
  //     post.icon = 'bulletin-board';
  //   });
  //   return posts;
  // }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {...rest} = this.props;
    const {onSearch, posts} = this.props;

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
        items={posts}
        loading={loading}
        pagination={this._renderPagination()}
        onSearch={onSearch ? onSearch : onSearch === null ? undefined : this._onSearch}
        {..._props}
      />
    );
  }
}
