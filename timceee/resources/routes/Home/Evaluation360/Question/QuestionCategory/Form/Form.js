import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import TimeInput from 'components/form/TimeInput';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {show, emptyQuestionCategory, store, update} from './../Module';
import {connect} from 'react-redux';
import TimePicker from 'components/common/TimePicker';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  questionCategory: state.Evaluation360.Question.QuestionCategory.questionCategory,
}), {
  show,
  emptyQuestionCategory,
  store,
  update,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    show: PropTypes.func,
    emptyQuestionCategory: PropTypes.func,
    item: PropTypes.object,
    questionCategory: PropTypes.object,
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
      questionCategory: {},
      statuses: [],
      showAddForm: false,
      error: {},
      receiving: true,
      loading: false,
      saving: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {show, item} = this.props;

    if (item) {
      show(item.id, {}, () => {
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
          np.show(np.item.id, {}, () => {
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
    if (!app._.isEqual(np.questionCategory, this.state.questionCategory)) {
      this.setState({
        questionCategory: np.questionCategory,
        error: {
          title: !(np.questionCategory && np.questionCategory.title),
        },
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptyQuestionCategory} = this.props;

    emptyQuestionCategory();
  }


  /**
   *
   * @private
   */
  _submit() {
    const {questionCategory} = this.state;
    const {store, update, onCancel} = this.props;

    this.setState({
      saving: true,
    }, () => {
      let _questionCategory = {};
      _questionCategory.title = questionCategory.title;
      _questionCategory.description = questionCategory.description;
      if (questionCategory.id) {
        update(questionCategory.id, _questionCategory, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      } else {
        store(_questionCategory, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      }
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, saving, receiving, questionCategory, statuses, events, showAddForm, error} = this.state;
    const {onCancel} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.evaluation-360.QuestionCategory Form')}
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
                loading={saving}
                disabled={!(!error.title )}
                onClick={() => {
                  if (!error.title) {
                    if (questionCategory.title) {
                      this._submit();
                    } else {
                      if (!questionCategory.title) {
                        this.setState((state) => ({
                          error: {
                            ...state.error,
                            title: true,
                          },
                        }));
                      }

                    }
                  }
                }}
              >
                {app.translate('main.Submit')}
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
              <AntdForm.Item
                label={app.translate('routes.home.evaluation-360.QuestionCategory Name')}
                help={error.title && app.translate('main.This field is required')}
                validateStatus={error.title ? 'error' : ''}
                required
                hasFeedback
              >
                <Input
                  type="text"
                  prefix={<MaterialIcon name="alphabetical"/>}
                  value={questionCategory.title}
                  onChange={(event) => this.setState({
                    questionCategory: {
                      ...questionCategory,
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
                      title: questionCategory.title === '' || !questionCategory.title,
                    },
                  }))}
                />
              </AntdForm.Item>
            </Col>

            <Col
              sm={24}
            >
              <AntdForm.Item
                label={app.translate('routes.home.evaluation-360.QuestionCategory Description')}
              >
                <Input.TextArea
                  value={questionCategory.description}
                  onChange={(event) => this.setState({
                    questionCategory: {
                      ...questionCategory,
                      description: event.target.value,
                    },
                  })}
                  style={{
                    maxHeight: 46,
                  }}
                />
              </AntdForm.Item>
            </Col>
          </Row>
        </Card>

      </Spin>
    );
  }
}
