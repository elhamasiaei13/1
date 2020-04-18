import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import {connect} from 'react-redux';
import {index} from './../Module';
import MaterialIcon from 'components/common/MaterialIcon';
import {Button} from 'antd';

@connect((state) => ({
  questionCategories: state.Evaluation360.Question.QuestionCategory.questionCategories,
  meta: state.Evaluation360.Question.QuestionCategory.meta,
}), {
  index,
})
@autobind
/**
 *
 */
export default class ListWrapper extends React.PureComponent {
  static propTypes = {
    questionCategories: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    index: PropTypes.func,
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
    let {questionCategories} = this.props;

    app._.map(questionCategories, (questionCategory) => {
      questionCategory.icon = 'comment-question-outline';
    });
    return questionCategories;
  }
  get _extra() {
    const {onCancel, activeItem} = this.props;
    let items = [];
    const {loading} = this.state;
    items.push(<Button
      key='btnReload'
      type='dashed'
      disabled={!!activeItem}
      onClick={() => {
        this._reload();
      }}>
      <MaterialIcon name="reload" spin={loading}/>
    </Button>);
    if (onCancel) {
      items.push(<Button
        type="danger"
        key='onCancel'
        onClick={onCancel}
      >
        {app.translate('main.Cancel')}
      </Button>);
    }
    return items;
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
        extra={[<Button.Group key='btngroup'>{this._extra}</Button.Group>]}
        items={this._dataSource()}
        loading={loading}
        pagination={this._renderPagination()}
        onSearch={this._onSearch}
        {..._props}
      />
    );
  }
}
