import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {indexSettingUser360, emptySettingUser360, updateSettingUser360} from '../Module';
import {connect} from 'react-redux';
import Avatar from 'components/common/Avatar';
import Chip from 'components/common/Chip';
import uuidv1 from 'uuid/v1';
import Positions from '../../Common/Positions';

jMoment.loadPersian({usePersianDigits: false});

@connect((state) => ({
  questionnaireAssignmentUser360: state.Evaluation360.Settings.Setting360.questionnaireAssignmentUser360,
}), {
  indexSettingUser360,
  emptySettingUser360,
  updateSettingUser360,
})
@autobind
/**
 *
 */
export default class Setting extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    indexSettingUser360: PropTypes.func,
    emptySettingUser360: PropTypes.func,
    item: PropTypes.object,
    user: PropTypes.object,
    questionnaireAssignmentUser360: PropTypes.array,
    questionnaire: PropTypes.object,
    updateSettingUser360: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      questionnaire: {},
      questionnaireAssignmentUser360: [],
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
    const {indexSettingUser360, item} = this.props;
    if (item && item.id) {
      indexSettingUser360({
       includes: ['responder_position.user.profile'],
        filterGroups: [
          {
            filters: [
              {
                key: 'assigned_position_id',
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
      !app._.isEqual(np.item, this.props.item)
    ) {
      this.setState({
        receiving: true,
      }, () => {
        if (np.item) {
          np.indexSettingUser360({
           includes: ['responder_position.user.profile'],
            filterGroups: [
              {
                filters: [
                  {
                    key: 'assigned_position_id',
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
    if (!app._.isEqual(np.questionnaireAssignmentUser360, this.state.questionnaireAssignmentUser360)) {
      this.setState({
        questionnaireAssignmentUser360: np.questionnaireAssignmentUser360,
      });
    }
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const {emptySettingUser360} = this.props;

    emptySettingUser360();
  }


  /**
   *
   * @private
   */
  _submit() {
    const {questionnaireAssignmentUser360} = this.state;
    const {updateSettingUser360, onCancel, item, user} = this.props;

    this.setState({
      saving: true,
    }, () => {
      let _questionnaire = {};

      let _questionnaireAssignmentUser360 = [];
      if (questionnaireAssignmentUser360) {
        questionnaireAssignmentUser360.map((item) => {
          if (item.responderPosition && item.responderPosition.id) {
            _questionnaireAssignmentUser360.push({
              responder_position_id: item.responderPosition.id,
              type: item.type,

            });
          }
        });
      }
      _questionnaire.assignedPositionId = item.id;
      _questionnaire.assigns = _questionnaireAssignmentUser360;
      if (item.id) {
        updateSettingUser360(_questionnaire, null, (err) => this.setState({saving: false}, () => !err && onCancel()));
      }
    });
  }

  _remove(item) {
    let {questionnaireAssignmentUser360} = this.state;
    this.setState({
      receiving: true,
    }, () => {
      if (questionnaireAssignmentUser360) {
        let index = questionnaireAssignmentUser360.findIndex((_item) => _item.id === item.id);

        if (index > -1) {
          questionnaireAssignmentUser360.splice(index, 1);
          this.setState({
            questionnaireAssignmentUser360,
          });
        }
      }
      this.setState({
        receiving: false,
      });
    });
  }

  _chips(questionnaireAssignmentUser360) {
    let _items = [];
    if (questionnaireAssignmentUser360 && questionnaireAssignmentUser360[0]) {
      questionnaireAssignmentUser360.map((item) => {
        _items.push(<Chip key={uuidv1()}>
          <Avatar
            src={item.responderPosition && item.responderPosition.user && item.responderPosition.user.profile && item.responderPosition.user.profile.avatar}
            text={`${item.responderPosition && item.responderPosition.user && item.responderPosition.user.profile && item.responderPosition.user.profile.firstName} ${item.responderPosition && item.responderPosition.user && item.responderPosition.user.profile && item.responderPosition.user.profile.lastName}`}
          />
          {`(${(item.type === 'parent' ?
            app.translate('routes.home.evaluation-360.Manager') :
            item.type === 'sibling' ?
              app.translate('routes.home.evaluation-360.Colleague') :
              item.type === 'contact' ?
                app.translate('routes.home.evaluation-360.Contact') :
                app.translate('routes.home.evaluation-360.Employee'))}) ${item.responderPosition && item.responderPosition.name} - ${item.responderPosition && item.responderPosition.user && item.responderPosition.user.profile && item.responderPosition.user.profile.firstName} ${item.responderPosition && item.responderPosition.user && item.responderPosition.user.profile && item.responderPosition.user.profile.lastName}`}
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
    let {questionnaireAssignmentUser360, type} = this.state;
    let users = this.personnelList.selectedRows();
    if (type !== '') {
      this.setState({
        receiving: true,
      }, () => {
        let index = -1;
        if (questionnaireAssignmentUser360) {
          users.map((user) => {
            // index = questionnaireAssignmentUser360.findIndex((_item) => _item.responderPosition.id === user.id);
            // if (index > -1) {
            //   questionnaireAssignmentUser360.splice(index, 1);
            // }
            questionnaireAssignmentUser360.push({type, responderPosition: user});
          });
        }
        this.setState({
          questionnaireAssignmentUser360,
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
    const {loading, type, modal, saving, receiving, questionnaire, statuses, events, showAddForm, error, questionnaireAssignmentUser360} = this.state;

    const {onCancel, item, user} = this.props;

    return (

      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >
        <Card
          className="wrapper"
          title={`${item.name} - ${item.user && item.user.profile ? item.user.profile.firstName : ''} ${item.user && item.user.profile ? item.user.profile.lastName : ''}`}
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
              this._chips(questionnaireAssignmentUser360)
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
            style={{
              height: '100%',
            }}
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
                </Select>
              }
            </AntdForm.Item>
            <AntdForm.Item
              label={app.translate('routes.home.evaluation-360.User', 'User')}
              inline={true}
            >

              <Positions
                type={['post']}
                reference={(input) => this.personnelList = input}
                selected={[]}
                users={[]}
                disabled={(_item) => {
                  return _item.id === item.id;
                }}
                deletable={false}
              />
            </AntdForm.Item>
          </Modal>
        }
      </Spin>
    );
  }
}