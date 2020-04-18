import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Form from './Form';
import Factor from './Factor';
import {emptyQuestionCategories} from './Module';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';

@authorize
@connect(null, {
  emptyQuestionCategories,
})
@autobind
/**
 *
 */
export default class QuestionCategory extends React.PureComponent {
  static propTypes = {
    emptyQuestionCategories: PropTypes.func,
    can: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      questionCategory: null,
      status: null,
    };
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyQuestionCategories();
  }

  /**
   *
   * @private
   */
  _onCancel() {
    this.setState({
      questionCategory: null,
      status: null,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {questionCategory, status} = this.state;
    const {can} = this.props;
    // console.log(questionCategory);
    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
          margin: 0,
        }}
      >
        {
          status !== 'editing' ?
        <Col
          md={8}
          style={{
            height: '100%',
          }}
        >
          <List
            statusForm={status}
            activeItem={questionCategory && questionCategory.id}
            onAdd={() => this.setState({status: 'editing'})}
            onClick={(questionCategory) => can('QuestionCategory@update') && this.setState({questionCategory, status: 'editing'})}
            onEdit={(questionCategory) => this.setState({questionCategory, status: 'editing'})}
            onCancel={this._onCancel}
          />
        </Col>
            :
          <Col
            md={8}
            style={{
              height: '100%',
            }}
          >
            <Form
              item={questionCategory}
              onCancel={this._onCancel}
            />
          </Col>
        }
        {/*
          status === 'editing' && questionCategory &&
          <Col
            md={16}
            style={{
              height: '100%',
            }}
          >
            <Factor
              item={questionCategory}
              onCancel={this._onCancel}
            />
          </Col>
        */}

      </Row>
    );
  }
}
