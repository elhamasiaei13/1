import React from 'react';
import PropTypes from 'prop-types';
import {getUserQuestions} from './../Module';
import {connect} from 'react-redux';
import ListView from 'components/common/ListView';
import {Button, Card, Radio, Row, Col, Tooltip} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import uuidv1 from 'uuid/v1';
import moment from 'moment';


@autobind
/**
 *
 */
export default class Question extends React.PureComponent {
  static propTypes = {
    answer: PropTypes.object,
    position: PropTypes.object,
    period: PropTypes.object,
    evaluation360: PropTypes.object,
    question: PropTypes.object,
    questionnaire: PropTypes.object,
    index: PropTypes.number,
    onChange: PropTypes.func,
    rates: PropTypes.arrayOf(PropTypes.object),
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      value: props.answer && props.answer.rateId,
      done: props.answer && props.answer.done ? props.answer.done : '0',
    };
  }

  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.answer, this.props.answer)) {
      this.setState({value: np.answer && np.answer.rateId});
    }
  }

  _onChange(e) {
    const {onChange, question, answer, period, position, evaluation360, questionnaire} = this.props;
    this.setState({value: e.target.value}, () => {
      let data = {
        questionId: question && question.id,
        questionnaireId: questionnaire && questionnaire.id,
        periodId: period && period.id,
        rateId: e.target.value,
        responderPositionId: position && position.id,
        responderUserId: evaluation360 && evaluation360.responderUserId,
        receiverUserId: evaluation360 && evaluation360.assignedUserId,
        receiverPositionId: evaluation360 && evaluation360.assignedPositionId,
        date: moment().format('YYYY-MM-DD'),
        done: this.state.done,
      };
      if (answer && answer.id) {
        data = Object.assign({}, data, {id: answer && answer.id});
      }
      onChange(data);
    });
  }

  _renderItems(done, value) {
    let items = [];
    const {rates} = this.props;
    if (rates) {
      rates.map((item) => {
        items.push(
          <Radio
            key={uuidv1()}
            disabled={done !== '0'}
            value={item.id}
          >
            {app.translate(`routes.home.evaluation-360.${item.title}`, `${item.title}`)}
          </Radio>,
        );
      });
    }

    return items;
  }

  /**
   *
   * @function render
   * @return {XML}
   */
  render() {
    const {question, index} = this.props;
    const {value, done} = this.state;
    let text = question && question.category && question.category.id ? question.category.title : '';
    return (
      <Row key={uuidv1()}
           gutter={16}
           style={{
             borderBottom: '1px solid #e1e1e1',
             padding: '10px',
           }}
           className='question'
      >
        <Col sm={14}>
          <b title={`${text}`}>{index} .</b> {question.title}
        </Col>
        <Col sm={10}>
          <Radio.Group disabled={done !== '0'} onChange={(v) => this._onChange(v)} value={value}>
            {this._renderItems(done, value)}
          </Radio.Group>
        </Col>
      </Row>
    );
  }
}
