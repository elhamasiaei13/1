import React from 'react';
import ListContainer from './ListContainer';
import PropTypes from 'prop-types';
import {index, destroy} from './../Module';
import {connect} from 'react-redux';
import {Modal} from 'antd';

@connect((state) => ({
  questionnaires: state.Evaluation360.Question.Questionnaire.questionnaires,
  meta: state.Evaluation360.Question.Questionnaire.meta,
}), {
  index,
  destroy,
})
@autobind
/**
 *
 */
export default class ListContainerWrapper extends React.PureComponent {
  static propTypes = {
    questionnaires: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    activeItem: PropTypes.number,
    index: PropTypes.func,
    destroy: PropTypes.func,
    onClick: PropTypes.func,
    onCancel: PropTypes.func,
    onAdd: PropTypes.func,
    onSetting: PropTypes.func,
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
   * @param {Number} page
   * @param {Number} limit
   * @private
   */
  _onReload(page = 0, limit = app.config.pagination.limit) {
    const {index} = this.props;
    this.setState({loading: true}, () => index({page, limit}, (err) => !err && this.setState({loading: false})));
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
              key: 'title',
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
   *
   * @param {Object} item - item to delete
   * @private
   */
  _onDelete(item) {
    const {destroy, onCancel} = this.props;

    Modal.confirm({
      title: app.translate('routes.home.evaluation-360.Removing Questionnaire'),
      content: app.translate('routes.home.evaluation-360.Are you sure about removing', {title: item.title}),
      onOk: () => destroy(item.id, {}, () => onCancel()),
    });
  }

  /**
   *
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
      onChange: (page, limit) => this._onReload(page - 1, limit),
      onShowSizeChange: (page, limit) => this._onReload(page - 1, limit),
    };
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {questionnaires, onSetting, meta, ...rest} = this.props;

    let _props = app._.omit(rest, ['items', 'loading', 'pagination', 'icon', 'onSearch', 'onReload', 'onDelete']);

    return (
      <ListContainer
        items={questionnaires}
        loading={loading}
        pagination={this._renderPagination()}
        icon={this._renderIcon}
        onSearch={this._onSearch}
        onReload={() => this._onReload(meta.currentPage, meta.limit)}
        onDelete={this._onDelete}
        onSetting={onSetting}
        {..._props}
      />
    );
  }
}
