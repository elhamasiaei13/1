import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col, Checkbox, Select as AntdSelect} from 'antd';
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
  getRequestTypes,
  getUserRequestTypes,
  getPositionRequestTypes,
  emptyUserRequestType,
  emptyPositionRequestType,
} from './../../../Dashboard/Module';
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

@reduxForm({
  form: 'request-outbox-form',
  validate,
  onSubmit: (values, dispatch, props) => {
    let _values = app._.clone(values);
    let field = ['positionId', 'requestTypeId', 'values', 'description'];
    _values.positionId = parseInt(_values.positionId);
    _values.requestTypeId = _values.requestTypeId[_values.requestTypeId.length - 1];
    _values['values'] = [];
    app._.map(_values['formField'], (requestFormField) => {
      if (_values[requestFormField.name]) {
        _values['values'].push({fieldId: requestFormField.id, value: _values[requestFormField.name]});
      }
    });
    for (let _value in _values) {
      if (!field.includes(_value)) {
        delete _values[_value];
      }
    }
    props.onSubmitTouch(_values);
  },
})
@connect((state) => ({
  currentUser: state.Auth.currentUser,
  request: state.Requests.Box.Outbox.request,
  writs: state.Requests.Box.Outbox.writs,
  requestFormFields: state.Requests.Box.Outbox.requestFormFields,
  requestUserPositions: state.Requests.Box.Outbox.requestUserPositions,
  requestTypes: state.Requests.Dashboard.requestTypes,
  userOrPositionRequestTypes: state.Requests.Dashboard.userOrPositionRequestTypes,
  values: getFormValues('request-outbox-form')(state),
  isPristine: isPristine('request-outbox-form')(state),
}), {
  getRequest,
  getMissionRequests,
  getRequestFormFields,
  getRequestUserPositions,
  getPositionRequestTypes,
  getUserRequestTypes,
  getRequestTypes,
  emptyRequest,
  emptyRequestFormField,
  emptyRequestUserPositions,
  emptyUserRequestType,
  emptyPositionRequestType,
  emptyRequestWrits,
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
    getRequestTypes: PropTypes.func,
    getPositionRequestTypes: PropTypes.func,
    getMissionRequests: PropTypes.func,
    emptyRequestWrits: PropTypes.func,
    emptyUserRequestType: PropTypes.func,
    emptyPositionRequestType: PropTypes.func,
    emptyRequest: PropTypes.func,
    emptyRequestFormField: PropTypes.func,
    emptyRequestUserPositions: PropTypes.func,
    visibility: PropTypes.bool,
    request: PropTypes.object,
    currentUser: PropTypes.object,
    requestFormFields: PropTypes.arrayOf(
      PropTypes.object,
    ),
    requestUserPositions: PropTypes.array,
    // requestUserPositions: PropTypes.arrayOf(
    //   PropTypes.object,
    // ),
    values: PropTypes.object,
    submit: PropTypes.func,
    type: PropTypes.string,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    item: [],
    title: '',
    visible: false,
    active: [],
    visibility: false,
    request: {},
    requestFormFields: [],
    requestUserPositions: [],
    onSubmitTouch: () => {
    },
    onCancelTouch: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      render: false,
      dailyReport: [],
      requestFormId: (props.active[0] && props.active[0].type ? props.active[0].type.formId : 0 ),
      requestType: (props.active[0] && props.values && props.values.requestTypeId ? props.values.requestTypeId : props.active[0] ? props.active[0].requestTypeId : []),
      disable: true,
      spinning: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.props.getRequestUserPositions();
    // this.props.getRequestFormFields();
    // this.props.getRequestTypes({
    //   includes: [
    //     'rule',
    //     'children',
    //     'children.children',
    //   ],
    //   filterGroups: [
    //     {
    //       filters: [
    //         {
    //           key: 'request_type_id',
    //           value: null,
    //           operator: 'eq',
    //         },
    //       ],
    //     },
    //   ],
    // });
    // this.props.initialize(Object.assign({}, {}, {formId: "0"}));
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    // console.log(np);
    let requestTypesParams = {
      includes: [
        'rule',
        'children',
        'children.children',
        'form.fields',
      ],
      filterGroups: [
        {
          filters: [
            {
              key: 'request_type_id',
              value: null,
              operator: 'eq',
            },
          ],
        },
      ],
    };


    if (
      (
        app._.isEmpty(np.values) ||
        app._.isEmpty(this.props.values) ||
        (
          !app._.isEmpty(this.props.values) &&
          !app._.isEqual(np.values.positionId, this.props.values.positionId)
        )
      ) &&
      // !app._.isEmpty(np.requestFormFields) &&
      !app._.isEmpty(np.requestUserPositions)
    ) {
      this.setState({spinning: true});
      np.emptyPositionRequestType();
      np.emptyUserRequestType();
      np.initialize(Object.assign({}, np.values, {requestTypeId: null}));
      let position = {};
      let positionId = !app._.isEmpty(np.values) && np.values.positionId ? np.values.positionId : !app._.isEmpty(np.active[0]) && np.active[0].positionId ? np.active[0].positionId : 0;
      np.requestUserPositions.map((_position) => {
        if (_position.id === parseInt(positionId)) {
          position = Object.assign({}, _position);
        }
      });
      // console.log('np',np, np.requestUserPositions, position.userId, requestTypesParams,);
      np.getUserRequestTypes(position.userId, requestTypesParams, (err, res) => {
        if (app._.isEmpty(res.data.requestTypes)) {
          np.getPositionRequestTypes(position.id, requestTypesParams, (err, res) => {
            if (this.props.active[0] && this.props.active[0].id && !this.state.render) {
              this.props.getRequest(this.props.active[0].id, {includes: ['values']}, (res) => {
                this.setState({render: true, spinning: false});
                let newData = this._getNewData(np.requestTypes, res.data.request, np.requestFormFields);
                np.initialize(newData);
              });
            } else {
              this.setState({render: true, spinning: false});
            }
          });
        } else {
          if (this.props.active[0] && this.props.active[0].id && !this.state.render) {
            this.props.getRequest(this.props.active[0].id, {includes: ['values']}, (res) => {
              this.setState({render: true, spinning: false});
              let newData = this._getNewData(np.requestTypes, res.data.request, np.requestFormFields);
              np.initialize(newData);
            });
          } else {
            this.setState({render: true, spinning: false});
          }
        }
        np.emptyRequestWrits();
        if (positionId != 0) {
          np.getMissionRequests(positionId);
        }
      });
    }

    if (np.values && this.props.values && np.values.requestTypeId && !app._.isEqual(np.values.requestTypeId, this.props.values.requestTypeId)) {
      let _findFormId = this._findFormId(np.values.requestTypeId[np.values.requestTypeId.length - 1]);
      let _requestFormFields = np.requestFormFields.filter((requestFormField) => requestFormField.formId === _findFormId);
      np.initialize(Object.assign({}, np.values, {formField: _requestFormFields}));
    }

    if (np.values && np.values.positionId !== '0' && !app._.isEmpty(np.values.requestTypeId)) {
      if (this.state.disable) {
        this.setState({disable: false});
      }
    } else {
      if (!this.state.disable) {
        this.setState({disable: (true && np.isPristine)});
      }
    }

  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyRequestFormField();
    this.props.emptyRequestUserPositions();
    this.props.emptyRequest();
  }

  /**
   *
   * @return {Number}
   * @private
   */
  _findFormId(_requestTypeId = 0) {
    const requestTypeId = _requestTypeId ? _requestTypeId : this.props.values && this.props.values.requestTypeId ? this.props.values.requestTypeId[this.props.values.requestTypeId.length - 1] : -1;
    const {requestTypes} = this.props;
    if (requestTypeId > 0) {
      let requestType = requestTypes.filter((_requestType) => {
        return _requestType.id === requestTypeId;
      });
      if (!app._.isEmpty(requestType[0])) {
        return requestType[0].formId;
      }
    }
    return requestTypeId;
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _getFormFields() {
    const {requestFormFields} = this.props;
    const formId = this._findFormId();
    let _requestFormFields = requestFormFields.filter((requestFormField) => requestFormField.formId === formId);
    return _requestFormFields;
  }

  _getNewData(requestTypes, data, requestFormFields) {
    const {requestTypesId} = this.state;

    for (let i in data) {
      if (data.hasOwnProperty(i)) {

        if (i === 'requestTypeId') {
          if (requestTypes && !Array.isArray(data[i])) {
            data[i] = this._getGroupIds(requestTypes, (data[i] ? data[i] : requestTypesId));
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
        if (i === 'values') {
          let values = [];
          app._.map(data[i], (_data) => {
            let key = _data['fieldId'].toString();
            values[key] = _data.value && _data.value.toString();
          });
          app._.map(requestFormFields, (requestFormField) => {
            if (!app._.isEmpty(values[requestFormField.id])) {
              if (requestFormField.name === 'date') {
                data[requestFormField.name] = values[requestFormField.id].split(' ')[0];
              } else {
                data[requestFormField.name] = values[requestFormField.id];
              }
            }
          });
        }
      }
    }

    let _findFormId = this._findFormId(data['requestTypeId'][data['requestTypeId'].length - 1]);
    let _requestFormFields = requestFormFields.filter((requestFormField) => requestFormField.formId === _findFormId);
    data['formField'] = _requestFormFields;
    if (data['dailyReport'] && (typeof data['dailyReport']) === 'string') {
      data['dailyReport'] = JSON.parse(data['dailyReport']);
      this.setState({dailyReport: data['dailyReport']});
    }
    return data;
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
   * @param {Number} requestTypeId
   * @return {boolean}
   * @private
   */
  _findRequestTypeAccess(requestTypeId) {
    const {userOrPositionRequestTypes} = this.props;
    if (!app._.isEmpty(this.findObject(userOrPositionRequestTypes, {requestTypeId: requestTypeId}))) {
      return true;
    }
    if (!app._.isEmpty(this.findObject(userOrPositionRequestTypes, {id: requestTypeId}))) {
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
      if (this._findRequestTypeAccess(group.id)) {
        let _group = {
          value: group.id,
          label: group.rule.name,
        };

        if (!app._.isEmpty(group.children)) {
          _group.children = this._renderGroups(group.children);
        }

        _groups.push(_group);
      }
    });
    return _groups;
  }

  /**
   *
   * @return {XML}
   * @private
   */
  _renderSelectPosition(name = 'positionId', mode = undefined) {
    let select = [];

    let {currentUser} = this.props;
    let positionId = currentUser && currentUser.positions ? currentUser.positions.pluck('id') : [];
    const requestUserPositions = this.props.requestUserPositions;
    let i = 0;
    if (currentUser && currentUser.positions && currentUser.profile) {
      app._.map(currentUser.positions, (position) => {
        i++;
        select.push(
          <AntdSelect.Option
            key={`${name}${position.id}`}
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
    app._.map(requestUserPositions, (requestUserPosition) => {
      if (requestUserPosition.user && requestUserPosition.user.profile && positionId.indexOf(requestUserPosition.id) === -1) {
        select.push(
          <AntdSelect.Option
            key={`${name}${requestUserPosition.id}`}
            value={`${requestUserPosition.id}`}
            style={{
              borderBottom: '1px solid #f6f6f6',
            }}
          >{requestUserPosition.name}
            <span
              className="select-span">{requestUserPosition.user.profile.firstName} {requestUserPosition.user.profile.lastName}</span>
          </AntdSelect.Option>,
        );
      }
    });

    return (
      <Field
        name={name}
        label={app.translate('routes.home.requests.Sender', 'Sender')}
        component={Select}
        defaultValue='0'
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

  _onChange(key, value) {
    let values = app._.clone(this.props.values);
    values[key] = value;
    this.props.initialize(values);
  }

  _dailyReport_onChange(key, value, day) {
    let values = app._.clone(this.props.values);
    let {dailyReport} = this.state;
    let _value = {};
    let index = dailyReport.findIndex((item) => {
      return item.date === day;
    });
    _value[key] = value;
    dailyReport[index] = Object.assign({}, dailyReport[index], _value);
    values['dailyReport'] = dailyReport;
    //

    if (!(this.props.values && app._.isEqual(dailyReport, this.props.values.dailyReport) )) {
      this.setState({dailyReport}, () => {
        this.props.initialize(values);
      });
    }
  }

  _dailyReport() {
    let children = [];
    let i = 0;
    let dateFromBack = this.props.values.dateFromBack;
    let dateToGoing = this.props.values.dateToGoing;
    let diff = jMoment(dateFromBack).diff(dateToGoing, 'day');
    let {dailyReport} = this.state;
    let day;
    if (dateFromBack && dateFromBack) {
      if (diff >= 0) {
        for (i = 0; i <= diff; i++) {
          day = jMoment(dateToGoing).add(i, 'day').format('jYYYY-jMM-jDD');
          if (!dailyReport[i] || dailyReport[i]['date'] !== day) {
            dailyReport[i] = {date: day, time_from: '', time_to: ''};
          }
          children.push(
            <Row key={`row_daily_report${i}`}
                 style={{
                   padding: '2px 8px',
                 }}>
              <Col sm={8} key={`col1_daily_report${i}`}>
                <div style={{
                  padding: '6px',
                }}>
                  {`${ i + 1 } ) `}{jMoment(dateToGoing).add(i, 'day').format('jYYYY-jMM-jDD')}
                </div>
              </Col>
              <Col sm={8} key={`col2_daily_report${i}`}>
                <div style={{
                  padding: '0px 8px',
                }}>
                  <TimePicker
                    placeholder="ساعت شروع کار"
                    name={day}
                    value={dailyReport[i] && dailyReport[i]['time_from']}
                    onChange={(value, name) => {
                      this._dailyReport_onChange(`time_from`, value, name);
                    }}
                  />
                </div>
              </Col>
              <Col sm={8} key={`col3_daily_report${i}`}>
                <div style={{
                  padding: '0px 8px',
                }}>
                  <TimePicker
                    placeholder="ساعت پایان کار"
                    name={day}
                    value={dailyReport[i] && dailyReport[i]['time_to']}
                    onChange={(value, name) => {
                      this._dailyReport_onChange('time_to', value, name);
                    }}
                  />
                </div>
              </Col>
            </Row>,
          );
        }
      } else {
        children.push(<Col sm={24} key={`daily_report${i}`}>تاریخ رسیدن از تاریخ برگشت بزرگتر است</Col>);
      }
    } else {
      children.push(<Col sm={24} key={`daily_report${i}`}>تاریخ رسیدن و تاریخ برگشت را وارد کنید</Col>);
    }
    return (<Row
      style={{
        padding: '8px 0px',
      }}
    >
      {children}
    </Row>);
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _renderForm() {
    const requestFormFields = this._getFormFields();

    let _form = [];
    let i = 0;

    app._.map(requestFormFields, (requestFormField) => {
      i++;
      switch (requestFormField.type) {
        case 'DatePicker':
        case 'Date':
          _form.push(<Col sm={12} md={8} key={`date${i}`}>
            <Field
              name={`${requestFormField.name}`}
              label={app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)}
              component={Date}
            />
          </Col>);
          break;
        case 'TimePicker':
        case 'Time':
          _form.push(<Col sm={12} md={8} key={`TimePicker${i}`}>
            <Field
              name={`${requestFormField.name}`}
              label={app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)}
              component={Time}
            />
          </Col>);
          break;
        case 'Number':
        case 'number':
          _form.push(<Col sm={12} md={8} key={`number${i}`}>
            <Field
              min={1}
              disabled={this.props.type === 'edit' && requestFormField.name === 'substituteId'}
              name={`${requestFormField.name}`}
              label={app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)}
              component={Number}
            />
          </Col>);
          break;
        case 'Text':
          _form.push(<Col sm={12} md={8} key={`Text${i}`}>
            <Field
              name={`${requestFormField.name}`}
              label={app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)}
              component={Text}
            />
          </Col>);
          break;
        case 'FILE':
          _form.push(<Col sm={12} md={8} key={`FILE${i}`}>
            <Field
              name={`${requestFormField.name}`}
              label={app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)}
              component={File}
            />
          </Col>);
          break;
        case 'SelectRequest':
          let selectWrites = [];
          app._.map(this.props.writs, (_writs) => {
            //  if (requestUserPosition.user && requestUserPosition.user.profile && positionId.indexOf(requestUserPosition.id) === -1) {
            selectWrites.push(
              <AntdSelect.Option
                key={`${uuidv1()}`}
                value={`${_writs.requests && _writs.requests[0] && _writs.requests[0].id}`}
                style={{
                  borderBottom: '1px solid #f6f6f6',
                }}
              >
                {jMoment(_writs.dateFrom).format('jYYYY-jMM-jDD')} / {jMoment(_writs.dateTo).format('jYYYY-jMM-jDD')}
              </AntdSelect.Option>,
            );
            //  }
          });
          _form.push(<Col sm={24} md={24} key={`SelectRequests${i}`}>
            <Field
              name={`${requestFormField.name}`}
              label={app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)}
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
              {selectWrites}
            </Field>
          </Col>);

          break;
        case 'SelectField':
          _form.push(<Col sm={12} md={8} key={`SelectField${i}`}>
            <Field
              name={`${requestFormField.name}`}
              label={app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)}
              component={Select}
            >
              <AntdSelect.Option value="clock_in">
                <span>{app.translate('routes.home.requests.clock_in')}</span>
                <MaterialIcon name="arrow-down-thick" size="tiny" style={{
                  color: 'green',
                }}/>
              </AntdSelect.Option>
              <AntdSelect.Option value="clock_out">
                <span>{app.translate('routes.home.requests.clock_out')}</span>
                <MaterialIcon name="arrow-up-thick" size="tiny" style={{
                  color: 'red',
                }}/>
              </AntdSelect.Option>
              <AntdSelect.Option value="attendance">
                <span>{app.translate('routes.home.requests.attendance')}</span>
                <MaterialIcon name="swap-vertical" size="tiny" style={{
                  color: 'orange',
                }}/>
              </AntdSelect.Option>
            </Field>
          </Col>);
          break;
        case 'CheckBox':
          _form.push(<Col sm={6} md={4} key={`CheckBox${i}`}>
            <Checkbox
              value="true"
              defaultChecked={this.props.values && this.props.values[requestFormField.name] && this.props.values[requestFormField.name] === 'true' ? true : false}
              onChange={(e) => {
                this._onChange(requestFormField.name, e.target.value);
              }}>{app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)}</Checkbox>
          </Col>);
          break;
        case 'Json':
          _form.push(<Col sm={24} md={24} key={`Json${i}`}>
            {app.translate(`routes.home.requests.${requestFormField.name}`, requestFormField.name)} :
            {
              this._dailyReport()
            }
          </Col>);
          break;
        case 'SelectPositions':
          _form.push(<Col sm={12} md={8} key={`SelectPositions${i}`}>
            <PositionsList
              title={app.translate('routes.home.basic.organization-chart.Positions')}
              ref={(input) => this.positionsList = input && input.getWrappedInstance()}
              selected={[]}
              onChange={(value) => {
                this._onChange(requestFormField.name, value);
              }}
            />
          </Col>);
          break;
        default:
          _form.push(<Col sm={12} md={8} key={`t${Math.random()}`}>{requestFormField.name}</Col>);
      }
    });
    _form.push(<Col sm={24} md={24} key={`description`}>
      <Field
        name="description"
        label={app.translate(`routes.home.requestsDescription`, 'Description')}
        component={TextArea}
      />
    </Col>);
    return _form;
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {onCancelTouch, visible, title, submit, isPristine} = this.props;
    const {render, disable, spinning} = this.state;
    let requestTypes = [];

    if (!app._.isEmpty(this.props.userOrPositionRequestTypes) && !app._.isEmpty(this.props.requestTypes)) {
      requestTypes = this._renderGroups(this.props.requestTypes);
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
          <Button key="submit" type="primary" disabled={disable} size="large" onClick={submit}>
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
            render &&
            <Row
              gutter={16}
              style={{
                minHeight: '300px',
              }}
            >
              <Col sm={24} md={12}>
                {this._renderSelectPosition()}
              </Col>
              {this.props.values && this.props.values.positionId && this.props.values.positionId !== '0' &&
              <Col sm={24} md={12}>
                <Field
                  name="requestTypeId"
                  label={app.translate('routes.home.requests.Request Type')}
                  component={Cascader}
                  required
                  items={requestTypes}
                />
              </Col>
              }
              {
                this.props.values &&
                this.props.values.requestTypeId &&
                this.props.values.positionId !== '0' &&
                !app._.isEmpty(this.props.values.requestTypeId) &&
                <FormBuilder
                  ref={(input) => this.myForm = input}
                  form={{}}
                  values={{}}
                />

                // this._renderForm()
              }
            </Row>
          }
        </Spin>
      </Modal>
    );
  }
}
