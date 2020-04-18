import React from 'react';
import PropTypes from 'prop-types';
import {indexQuestionnaire,emptyQuestionnaire} from './../../Period/Module';
import {connect} from 'react-redux';
import ListView from 'components/common/ListView';
import {Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@connect((state) => ({
  questionnaires: state.Evaluation360.Period.questionnaires,
  questionnairesMeta: state.Evaluation360.Period.questionnairesMeta,
}), {
  indexQuestionnaire,
  emptyQuestionnaire,
})

@autobind
/**
 *
 */
export default class Questionnaires extends React.PureComponent {
  static propTypes = {
    questionnaires: PropTypes.arrayOf(PropTypes.object),
    questionnairesMeta: PropTypes.object,
    indexQuestionnaire: PropTypes.func,
    emptyQuestionnaire: PropTypes.func,
    period: PropTypes.object,
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
    let periodId = this.props.period && this.props.period.id;
    this._onReload(periodId);
  }

  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.period, this.props.period)) {
      let periodId = np.period && np.period.id;
      this._onReload(periodId);
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.emptyQuestionnaire();
  }

  /**
   * @param {Number} periodId
   * @param {Number} page
   * @param {Number} limit
   * @private
   */
  _onReload(periodId, page = 0, limit = app.config.pagination.limit) {
    const {indexQuestionnaire} = this.props;
    this.setState({loading: true}, () => indexQuestionnaire(periodId, {page, limit}, (err) => !err && this.setState({loading: false})));
  }

  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    const {indexQuestionnaire, questionnairesMeta} = this.props;

    let periodId = this.props.period && this.props.period.id;
    this.setState({loading: true}, () => indexQuestionnaire(periodId, {
      filterGroups: [
        {
          or: true,
          filters: [
            {
              key: 'name',
              value,
              operator: 'ct',
            },
          ],
        },
      ],
      limit: questionnairesMeta && questionnairesMeta.limit,
    }, (err) => !err && this.setState({loading: false})));
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _renderPagination() {
    const {questionnairesMeta} = this.props;

    return {
      total: questionnairesMeta && questionnairesMeta.total,
      pageSize: questionnairesMeta && questionnairesMeta.limit,
      showTotal: (total, range) => app.translate('main.showingFromToOf', {
        start: range[0],
        end: range[1],
        total,
      }),
      onChange: (page, limit) => this._onReload(page - 1, limit),
      onShowSizeChange: (page, limit) => this._onReload(page - 1, limit),
    };
  }

  _items() {
    const {questionnaires} = this.props;
    let _items = [];
    questionnaires.map((questionnaire) => {
      _items.push(Object.assign({}, questionnaire, {icon: 'comment-question-outline'}));
    });
    return _items;
  }

  /**
   *
   * @function render
   * @return {XML}
   */
  render() {
    const {...rest} = this.props;
    const {loading} = this.state;
    let _props = app._.omit(rest, ['position', 'period', 'questionnaire']);
    let periodId = this.props.period && this.props.period.id;

    return (
      <ListView
        extra={[
          <Button key='btnReload' type='dashed' onClick={() => {
            this._onReload(periodId);
          }}>
            <MaterialIcon name="reload" spin={loading}/>
          </Button>,
        ]}
        items={this._items()}
        title={app.translate('routes.home.evaluation-360.Questionnaires')}
        primaryText={'title'}
        secondaryText={'description'}
        style={{height: '100%'}}
        pagination={this._renderPagination()}
        onSearch={this._onSearch}
        icon={true}
        loading={loading}
        {..._props}
      />
    );
  }
}
