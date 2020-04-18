import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {index} from '../../../QuestionCategory/Module';
import {connect} from 'react-redux';
import uuidv1 from 'uuid/v1';

@connect((state) => ({
  questionCategories: state.Evaluation360.Question.QuestionCategory.questionCategories,
}), {
  index,
})
@autobind
/**
 *
 */
export default class Info extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    item: PropTypes.object,
    questionnaireId: PropTypes.number,
    action: PropTypes.string,
    onSubmit: PropTypes.func,

    index: PropTypes.func,
    questionCategories: PropTypes.arrayOf(PropTypes.object),
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
    const {index, item} = this.props;
    index();
  }

  _category(id) {
    let item = this.props.questionCategories.find((item) => item.id === id);

    return item && item.title ? item.title : '';
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, question} = this.state;
    const {onCancel} = this.props;

    return (
      <Modal
        title={app.translate('routes.home.evaluation-360.question info')}
        confirmLoading={loading}
        visible={true}
        footer={[
          <Button key="btnCancel" onClick={() => {
            onCancel();
          }}>{app.translate('main.Close')}</Button>,
        ]}
        closable={false}
        onCancel={() => {
          onCancel();
        }}
      >
        <AntdForm.Item
          label={app.translate('routes.home.evaluation-360.Question Category')}
        >
          {question.category ? question.category.title : this._category(text)}
        </AntdForm.Item>
        <AntdForm.Item
          label={app.translate('routes.home.evaluation-360.Question')}
        >
          {question.title}
        </AntdForm.Item>
      </Modal> );
  }
}