import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, InputNumber, Input, Select, Modal} from 'antd';
import {index} from '../../../QuestionCategory/Module';
import {showQuestion, emptyQuestion} from '../../Module';
import {indexRates} from '../../../QuestionCategory/Module';
import {connect} from 'react-redux';
import uuidv1 from 'uuid/v1';

@connect((state) => ({
  questionCategories: state.Evaluation360.Question.QuestionCategory.questionCategories,
  question: state.Evaluation360.Question.Questionnaire.question,
  rates: state.Evaluation360.Question.QuestionCategory.rates,
}), {
  index,
  showQuestion,
  indexRates,
  emptyQuestion,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    item: PropTypes.object,
    question: PropTypes.object,
    showQuestion: PropTypes.func,
    questionnaireId: PropTypes.number,
    action: PropTypes.string,
    onSubmitTouch: PropTypes.func,
    emptyQuestion: PropTypes.func,
    index: PropTypes.func,
    questionCategories: PropTypes.arrayOf(PropTypes.object),
    rates: PropTypes.arrayOf(PropTypes.object),
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      question: props.item ? props.item : {},
      error: [],
    };
  }


  /**
   *
   */
  componentDidMount() {
    const {index, showQuestion, indexRates, emptyQuestion, item} = this.props;
    index();
    indexRates();
    if (item && item.id) {
      emptyQuestion();
      showQuestion(item.id, {includes: ['category', 'options']});
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.item, this.props.item)) {
      if (np.item && np.item.id) {
        np.emptyQuestion();
        np.showQuestion(np.item.id, {includes: ['category', 'options']});
      }
    }
    if (!app._.isEqual(np.question, this.state.question)) {
      this._setData(np.question);
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyQuestion} = this.props;
    emptyQuestion();
  }

  _setData(question) {
    let _score = {};
    if (question && question.options) {
      question.options.map((item) => {
        _score[`${item.rateId}`] = typeof item.score !== `undefined` ? `${item.score}` : '';
      });
    }
    this.setState({
      question: Object.assign({}, question, {score: _score}, {ratio: typeof question.ratio !== `undefined` ? `${question.ratio}` : ''}),
    });
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _renderSelect() {
    let option = [];
    const {questionCategories} = this.props;
    questionCategories.map((questionCategorie) => {
      option.push(<Select.Option key={uuidv1()} value={`${questionCategorie.id}`}>{questionCategorie.title}</Select.Option>);
    });
    return option;
  }

  _sendData() {
    const {onSubmitTouch, questionnaireId} = this.props;
    const {question} = this.state;
    let data = {
      questionnaireId: questionnaireId,
      title: question.title,
      questionCategoryId: question.questionCategoryId,
      score: question.score,
      ratio: question.ratio,
    };
    onSubmitTouch(data);
  }

  onChange(value, name) {
    let {question, error} = this.state;
    let score = question.score ? question.score : {};
    let rateError = error.score ? error.score : {};
    score[name] = typeof value !== 'undefined' && `${value}`;
    rateError[name] = value === '';
    this.setState({
      question: {
        ...question,
        score,
      },
      error: {
        ...error,
        score: rateError,
      },
    });
  }

  onBlur(e, name) {
    let {question, error} = this.state;
    let rateError = error.score ? error.score : {};
    let score = question.score ? question.score : {};
    let value = `${e.target.value}`;
    score[name] = value;
    rateError[name] = score[name] === '' || !score[name];
    this.setState((state) => ({
      question: {
        ...question,
        score,
      },
      error: {
        ...state.error,
        score: rateError,
      },
    }));
  }

  checkRateError(question) {
    let flag = false;
    const {error} = this.state;
    const {rates} = this.props;
    let rateError = [];
    if (error && error.score) {
      rates.map((item) => {
        if (!(question && question.score && question.score[item.id] && question.score[item.id] !== '')) {
          rateError[item.id] = true;
          flag = true;
        } else {
          if (!question || !question.score || (question && question.score && (!question.score[item.id] || question.score[item.id] === '') && typeof error.score[item.id] === 'undefined') || error.score[item.id]) {
            rateError[item.id] = true;
            flag = true;
          }
        }
      });
      this.setState((state) => ({
        error: {
          ...state.error,
          score: rateError,
        },
      }));
      return flag;
    } else {
      rates.map((item) => {
        if (!(question && question.score && question.score[item.id] && question.score[item.id] !== '')) {
          rateError[item.id] = true;
          flag = true;
        }
      });
      this.setState((state) => ({
        error: {
          ...state.error,
          score: rateError,
        },
      }));
      return flag;
    }
    return true;
  }

  errorRate() {
    let rateError = [];
    const {rates} = this.props;
    rates.map((item) => {
      rateError[item.id] = true;
    });
    this.setState((state) => ({
      error: {
        ...state.error,
        score: rateError,
      },
    }));
  }

  _renderFactor(formItemLayout) {
    let items = [];
    const {question, error} = this.state;
    const {rates} = this.props;
    if (rates) {
      rates.map((item) => {
        items.push(
          <AntdForm.Item
            key={`${item.id}`}
            label={app.translate(`routes.home.evaluation-360.${item.title}`, `${item.title}`)}
            help={error.score && error.score[item.id] && app.translate('main.This field is required')}
            validateStatus={error.score && error.score[item.id] ? 'error' : ''}
            required
            inline={true}
            {...formItemLayout}
          >
            <InputNumber
              value={question.score && question.score[item.id] ? question.score[item.id] : ''}
              style={{
                width: '100%',
                direction: 'ltr',
              }}
              onChange={(value) => this.onChange(value, item.id)}
              onBlur={(value) => this.onBlur(value, item.id)}
            />
          </AntdForm.Item>,
        );
      });
    }
    return items;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, receiving, question, title, questionCategories, error} = this.state;
    const {onCancel, action} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
    };
    return (
      <Modal
        title={app.translate('routes.home.evaluation-360.question form')}
        confirmLoading={loading}
        visible={true}
        footer={[
          <Button key="btnCancel" onClick={() => {
            onCancel();
          }}>{app.translate('main.Cancel')}</Button>,
          <Button type='primary' key="btnSubmit" onClick={() => {
            if (!error.title && !error.questionCategoryId && !error.ratio) {
              if (question.title && question.questionCategoryId && question.ratio && !this.checkRateError(question)) {
                this._sendData();
              } else {
                if (!question.title) {
                  this.setState((state) => ({
                    error: {
                      ...state.error,
                      title: true,
                    },
                  }));
                }
                if (!question.questionCategoryId) {
                  this.setState((state) => ({
                    error: {
                      ...state.error,
                      questionCategoryId: true,
                    },
                  }));
                }
                if (!question.ratio) {
                  this.setState((state) => ({
                    error: {
                      ...state.error,
                      ratio: true,
                    },
                  }));
                }
                if (!question.score) {
                  this.errorRate();
                }
              }
            }
          }}>{action === 'add' ? app.translate('main.Add') : app.translate('main.Submit')}</Button>,
        ]}
        closable={false}
        onCancel={() => {
          onCancel();
        }}
      >

        <AntdForm.Item
          label={app.translate('routes.home.evaluation-360.Question Category')}
          help={error.questionCategoryId && app.translate('main.This field is required')}
          validateStatus={error.questionCategoryId ? 'error' : ''}
          required
          {...formItemLayout}
          inline={true}
        >
          <Select
            style={{
              width: '100%',
            }}
            value={question.questionCategoryId && `${question.questionCategoryId}`}
            onChange={(value) => this.setState({
              question: {
                ...question,
                questionCategoryId: value,
              },
              error: {
                ...error,
                questionCategoryId: value === '',
              },
            })}
            onBlur={() => this.setState((state) => ({
              error: {
                ...state.error,
                questionCategoryId: question.questionCategoryId === '' || !question.questionCategoryId,
              },
            }))}
          >
            {this._renderSelect()}
          </Select>
        </AntdForm.Item>
        <AntdForm.Item
          label={app.translate('routes.home.evaluation-360.Question')}
          help={error.title && app.translate('main.This field is required')}
          validateStatus={error.title ? 'error' : ''}
          required
          {...formItemLayout}
        >
          <Input.TextArea
            value={question.title}
            onChange={(event) => this.setState({
              question: {
                ...question,
                title: event.target.value,
              },
              error: {
                ...error,
                title: event.target.value === '',
              },
            })}
            onBlur={() => this.setState((state) => ({
              error: {
                ...state.error,
                title: question.title === '' || !question.title,
              },
            }))}
            style={{
              maxHeight: 46,
            }}
          />
        </AntdForm.Item>

        <AntdForm.Item
          label={app.translate('routes.home.evaluation-360.Question Factor')}
          help={error.ratio && app.translate('main.This field is required')}
          validateStatus={error.ratio ? 'error' : ''}
          required
          inline={true}
          {...formItemLayout}
        >
          <InputNumber
            value={question.ratio ? question.ratio : ''}
            style={{
              width: '100%',
              direction: 'ltr',
            }}
            onChange={(value) => this.setState({
              question: {
                ...question,
                ratio: typeof value !== 'undefined' && `${value}`,
              },
              error: {
                ...error,
                ratio: value === '',
              },
            })}
            onBlur={() => this.setState((state) => ({
              error: {
                ...state.error,
                ratio: question.ratio === '' || !question.ratio,
              },
            }))}
          />
        </AntdForm.Item>
        <fieldset>
          <legend>{app.translate('routes.home.evaluation-360.Factor')}</legend>
          {this._renderFactor(formItemLayout)}
        </fieldset>
      </Modal> );
  }
}