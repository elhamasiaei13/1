import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col, Checkbox, Select as AntdSelect, Form as AntdForm} from 'antd';
import {
  getRequest,
  getRequestFormFields,
  getRequestUserPositions,
  emptyRequestWrits,
  emptyRequest,
  emptyRequestFormField,
  emptyRequestUserPositions,
  getMissionRequests,
} from './../Module';
import PositionsList from 'routes/Home/Requests/Procedure/Form/Applicants';
import {
  getUserRequestTypes,
  getPositionRequestTypes,
  emptyUserRequestType,
  emptyPositionRequestType,
} from './../../../Dashboard/Module';
import {getUserInfo} from 'routes/Home/Basic/Personnel/Module';
import {Field, reduxForm, getFormValues, isPristine} from 'redux-form';
import {
  Text, TextArea, Date, Time, Cascader, Select, Number, File,
} from 'components/redux-form';
import Spin from 'components/common/Spin';
import validate from './validate';
import MaterialIcon from 'components/common/MaterialIcon';
import TimePicker from 'components/common/TimePicker';
import jMoment from 'moment-jalaali';
import uuidv1 from 'uuid/v1';
import {FormBuilder} from 'components/FormBuilder';
import {Types} from 'routes/General/Types';

@reduxForm({
  form: 'FormBuilder',
  validate,
  onSubmit: (values, dispatch, props) => {
    let _values = app._.clone(values);
    let field = ['positionId', 'typeId', 'values', 'description', 'sender'];
    _values.positionId = parseInt(_values.positionId);
    _values.typeId = _values.typeId[_values.typeId.length - 1];
    // _values.requestTypeId = _values.typeId;
    _values.sender.positionId = parseInt(_values.sender.positionId);
    for (let _value in _values) {
      if (!field.includes(_value)) {
        delete _values[_value];
      }
    }
    if (_values.values && Object.keys(_values.values).length > 0) {
      props.onSubmitTouch(_values);
    }
  },
})
@connect((state) => ({
  currentUser: state.Auth.currentUser,
  request: state.Requests.Box.Outbox.request,
  writs: state.Requests.Box.Outbox.writs,
  requestFormFields: state.Requests.Box.Outbox.requestFormFields,
  requestUserPositions: state.Requests.Box.Outbox.requestUserPositions,
  userOrPositionRequestTypes: state.Requests.Dashboard.userOrPositionRequestTypes,
  values: getFormValues('FormBuilder')(state),
  isPristine: isPristine('FormBuilder')(state),
}), {
  getRequest,
  getMissionRequests,
  getRequestFormFields,
  getRequestUserPositions,
  getPositionRequestTypes,
  getUserRequestTypes,
  emptyRequest,
  emptyRequestFormField,
  emptyRequestUserPositions,
  emptyUserRequestType,
  emptyPositionRequestType,
  emptyRequestWrits,
  getUserInfo,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    active: PropTypes.arrayOf(
      PropTypes.object,
    ),
    onSubmitTouch: PropTypes.func,
    onCancelTouch: PropTypes.func,
    getRequest: PropTypes.func,
    getRequestFormFields: PropTypes.func,
    getRequestUserPositions: PropTypes.func,
    getUserRequestTypes: PropTypes.func,
    getPositionRequestTypes: PropTypes.func,
    getMissionRequests: PropTypes.func,
    emptyRequestWrits: PropTypes.func,
    emptyUserRequestType: PropTypes.func,
    emptyPositionRequestType: PropTypes.func,
    emptyRequest: PropTypes.func,
    emptyRequestFormField: PropTypes.func,
    emptyRequestUserPositions: PropTypes.func,
    getUserInfo: PropTypes.func,
    visibility: PropTypes.bool,
    request: PropTypes.object,
    currentUser: PropTypes.object,
    requestFormFields: PropTypes.arrayOf(
      PropTypes.object,
    ),
    requestUserPositions: PropTypes.array,
    userOrPositionRequestTypes: PropTypes.array,
    // requestUserPositions: PropTypes.arrayOf(
    //   PropTypes.object,
    // ),
    values: PropTypes.object,
    submit: PropTypes.func,
    type: PropTypes.string,
    visible: PropTypes.bool,
  };

  static defaultProps = {};

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      disable: false,
      spinning: false,
      getData: false,
      requestTypes: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    let data = this._newData();
    this.props.initialize(data);
    this.setState({requestTypes: Types.items('Request')});
    if (this.props.currentUser && this.props.currentUser.positions && this.props.currentUser.positions.length < 2) {
      this.props.getRequestUserPositions();
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    //  console.log('np',np.values);
    let requestTypesParams = {};

    if (np.values) {
      if (
        (np.values.positionId && np.values.positionId === '0' ) ||
        (np.values.sender && np.values.sender.positionId && np.values.sender.positionId === '0')
      ) {
        if (this.state.disable === false) {
          this.setState({disable: true});
        }
      } else {
        if (this.state.disable === true) {
          this.setState({disable: false});
        }
      }
      if (np.values.sender && np.values.sender.positionId &&
        (
          !this.props.values ||
          !this.props.values.sender ||
          !app._.isEqual(this.props.values.sender.positionId, np.values.sender.positionId)
        )
      ) {
        np.getRequestUserPositions();
        this.setState({render: false});
      }

      if (np.values.positionId && np.values.positionId !== '0' && !this.state.getData &&
        (
          !np.values.typeId || !app._.isEqual(np.values.positionId, this.props.values.positionId)
        )
      ) {
        this.setState({getData: true, render: false}, () => {
          np.getUserRequestTypes(np.values.sender.userId, requestTypesParams, (err, res) => {
            if (app._.isEmpty(res.data.requestTypes)) {
              np.getPositionRequestTypes(np.values.positionId, requestTypesParams, (err, res) => {
                if (np.active[0] && np.active[0].id && !this.state.render) {
                  np.getRequest(np.active[0].id, {includes: ['values']}, (_res) => {
                    this.setState({render: true, spinning: false, getData: false});
                    let newData = this._newData(this.state.requestTypes, _res.data.request);
                    np.initialize(newData);
                  });
                } else {
                  this.setState({render: true, spinning: false, getData: false});
                }
              });
            } else {
              if (this.props.active[0] && this.props.active[0].id && !this.state.render) {
                this.props.getRequest(this.props.active[0].id, {includes: ['values']}, (res) => {
                  this.setState({render: true, spinning: false, getData: false});
                  let newData = this._newData(this.state.requestTypes, res.data.request);
                  np.initialize(newData);
                });
              } else {
                this.setState({render: true, spinning: false, getData: false});
              }
            }
          });
        });
      }

      if (np.values.typeId && this.props.values.typeId && this.props.values.typeId[0] && !app._.isEqual(np.values.typeId, this.props.values.typeId)) {
        np.initialize(Object.assign({}, np.values, {values: {}}));
      }
    }
    // if (np.currentUser.positions.length !== this.state.sender.userId) {
    //   this.setState({sender: Object.assign({}, this.state.sender, {userId: np.currentUser.id})});
    // }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
  }

  _newData(requestTypes = [], data = {}, currentUser = this.props.currentUser) {
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        if (i === 'typeId') {
          if (requestTypes && !Array.isArray(data[i])) {
            data[i] = this._getGroupIds(requestTypes, (data[i] ? data[i] : ''));
          }
        }
        if (i === 'positionId') {
          data[i] = data[i].toString();
        }
        if (i === 'datetime') {
          data['date'] = data[i].split(' ')[0];
          if (data[i].split(' ')[1]) {
            data['time'] = data[i].split(' ')[1];
          }
        }
        if (i === 'sender') {
          data[i]['positionId'] = data[i]['positionId'].toString();
        }
      }
    }
    if (!data['sender']) {
      data['sender'] = {userId: '', positionId: ''};
    }
    if (!data['sender']['userId']) {
      data['sender']['userId'] = currentUser.id;
    }
    if (currentUser.positions && currentUser.positions.length < 2) {
      if (!data['sender']['positionId']) {
        data['sender']['positionId'] = currentUser.positions.length === 1 ? currentUser.positions[0].id.toString() : '';
        data['positionId'] = currentUser.positions.length === 1 ? currentUser.positions[0].id.toString() : '0';
      }
    } else {
      if (!data['sender']['positionId']) {
        data['sender']['positionId'] = currentUser.positions && currentUser.positions.length > 1 ? currentUser.positions[0].id.toString() : '';
        data['positionId'] = currentUser.positions && currentUser.positions.length > 1 ? currentUser.positions[0].id.toString() : '0';
      }
    }
    return data;
  }


  /**
   *
   * @param {Object} items
   * @param {Object} key
   * @return {Object|undefined}
   */
  findObject(items, key) {
    let result = app._.find(items, key);
    let x;
    if (result === undefined) {
      for (x in items) {
        if (!app._.isEmpty(items[x].children)) {
          let result = this.findObject(items[x].children, key);
          if (result !== undefined) {
            return result;
          }
        }
      }
      return undefined;
    } else {
      return result;
    }
  }

  /**
   *
   * @param {Object[]} groups
   * @param {Number} group
   * @return {String[]}
   * @private
   */
  _getGroupIds(groups, group) {
    let _ids = [];

    groups.map((_group) => {
      if (_group.id === group) {
        _ids.push(_group.id);
      } else if (!app._.isEmpty(_group.children)) {
        let _id = this._getGroupIds(_group.children, group);
        if (_id.length > 0) {
          _ids.push(_group.id, ..._id);
        }
      }
    });

    return _ids;
  }

  _renderSenderPosition() {
    let select = [];
    let {currentUser} = this.props;
    let positionId = currentUser && currentUser.positions ? currentUser.positions.pluck('id') : [];
    let i = 0;
    if (currentUser && currentUser.positions && currentUser.profile) {
      app._.map(currentUser.positions, (position) => {
        i++;
        select.push(
          <AntdSelect.Option
            key={`sender_${position.id}`}
            value={`${position.id}`}
            style={{
              borderBottom: `1px solid #${positionId.length === i ? 'ccc' : 'f6f6f6'}`,
            }}
          >{position.name}
            <span
              className="select-span">{currentUser.profile.firstName} {currentUser.profile.lastName}</span>
          </AntdSelect.Option>,
        );
      });
    }
    return (
      <Field
        name={`sender['positionId']`}
        label={app.translate('routes.home.requests.Sender', 'Sender')}
        component={Select}
      >
        <AntdSelect.Option
          style={{
            borderBottom: '1px solid #ccc',
          }}
          value="0"
        >
          {app.translate('routes.home.requests.Select Position')}
        </AntdSelect.Option>
        {select}
      </Field>
    );
  }

  /**
   *
   * @param {Number} typeId
   * @return {boolean}
   * @private
   */
  _findRequestTypeAccess(typeId) {
    const {userOrPositionRequestTypes} = this.props;
    if (!app._.isEmpty(this.findObject(userOrPositionRequestTypes, {typeId: typeId}))) {
      return true;
    }
    if (!app._.isEmpty(this.findObject(userOrPositionRequestTypes, {id: typeId}))) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {Object[]} groups
   * @return {Object[]}
   * @private
   */
  _renderGroups(groups) {
    let _groups = [];
    groups.map((group) => {
      if (this._findRequestTypeAccess(group.id) || !group.rule) {
        let _group = {
          value: group.id,
          label: group.label,
          form: group.form,
        };

        if (!app._.isEmpty(group.children)) {
          _group.children = this._renderGroups(group.children);
        }
        _groups.push(_group);
      }
    });
    return _groups;
  }

  //
  // /**
  //  *
  //  * @return {XML}
  //  * @private
  //  */
  _renderSelectPosition(name = 'positionId', mode = undefined) {
    let select = [];

    let {currentUser} = this.props;
    let positionId = currentUser && currentUser.positions ? currentUser.positions.pluck('id') : [];
    const requestUserPositions = this.props.requestUserPositions;
    let i = 0;
    if (currentUser && currentUser.positions && currentUser.profile) {
      app._.map(currentUser.positions, (position) => {
        if (i === 0 && this.firstPosition === null) {
          this.firstPosition = position;
        }
        i++;
        select.push(
          <AntdSelect.Option
            key={`${name}${position.id}`}
            value={`${position.id}`}
            style={{
              borderBottom: `1px solid #${positionId.length === i ? 'ccc' : 'f6f6f6'}`,
            }}
          ><span
            className="select-span">{currentUser.profile.firstName} {currentUser.profile.lastName}</span>
            {position.name}
          </AntdSelect.Option>,
        );
      });
    }
    app._.map(requestUserPositions, (requestUserPosition) => {
      if (requestUserPosition.user && requestUserPosition.user.profile && positionId.indexOf(requestUserPosition.id) === -1) {
        select.push(
          <AntdSelect.Option
            key={`${name}${requestUserPosition.id}`}
            value={`${requestUserPosition.id}`}
            style={{
              borderBottom: '1px solid #f6f6f6',
            }}
          ><span
            className="select-span">{requestUserPosition.user.profile.firstName} {requestUserPosition.user.profile.lastName}</span>
            {requestUserPosition.name}
          </AntdSelect.Option>,
        );
      }
    });

    return (
      <Field
        name={name}
        label={app.translate('routes.home.requests.Owner', 'owner')}
        component={Select}
        mode={mode}
      >
        <AntdSelect.Option
          style={{
            borderBottom: '1px solid #ccc',
          }}
          value="0"
        >
          {app.translate('routes.home.requests.Select Position')}
        </AntdSelect.Option>
        {select}
      </Field>
    );
  }

  //
  // _onChange(key, value) {
  //   let values = app._.clone(this.props.values);
  //   values[key] = value;
  //   this.props.initialize(values);
  // }
  //
  // _dailyReport_onChange(key, value, day) {
  //   let values = app._.clone(this.props.values);
  //   let {dailyReport} = this.state;
  //   let _value = {};
  //   let index = dailyReport.findIndex((item) => {
  //     return item.date === day;
  //   });
  //   _value[key] = value;
  //   dailyReport[index] = Object.assign({}, dailyReport[index], _value);
  //   values['dailyReport'] = dailyReport;
  //   //
  //
  //   if (!(this.props.values && app._.isEqual(dailyReport, this.props.values.dailyReport) )) {
  //     this.setState({dailyReport}, () => {
  //       this.props.initialize(values);
  //     });
  //   }
  // }
  //
  // _dailyReport() {
  //   let children = [];
  //   let i = 0;
  //   let dateFromBack = this.props.values.dateFromBack;
  //   let dateToGoing = this.props.values.dateToGoing;
  //   let diff = jMoment(dateFromBack).diff(dateToGoing, 'day');
  //   let {dailyReport} = this.state;
  //   let day;
  //   if (dateFromBack && dateFromBack) {
  //     if (diff >= 0) {
  //       for (i = 0; i <= diff; i++) {
  //         day = jMoment(dateToGoing).add(i, 'day').format('jYYYY-jMM-jDD');
  //         if (!dailyReport[i] || dailyReport[i]['date'] !== day) {
  //           dailyReport[i] = {date: day, time_from: '', time_to: ''};
  //         }
  //         children.push(
  //           <Row key={`row_daily_report${i}`}
  //                style={{
  //                  padding: '2px 8px',
  //                }}>
  //             <Col sm={8} key={`col1_daily_report${i}`}>
  //               <div style={{
  //                 padding: '6px',
  //               }}>
  //                 {`${ i + 1 } ) `}{jMoment(dateToGoing).add(i, 'day').format('jYYYY-jMM-jDD')}
  //               </div>
  //             </Col>
  //             <Col sm={8} key={`col2_daily_report${i}`}>
  //               <div style={{
  //                 padding: '0px 8px',
  //               }}>
  //                 <TimePicker
  //                   placeholder="ساعت شروع کار"
  //                   name={day}
  //                   value={dailyReport[i] && dailyReport[i]['time_from']}
  //                   onChange={(value, name) => {
  //                     this._dailyReport_onChange(`time_from`, value, name);
  //                   }}
  //                 />
  //               </div>
  //             </Col>
  //             <Col sm={8} key={`col3_daily_report${i}`}>
  //               <div style={{
  //                 padding: '0px 8px',
  //               }}>
  //                 <TimePicker
  //                   placeholder="ساعت پایان کار"
  //                   name={day}
  //                   value={dailyReport[i] && dailyReport[i]['time_to']}
  //                   onChange={(value, name) => {
  //                     this._dailyReport_onChange('time_to', value, name);
  //                   }}
  //                 />
  //               </div>
  //             </Col>
  //           </Row>,
  //         );
  //       }
  //     } else {
  //       children.push(<Col sm={24} key={`daily_report${i}`}>تاریخ رسیدن از تاریخ برگشت بزرگتر است</Col>);
  //     }
  //   } else {
  //     children.push(<Col sm={24} key={`daily_report${i}`}>تاریخ رسیدن و تاریخ برگشت را وارد کنید</Col>);
  //   }
  //   return (<Row
  //     style={{
  //       padding: '8px 0px',
  //     }}
  //   >
  //     {children}
  //   </Row>);
  // }
  _getForm() {
    const {values} = this.props;
    let form = {};
    if (values && values.typeId) {
      let requestType = Types.findId(values.typeId[values.typeId.length - 1]);
      form = requestType && requestType.form ? requestType.form : {};
    }

    return form;
  }

  _renderSubstituteId(name, value, positionId, callback = () => {
  }) {
    if (name === 'substituteId') {
      console.log('0000', name, value, positionId);
      this.setState({substituteError: false, substituteName: null}, () => {
        if (value.length > 0) {
          this.props.getUserInfo(value, {includes: ['profile', 'positions']}, (res) => {
            let data = null;
            let positions = null;
            let index = -1;
            let error = false;
            if (res.data && res.data.user && res.data.user.profile && res.data.user.positions) {
              positions = res.data.user.positions.pluck('id', (item) => item.toString());
              index = positions.findIndex((item) => parseInt(item) === parseInt(positionId));
              if (index > -1) {
                error = true;
                data = `ارسال کننده و جانشین یکی هستند`;
              } else {
                error = false;
                data = `${res.data.user.profile.firstName} ${res.data.user.profile.lastName}`;
              }
            } else {
              error = true;
              data = 'یافت نشد';
            }
            this.setState({substituteName: data, substituteError: error});
          });
        }
      });
    }
    callback();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {
      currentUser,
      onCancelTouch, visible, title, submit, isPristine,
    } = this.props;

    const {disable, spinning} = this.state;
    let requestTypes = [];
    if (!app._.isEmpty(this.props.userOrPositionRequestTypes) && !app._.isEmpty(this.state.requestTypes)) {
      requestTypes = this._renderGroups(this.state.requestTypes);
    }

    return (
      <Modal
        title={title}
        visible={visible}
        maskClosable={isPristine}
        wrapClassName="vertical-center-modal"
        width='60%'
        onCancel={onCancelTouch}
        footer={[
          <Button key="back" size="large" onClick={onCancelTouch}>
            {app.translate('main.Cancel')}
          </Button>,
          <Button key="submit" type="primary"
                  disabled={disable || !(this.props.values && this.props.values.values && Object.keys(this.props.values.values).length > 0)}
                  size="large" onClick={() => {
            if (this.props.values && this.props.values.values && Object.keys(this.props.values.values).length > 0) {
              submit();
            }
          }}>
            {app.translate('main.Submit')}
          </Button>,
        ]}
      >
        <Spin
          spinning={spinning}
          style={{
            height: '100%',
          }}
          wrapperClassName='organizationChartLoading'
        >
          {
            <Row
              gutter={16}
              style={{
                minHeight: '300px',
              }}
            >
              {
                currentUser.positions.length > 1 &&
                <Col sm={24} md={8}>
                  {
                    this._renderSenderPosition()
                  }
                </Col>

              }
              {this.props.values && this.props.values.sender && this.props.values.sender.positionId && this.props.values.sender.positionId !== '0' &&
              <Col sm={24} md={currentUser.positions.length > 1 ? 8 : 12}>
                {
                  this._renderSelectPosition()
                }
              </Col>
              }
              {this.props.values &&
              this.props.values.sender &&
              this.props.values.sender.positionId &&
              this.props.values.sender.positionId !== '0' &&
              this.props.values.positionId &&
              this.props.values.positionId !== '0' &&
              <Col sm={24} md={currentUser.positions.length > 1 ? 8 : 12}>
                <Field
                  name="typeId"
                  label={app.translate('routes.home.requests.Request Type')}
                  component={Cascader}
                  required
                  items={requestTypes}
                />
              </Col>
              }
              {
                this.props.values &&
                this.props.values.typeId &&
                this.props.values.sender &&
                this.props.values.sender.positionId &&
                this.props.values.sender.positionId !== '0' &&
                this.props.values.positionId &&
                this.props.values.positionId !== '0' &&
                !app._.isEmpty(this.props.values.typeId) &&
                <Col sm={24} md={24}>
                  <FormBuilder
                    formFields={this._getForm()}
                    md={8}
                  />
                </Col>
              }
              <Col sm={24} md={24} key={`description`}>
                <Field
                  name="description"
                  label={app.translate(`routes.home.requestsDescription`, 'Description')}
                  component={TextArea}
                />
              </Col>
            </Row>
          }
        </Spin>
      </Modal>
    );
  }
}
