import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Form from './Form';
import Info from './Info';
import Setting from './Setting';
import Factor from './Setting/Factor';
import Personnel from './Setting/Personnel';
import Questions from './Questions';
import {emptyQuestionnaires} from './Module';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';
import ListCategory from './../QuestionCategory/List/ListWrapper';

@authorize
@connect(null, {
  emptyQuestionnaires,
})
@autobind
/**
 *
 */
export default class Questionnaire extends React.PureComponent {
  static propTypes = {
    emptyQuestionnaires: PropTypes.func,
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      questionnaire: null,
      questionCategory: null,
      status: null,
      user: null,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyQuestionnaires();
  }

  /**
   *
   * @private
   */
  _onCancel(callback = () => {
  }) {
    this.setState({
      questionnaire: null,
      questionCategory: null,
      user: null,
      status: null,
    }, callback);
  }

  /**
   *
   * @private
   */
  _onCancel2(callback = () => {
  }) {
    this.setState({
      user: undefined,
    }, callback);
  }

  /**
   *
   * @private
   */
  _onCancel3(callback = () => {
  }) {
    this.setState({
      questionCategory: undefined,
    }, callback);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {questionnaire, status, questionCategory, user} = this.state;
    const {can} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        {
          status !== 'editing' && status !== 'setting' && status !== 'settingQuestionnaire' && status !== 'info' &&
          <Col
            md={8}
            style={{
              height: '100%',
            }}
          >
            <List
              statusForm={status}
              activeItem={questionnaire && questionnaire.id}
              onAdd={() => this.setState({status: 'editing'})}
              onClick={(questionnaire) => can('Questionnaire@update') && this.setState({questionnaire, status: 'editing'})}
              onEdit={(questionnaire) => this.setState({questionnaire, status: 'editing'})}
              onSetting={(questionnaire, status) => this.setState({questionnaire, status})}
              onCancel={() => this._onCancel()}
            />
          </Col>
        }
        {status === 'editing' &&
        <Col
          md={8}
          style={{
            height: '100%',
          }}
        >
          <Form
            item={questionnaire}
            onCancel={() => this._onCancel()}
          />
        </Col>
        }
        {
          status === 'editing' && questionnaire &&
          <Col
            md={16}
            style={{
              height: '100%',
            }}
          >
            <Questions
              item={questionnaire}
              onCancel={() => this._onCancel()}
            />
          </Col>
        }
        {
          status === 'setting' &&
          <Col
            md={8}
            style={{
              height: '100%',
            }}
          >
            <Personnel
              item={questionnaire}
              reference={(input) => this.personnelList = input}
              activeItem={user && user.id}
              onClick={(user) => can('EvaluationContact@update') && this.setState({
                user,
              })}
              onCancel={() => this._onCancel()}
            />
          </Col>
        }
        {
          status === 'setting' && questionnaire && user &&
          <Col
            md={16}
            style={{
              height: '100%',
            }}
          >
            <Setting
              item={questionnaire}
              user={user}
              onCancel={() => this._onCancel2()}
            />
          </Col>
        }
        {status === 'settingQuestionnaire' && questionnaire &&
        <Col
          md={8}
          style={{
            height: '100%',
          }}
        >
          <ListCategory
            activeItem={questionCategory && questionCategory.id}
            onClick={(questionCategory) => can('Questionnaire@update') && this.setState({questionCategory})}
            onCancel={() => this._onCancel()}
          />
        </Col>
        }
        {status === 'settingQuestionnaire' && questionCategory && questionnaire &&
        <Col
          md={16}
          style={{
            height: '100%',
          }}
        >
          <Factor
            item={questionnaire}
            questionCategory={questionCategory}
            onCancel={() => this._onCancel3()}
          />
        </Col>
        }
        {status === 'info' && questionnaire &&
        <Col
          sm={24}
          style={{
            height: '100%',
          }}
        >
          <Info
            item={questionnaire}
            onCancel={() => this._onCancel()}
          />
        </Col>
        }

      </Row>
    );
  }
}
