import React from 'react';
import PropTypes from 'prop-types';
import {store, update, getUserQuestions, emptyUserQuestions, getUserAnswer, emptyUserAnswer} from './../Module';
import {connect} from 'react-redux';
import ListView from 'components/common/ListView';
import {Button, Card, Radio, Row, Col, Modal} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import Question from './Question';

@connect((state) => ({
  questions: state.Evaluation360.Evaluation.questions,
  userAnswers: state.Evaluation360.Evaluation.userAnswers,
  questionsMeta: state.Evaluation360.Evaluation.questionsMeta,
}), {
  getUserQuestions,
  emptyUserAnswer,
  getUserAnswer,
  emptyUserQuestions,
  store,
  update,
})

@autobind
/**
 *
 */
export default class Questions extends React.PureComponent {
  static propTypes = {
    position: PropTypes.object,
    period: PropTypes.object,
    questionnaire: PropTypes.object,
    evaluation360: PropTypes.object,
    questions: PropTypes.arrayOf(PropTypes.object),
    rates: PropTypes.arrayOf(PropTypes.object),
    questionsMeta: PropTypes.object,
    getUserQuestions: PropTypes.func,
    getUserAnswer: PropTypes.func,
    emptyUserAnswer: PropTypes.func,
    emptyUserQuestions: PropTypes.func,
    onCancel: PropTypes.func,
    store: PropTypes.func,
    update: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      items: [],
      disabled: true,
      done: '0',
    };
  }

  /**
   *
   */
  componentDidMount() {
    let questionnaireId = this.props.questionnaire && this.props.questionnaire.id;
    this._onReload(questionnaireId);
  }

  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.period, this.props.period) || !app._.isEqual(np.questionnaire, this.props.questionnaire)) {
      let questionnaireId = np.questionnaire && np.questionnaire.id;
      this._onReload(questionnaireId);
    }
    if (!app._.isEqual(np.userAnswers, this.props.userAnswers)) {
      let done = np.userAnswers && np.userAnswers[0] && np.userAnswers[0].done ? np.userAnswers[0].done : '0';
      this.setState({items: np.userAnswers, done});
    }
    if (!app._.isEqual(np.questions, this.props.questions)) {
      let disabled = !(this.state.items && np.questions && this.state.items.length === np.questions.length);
      this.setState({disabled});
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyUserAnswer, emptyUserQuestions} = this.props;

    emptyUserQuestions();
    emptyUserAnswer();
  }

  /**
   * @param {Number} questionnaireId
   * @private
   */
  _onReload(questionnaireId) {
    const {getUserQuestions, getUserAnswer, questionnaire, period, position, evaluation360} = this.props;
    this.setState({loading: true}, () => {
        getUserAnswer({
          filterGroups: [{
            filters: [{
              key: 'questionnaire_id',
              value: questionnaire && questionnaire.id,
              operator: 'eq',
            }, {
              key: 'period_id',
              value: period && period.id,
              operator: 'eq',
            }, {
              key: 'responder_position_id',
              value: position && position.id,
              operator: 'eq',
            }, {
              key: 'receiver_position_id',
              value: evaluation360 && evaluation360.assignedPositionId,
              operator: 'eq',
            }],
          }],
        }, () => {
          getUserQuestions(questionnaireId, {includes: ['category']}, (err) => !err && this.setState({loading: false}));
        });
      },
    );
  }

  _onChange(item) {
    let {items} = this.state;
    let {questions} = this.props;
    let index = items.findIndex((q) => q.questionId === item.questionId);
    if (index > -1) {
      items[index] = item;
    } else {
      items.push(item);
    }
    let disabled = !(items && questions && items.length === questions.length);
    this.setState({items, disabled});
  }

  _onSubmit(done, callback = () => {
  }) {
    let {items} = this.state;
    app._.map(items, (item) => {
      item['done'] = item['done'] && item['done'] === '1' ? item['done'] : done;
    });
    this.props.store(items);
    // if (this.props.userAnswers.length === 0) {
    // } else {
    //   this.props.update(items);
    // }
    callback();
  }

  _renderQuestions() {
    const {questions, period, evaluation360, questionnaire, position, rates} = this.props;
    let {items} = this.state;
    let _items = [];

    app._.map(questions, (question, index) => {
      let answer = items.find((q) => q.questionId === question.id);
      _items.push(
        <Question
          rates={rates}
          answer={answer}
          key={uuidv1()}
          index={index + 1}
          position={position}
          period={period}
          question={question}
          evaluation360={evaluation360}
          questionnaire={questionnaire}
          onChange={(v) => {
            this._onChange(v);
          }}
        />);
    });
    return _items;
  }

  /**
   *
   * @function render
   * @return {XML}
   */
  render() {
    const {questionnaire, evaluation360, onCancel} = this.props;
    const {items, disabled, done} = this.state;

    return (
      <Card
        title={
          <span>
            <MaterialIcon
              name={items && items[0] ? done === 1 ? 'check-all' : 'check' : 'close'}
              size='tiny'
              style={{color: (items && items[0] ? 'green' : 'red'), margin: '0px 8px'}}
              className='shadowIcon'
            />
            {questionnaire && questionnaire.title} -
            {evaluation360 && evaluation360.assignedUser && evaluation360.assignedUser.profile && `${evaluation360.assignedUser.profile.firstName} ${evaluation360.assignedUser.profile.lastName}`}
            ({(evaluation360.type === 'parent' ?
            app.translate('routes.home.evaluation-360.Employee') :
            evaluation360.type === 'sibling' ?
              app.translate('routes.home.evaluation-360.Colleague') :
              evaluation360.type === 'contact' ?
                app.translate('routes.home.evaluation-360.Contact') :
                app.translate('routes.home.evaluation-360.Manager'))})
        </span>
        }
        extra={[
          <Button.Group key='group1'>
            <Button key='btnCancel' onClick={() => {
              onCancel();
            }}>
              {app.translate('main.Cancel')}
            </Button>{/*
            <Button
              key='btnSubmit'
              type='primary'
              disabled={disabled || done !== '0'}
              onClick={() => {
                this._onSubmit('0');
              }}>
              {app.translate('main.Submit')}
            </Button>*/}
            <Button
              key='btnFinalSubmit'
              type='primary'
              disabled={disabled || done !== '0'}
              onClick={() => {

                let that = this;
                Modal.confirm({
                  title: app.translate('main.Final Submit'),
                  content: app.translate('routes.home.evaluation-360.do not change your answer after submit'),
                  okText: app.translate('main.Ok'),
                  cancelText: app.translate('main.Cancel'),
                  onOk() {
                    that._onSubmit('1', () => {
                      that.setState({done: '1'});
                    });
                  },
                  onCancel() {
                  },
                });
              }}>
              {app.translate('main.Submit')}
            </Button>
          </Button.Group>,
        ]}
      >
        {this._renderQuestions(items)}
      </Card>
    );
  }
}
