import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {indexSetting, emptySettingResponder, updateSetting} from './../Module';
import {connect} from 'react-redux';
import Avatar from 'components/common/Avatar';
import Chip from 'components/common/Chip';
import uuidv1 from 'uuid/v1';
import PersonnelList from 'routes/Home/Basic/Personnel/List';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  questionnaireAssignment: state.Evaluation360.Question.Questionnaire.questionnaireAssignmentResponder,
}), {
  indexSetting,
  emptySettingResponder,
  updateSetting,
})
@autobind
/**
 *
 */
export default class Setting extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    indexSetting: PropTypes.func,
    emptySettingResponder: PropTypes.func,
    item: PropTypes.object,
    user: PropTypes.object,
    questionnaireAssignment: PropTypes.array,
    questionnaire: PropTypes.object,
    updateSetting: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      questionnaire: {},
      questionnaireAssignment: [],
      statuses: [],
      showAddForm: false,
      error: {},
      receiving: true,
      loading: false,
      saving: false,
      type: '',
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexSetting, item, user} = this.props;
    if (item && item.id && user && user.id) {
      indexSetting('responder', {
        includes: ['responder_user.profile'],
        filterGroups: [
          {
            filters: [
              {
                key: 'assigned_user_id',
                value: [user ? user.id : 0],
                operator: 'in',
              },
              {
                key: 'questionnaire_id',
                value: [item ? item.id : 0],
                operator: 'in',
              },
            ],
          },
        ],
        groupBy: 'responder_user_id',
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
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (
      !app._.isEqual(np.item, this.props.item) ||
      !app._.isEqual(np.user, this.props.user)
    ) {
      this.setState({
        receiving: true,
      }, () => {
        if (np.item) {
          np.indexSetting('responder', {
            includes: ['responder_user.profile'],
            filterGroups: [
              {
                filters: [
                  {
                    key: 'assigned_user_id',
                    value: [np.user ? np.user.id : 0],
                    operator: 'in',
                  },
                  {
                    key: 'questionnaire_id',
                    value: [np.item ? np.item.id : 0],
                    operator: 'in',
                  },
                ],
              },
            ],

            groupBy: 'responder_user_id',
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
      });
    }
    if (!app._.isEqual(np.questionnaireAssignment, this.state.questionnaireAssignment)) {
      this.setState({
        questionnaireAssignment: np.questionnaireAssignment,
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptySettingResponder} = this.props;

    emptySettingResponder();
  }


  /**
   *
   * @private
   */
  _submit() {
    const {questionnaireAssignment} = this.state;
    const {updateSetting, onCancel, item, user} = this.props;

    this.setState({
      saving: true,
    }, () => {
      let _questionnaire = {};

      let _questionnaireAssignment = [];
      if (questionnaireAssignment) {
        questionnaireAssignment.map((item) => {
          if (item.responderUser && item.responderUser.id) {
            _questionnaireAssignment.push({
              responder_user_id: item.responderUser.id,
              type: item.type,

            });
          }
        });
      }
      _questionnaire.questionnaireId = item.id;
      _questionnaire.assignedUserId = user.id;
      _questionnaire.assigns = _questionnaireAssignment;
      if (item.id) {
        updateSetting(item.id, _questionnaire, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      }
    });
  }

  _remove(item) {
    let {questionnaireAssignment} = this.state;
    this.setState({
      receiving: true,
    }, () => {
      if (questionnaireAssignment) {
        let index = questionnaireAssignment.findIndex((_item) => _item.id === item.id);

        if (index > -1) {
          questionnaireAssignment.splice(index, 1);
          this.setState({
            questionnaireAssignment,
          });
        }
      }
      this.setState({
        receiving: false,
      });
    });
  }

  _chips(questionnaireAssignment) {
    let _items = [];
    if (questionnaireAssignment && questionnaireAssignment[0]) {
      questionnaireAssignment.map((item) => {
        _items.push(<Chip key={uuidv1()}>
          <Avatar
            src={item.responderUser && item.responderUser.profile && item.responderUser.profile.avatar}
            text={`${item.responderUser && item.responderUser.profile && item.responderUser.profile.firstName} ${item.responderUser && item.responderUser.profile && item.responderUser.profile.lastName}`}
          />
          {`${item.responderUser && item.responderUser.profile && item.responderUser.profile.firstName} ${item.responderUser && item.responderUser.profile && item.responderUser.profile.lastName} (${(item.type === 'parent' ?
            app.translate('routes.home.evaluation-360.Manager') :
            item.type === 'sibling' ?
              app.translate('routes.home.evaluation-360.Colleague') :
              item.type === 'contact' ?
                app.translate('routes.home.evaluation-360.Contact') :
                app.translate('routes.home.evaluation-360.Employee'))})`}
          <MaterialIcon
            name="close-circle"
            onClick={() => this._remove(item)}
          />
        </Chip>);
      });
    }
    if (_items && _items[0]) {
      return _items;
    }
    return '';
  }

  _AddChip() {
    let {questionnaireAssignment, type} = this.state;
    let users = this.personnelList.selectedRows();
    if (type !== '') {
      this.setState({
        receiving: true,
      }, () => {
        let index = -1;
        if (questionnaireAssignment) {
          users.map((user) => {
            // index = questionnaireAssignment.findIndex((_item) => _item.responderUser.id === user.id);
            // if (index > -1) {
            //   questionnaireAssignment.splice(index, 1);
            // }
            questionnaireAssignment.push({type, responderUser: user});
          });
        }
        this.setState({
          questionnaireAssignment,
          type: '',
        });
        this.setState({
          receiving: false,
          modal: false,
        });
      });
    }
  }

  _cancel() {
    this.setState({modal: false});
  }

  _add() {
    this.setState({modal: true, type: ''});
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading, type, modal, saving, receiving, questionnaire, statuses, events, showAddForm, error, questionnaireAssignment} = this.state;

    const {onCancel, item, user} = this.props;
    
    return (

      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >
        <Card
          className="wrapper"
          title={`${item.title} - ${user && user.profile && user.profile.firstName} ${user && user.profile && user.profile.lastName}`}
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
                onClick={() => {
                  this._add();
                }}
              >
                {app.translate('main.Add')}
              </Button>
              <Button
                type="primary"
                loading={saving}
                onClick={() => this._submit()}
              >
                {app.translate('main.Submit')}
              </Button>
            </Button.Group>
          }
        >
          <div
            style={{
              height: '98%',
              margin: 0,
            }}
          >
            {
              this._chips(questionnaireAssignment)
            }
          </div>
        </Card>
        {
          modal &&
          <Modal
            onOk={this._AddChip}
            onCancel={this._cancel}
            okText={app.translate('main.Add')}
            cancelText={app.translate('main.Cancel')}
            visible={modal}
            title={`${app.translate('main.Add')} ${app.translate('routes.home.evaluation-360.User')}`}
          >
            <AntdForm.Item
              label={app.translate('routes.home.evaluation-360.type', 'type')}
              help={type === '' && app.translate('main.This field is required')}
              validateStatus={type === '' ? 'error' : ''}
              required
              hasFeedback
            >
              {
                <Select
                  style={{
                    width: '100%',
                  }}
                  onChange={(event) => this.setState({
                    type: event,
                  })}
                >
                  <Select.Option value="parent">{app.translate('routes.home.evaluation-360.Manager', 'Manager')}</Select.Option>
                  <Select.Option value="sibling">{app.translate('routes.home.evaluation-360.Colleague', 'Colleague')}</Select.Option>
                  <Select.Option value="child">{app.translate('routes.home.evaluation-360.Employee', 'Employee')}</Select.Option>
                  <Select.Option value="contact">{app.translate('routes.home.evaluation-360.Contact', 'Contact')}</Select.Option>
                </Select>
              }
            </AntdForm.Item>
            <AntdForm.Item
              label={app.translate('routes.home.evaluation-360.User', 'User')}
              inline={true}
            >

              <PersonnelList
                reference={(input) => this.personnelList = input}
                selected={[]}
                users={[]}
                deletable={false}
              />
            </AntdForm.Item>
          </Modal>
        }
      </Spin>
    );
  }
}