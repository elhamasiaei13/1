import React from 'react';
import PropTypes from 'prop-types';
import {getEvaluation, emptyEvaluations} from './../Module';
import {connect} from 'react-redux';
import ListView from 'components/common/ListView';
import {Button} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';

@connect((state) => ({
  evaluation360: state.Evaluation360.Evaluation.evaluation360,
  evaluation360Meta: state.Evaluation360.Evaluation.evaluation360Meta,
}), {
  getEvaluation,
  emptyEvaluations,
})

@autobind
/**
 *
 */
export default class Position360 extends React.PureComponent {
  static propTypes = {
    evaluation360: PropTypes.arrayOf(PropTypes.object),
    evaluation360Meta: PropTypes.object,
    getEvaluation: PropTypes.func,
    emptyEvaluations: PropTypes.func,
    position: PropTypes.object,
    period: PropTypes.object,
    questionnaire: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      searchValue: '',
    };
  }

  /**
   *
   */
  componentDidMount() {
    this._onReload(this.props);
  }

  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.period, this.props.period) || !app._.isEqual(np.questionnaire, this.props.questionnaire) || !app._.isEqual(np.position, this.props.position)) {
      this._onReload(np);
      this.setState({searchValue: ''});
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyEvaluations} = this.props;

    emptyEvaluations();
  }

  /**
   * @param {Object} props
   * @param {string} value
   * @param {Number} page
   * @param {Number} limit
   * @private
   */
  _onReload(props, value = '', page = 0, limit = app.config.pagination.limit) {
    const {getEvaluation, emptyEvaluations} = this.props;
    emptyEvaluations();
    let data = {
      positionId: props.position && props.position.id,
      questionnaireId: props.questionnaire && props.questionnaire.id,
      periodId: props.period && props.period.id,
    };

    data = [
      {
        filters: [ // TODO change responder_user_id to responder_position_id
          {
            key: 'responder_position_id', // 'responder_user_id'
            value: [props.position ? props.position.id : 0],
            operator: 'in',
          },
          {
            key: 'questionnaire_id',
            value: [props.questionnaire ? props.questionnaire.id : 0],
            operator: 'in',
          },
        ],
      },
    ];
    if (value !== '') {
      data.push({
        or: true,
        filters: [
          {
            key: 'assigned',
            value,
            operator: 'eq',
          },
        ],
      });
    }
    this.setState({loading: true}, () => getEvaluation({
      includes: ['assigned_user.profile'],
      filterGroups: data,
      page,
      limit,
    }, (err) => !err && this.setState({loading: false})));
  }


  /**
   *
   * @param {String} value
   * @private
   */
  _onSearch(value) {
    this.setState({searchValue: value});
    this._onReload(this.props, value);
  }

  /**
   *
   * @return {Object}
   * @private
   */
  _renderPagination() {
    const {evaluation360Meta} = this.props;

    return {
      total: evaluation360Meta && evaluation360Meta.total,
      pageSize: evaluation360Meta && evaluation360Meta.limit,
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
   * @function render
   * @return {XML}
   */
  render() {
    const {evaluation360} = this.props;
    const {...rest} = this.props;
    const {loading, searchValue} = this.state;
    let _props = app._.omit(rest, ['position', 'period', 'questionnaire']);
    return (
      <ListView
        loading={loading}
        searchValue={searchValue}
        extra={[
          <Button key='btnReload' type='dashed' onClick={() => {
            this._onReload(this.props);
          }}>
            <MaterialIcon name="reload" spin={loading}/>
          </Button>,
        ]}
        items={evaluation360}
        title={app.translate('routes.home.evaluation-360.Position360')}
        primaryText={(item) => ` ${item.assignedUser && item.assignedUser.profile ? `${item.assignedUser.profile.firstName} ${item.assignedUser.profile.lastName}` : `-`}`}
        secondaryText={(item) => (`(${(item.type === 'parent' ?
          app.translate('routes.home.evaluation-360.Employee') :
          item.type === 'sibling' ?
            app.translate('routes.home.evaluation-360.Colleague') :
            item.type === 'contact' ?
              app.translate('routes.home.evaluation-360.Contact') :
              app.translate('routes.home.evaluation-360.Manager'))})`)}
        style={{height: '100%'}}
        pagination={this._renderPagination()}
        onSearch={this._onSearch}
        avatar={{
          render: (item) => (item && item.assignedUser && item.assignedUser.profile && item.assignedUser.profile.avatar ? item.assignedUser.profile.avatar : ''),
        }}
        // status={(item) => item.isAnswered ? <MaterialIcon name='check' style={{ color: 'green'}}/> : <MaterialIcon name='close' style={{ color: 'red'}}/>}
        {..._props}
      />
    );
  }
}
