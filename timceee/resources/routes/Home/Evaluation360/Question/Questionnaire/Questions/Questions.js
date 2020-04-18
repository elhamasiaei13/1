import React from 'react';
import Spin from 'components/common/Spin';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {indexQuestion, show, emptyQuestions, storeQuestion, updateQuestion, destroyQuestion} from './../Module';
import {index as getCategory} from '../../QuestionCategory/Module';
import {connect} from 'react-redux';
import QuestionTable from './Table/QuestionTable';
import Form from './Form/Form';
import Info from './Info/Info';

@connect((state) => ({
  questions: state.Evaluation360.Question.Questionnaire.questions,
  questionCategories: state.Evaluation360.Question.QuestionCategory.questionCategories,
}), {
  indexQuestion,
  show,
  emptyQuestions,
  storeQuestion,
  updateQuestion,
  destroyQuestion,
  getCategory,
})
@autobind
/**
 *
 */
export default class Questions extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    show: PropTypes.func,
    getCategory: PropTypes.func,
    emptyQuestions: PropTypes.func,
    item: PropTypes.object,

    indexQuestion: PropTypes.func,
    questionCategories: PropTypes.arrayOf(PropTypes.object),
    questions: PropTypes.arrayOf(PropTypes.object),
    storeQuestion: PropTypes.func,
    updateQuestion: PropTypes.func,
    destroyQuestion: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      question: {},
      showForm: false,
      showInfo: false,
      action: 'add',
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {show, emptyQuestions, indexQuestion, getCategory, item} = this.props;
    getCategory();

    if (item) {
      // emptyQuestions();
      indexQuestion({
        includes: ['category'], filterGroups: [{
          filters: [
            {
              key: `questionnaire_id`,
              value: item.id,
              operator: 'eq',
            },
          ],
        }],
      }, () => {
        this.setState({
          receiving: false,
        });
      });
    } else {
      this.setState({
        receiving: false,
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyQuestions} = this.props;

    emptyQuestions();
  }

  _form(type = 'add', questionId = null) {
    this.setState({showForm: true, action: type});
  }

  _onSelectItem(item, keyMenu) {
    const {destroyQuestion} = this.props;
    if (keyMenu.key === '1') {
      this.setState({
        showInfo: true,
        showForm: false,
        action: 'add',
        question: item && item[0] && item[0].id ? item[0] : {},
      });
    }
    if (keyMenu.key === '2') {
      this.setState({
        showInfo: false,
        showForm: true,
        action: 'edit',
        question: item && item[0] && item[0].id ? item[0] : {},
      });
    }
    if (keyMenu.key === '3') {
      Modal.confirm({
        title: app.translate('routes.home.evaluation-360.Removing Question'),
        content: app.translate('routes.home.evaluation-360.Are you sure about removing', {title: app.translate(`routes.home.evaluation-360.this Question`)}),
        onOk: () => destroyQuestion(item[0].id),
      });
    }
  }

  _onCancel() {
    this.setState({showForm: false, showInfo: false, question: {}});
  }

  _sendData(data, callback = () => {
  }) {
    const {storeQuestion, updateQuestion} = this.props;
    const {action, question} = this.state;
    if (action === 'add') {
      storeQuestion(data);
    } else {
      if (question && question.id) {
        updateQuestion(question.id, data);
      }
    }
    this._onCancel();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, receiving, question, action, showForm, showInfo} = this.state;
    const {onCancel, item, questions} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.evaluation-360.Questions')}
          extra={
            <Button.Group>
              <Button
                type="danger"
                onClick={onCancel}
                disabled={saving}
              >
                {app.translate('main.Cancel')}
              </Button>
              <Button
                type="primary"
                disabled={!(this.props.questionCategories.length > 0)}
                loading={saving}
                onClick={() => {
                  this._form();
                }}
              >
                {app.translate('main.Add')}
              </Button>
            </Button.Group>
          }
        >
          <Row
            gutter={16}
            style={{
              height: '100%',
              margin: 0,
            }}
          >
            <Col
              sm={24}
            >
              <QuestionTable
                questions={questions}
                onMenuTouch={this._onSelectItem}
              />
              {
                showForm && <Form
                  item={question}
                  questionnaireId={item && item.id}
                  action={action}
                  onSubmitTouch={this._sendData}
                  onCancel={this._onCancel}
                />
              }
              {
                showInfo && <Info
                  item={question}
                  onSubmit={this._sendData}
                  onCancel={this._onCancel}
                />
              }

            </Col>
          </Row>
        </Card>

      </Spin>
    );
  }
}
