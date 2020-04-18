import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {showQuestionnaireReport, emptyQuestionnaireReport} from './../Module';
import {indexUserLevels, indexRates} from '../../QuestionCategory/Module';
import {connect} from 'react-redux';
import TimePicker from 'components/common/TimePicker';
import Print from 'components/common/Print';
import uuidv1 from 'uuid/v1';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  questionnaireReport: state.Evaluation360.Question.Questionnaire.questionnaireReport,
  userLevels: state.Evaluation360.Question.QuestionCategory.userLevels,
  rates: state.Evaluation360.Question.QuestionCategory.rates,
}), {
  indexUserLevels,
  indexRates,
  showQuestionnaireReport,
  emptyQuestionnaireReport,
})
@autobind
/**
 *
 */
export default class Info extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    showQuestionnaireReport: PropTypes.func,
    emptyQuestionnaireReport: PropTypes.func,
    item: PropTypes.object,
    questionnaireReport: PropTypes.object,
    indexUserLevels: PropTypes.func,
    indexRates: PropTypes.func,
    userLevels: PropTypes.array,
    rates: PropTypes.array,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      receiving: true,
      loading: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexUserLevels, indexRates, showQuestionnaireReport, item} = this.props;

    if (item) {
      indexUserLevels();
      indexRates();
      showQuestionnaireReport(item.id, {}, () => {
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
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.item, this.props.item)) {
      this.setState({
        receiving: true,
      }, () => {
        if (np.item) {
          np.showQuestionnaireReport(np.item.id, {}, () => {
            this.setState({
              receiving: false,
            });
          });
        } else {
          this.setState({
            receiving: false,
          });
        }
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyQuestionnaireReport} = this.props;

    emptyQuestionnaireReport();
  }

  _print() {
    const {item, questionnaireReport} = this.props;
    let data = $('#infoQuestionnaire').html();
    let options = {
      pageTitle: `${app.translate('routes.home.evaluation-360.Questionnaire')}`,
      title: `${questionnaireReport && questionnaireReport.title}`,
      data: [`${data}`,],
      theme: 'question.print',
    };
    let rp = new Print(options);
    rp.print();
  }

  _questionnaireReport(questionnaireReport, rateId, userLevelId) {
    let item = questionnaireReport && questionnaireReport.find((item) => item.rateId === rateId && item.userLevelId === userLevelId);
    return item ? item.totalScore ? item.totalScore : '0' : '';
  }

  _renderItems(item, c1 = 4, c2 = 5) {
    const {userLevels, rates} = this.props;
    let items = [];
    if (userLevels && rates) {
      for (let i = 0; i < rates.length; i++) {
        let _row = [];
        let _head = [];
        for (let j = 0; j < userLevels.length; j++) {
          if (i === 0) {
            _head.push(
              <Col
                xs={c2}
                key={uuidv1()}>{app.translate(`routes.home.evaluation-360.${userLevels[j].title}`, `${userLevels[j].title}`)}</Col>);
          }
          if (j === 0) {
            _row.push(<Col xs={c1} key={uuidv1()}>{app.translate(`routes.home.evaluation-360.${rates[i].title}`, `${rates[i].title}`)}</Col>);
          }
          _row.push(<Col xs={c2} key={uuidv1()}>{this._questionnaireReport(item, rates[i].id, userLevels[j].id)}</Col>);
        }
        if (i === 0) {
          items.push(<Row key={uuidv1()}><Col xs={c1}>{app.translate('routes.home.evaluation-360.range')}</Col>{_head}</Row>);
        }
        items.push(<Row key={uuidv1()}>{_row}</Row>);
      }
    }

    return items;
  }

  _renderQuestionnaireReport(questionnaireReports = []) {
    let items;

    if (questionnaireReports && questionnaireReports[0]) {
      items = <div key={uuidv1()} style={{
        width: '70%',
        margin: '9px auto',
        border: '1px solid #ccc',
        padding: '5px',
      }}>
        <Row style={{borderBottom: '1px solid #ccc'}}>
          <Col xs={4}/>
          <Col xs={4}>ضریب سوال :</Col>
          <Col xs={6}>  {questionnaireReports[0].questionRatio}</Col>
          <Col xs={4}>{questionnaireReports[0].questionCategoryTitle}:</Col>
          <Col xs={6}> {questionnaireReports[0].pointScore}</Col>
        </Row>
        <Row gutter={16}>{this._renderItems(questionnaireReports)}</Row>
      </div>;
    }
    return items;
  }

  _renderQuestion() {
    let items = [];
    const {questionnaireReport} = this.props;
    if (questionnaireReport && questionnaireReport.questions) {
      questionnaireReport.questions.map((item, index) => {
        items.push(
          <Col key={uuidv1()}>
            <b>{index + 1}.</b> {item.title}
            <br/>
            {this._renderQuestionnaireReport(item.questionnaireReports)}
            <hr style={{
              border: '0px',
              borderBottom: '1px dashed #ccc',
              width: '70%',
              margin: '10px auto',
            }}/>
          </Col>,
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
    const {receiving} = this.state;
    const {onCancel, questionnaireReport} = this.props;
    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >

        <Card
          className="wrapper"
          title={`${questionnaireReport && questionnaireReport.title ? questionnaireReport.title : '-'}`}
          extra={
            <Button.Group>
              <Button
                type="danger"
                onClick={onCancel}
              >
                {app.translate('main.Cancel')}
              </Button>
              <Button key="print" onClick={() => this._print()}>
                {app.translate('main.Print')}
              </Button>,
            </Button.Group>
          }
        >
          <Row
            gutter={16}
            style={{
              height: '100%',
              margin: 0,
            }}
            id="infoQuestionnaire"
          >
            {this._renderQuestion()}
          </Row>
        </Card>

      </Spin>
    );
  }
}
