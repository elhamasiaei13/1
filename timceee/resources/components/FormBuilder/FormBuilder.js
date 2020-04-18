import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col, Select as AntdSelect} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import jMoment from 'moment-jalaali';
import uuidv1 from 'uuid/v1';
import {
  getForm,
} from './Module';

import {Field, reduxForm, getFormValues, isPristine} from 'redux-form';
import {Text, TextArea, Date, Time, CheckBoxSingel, Cascader, Select, Number, File, Rule, Position, Hidden} from 'components/redux-form';
import validate from './validate';
import DailyReport from './common/DailyReport/DailyReport';
import WritKey from './common/WritKey/WritKey';
import SelectWritInfo from './common/SelectWrit/SelectWritInfo';
import FamiliesNameInfo from './common/FamiliesName/FamiliesNameInfo';
import FamiliesName from './common/FamiliesName/FamiliesName';


@reduxForm({
  form: 'FormBuilder',
  destroyOnUnmount: false,
  validate,
  onSubmit: () => {
  },
})
@connect((state) => ({
  fields: state.FormBuilder.Main.fields,
  values: getFormValues('FormBuilder')(state),
  isPristine: isPristine('FormBuilder')(state),
}), {
  getForm,
})
@autobind
/**
 *
 */
export default class FormBuilder extends React.PureComponent {
  static propTypes = {
    formId: PropTypes.number,
    fields: PropTypes.any,
    formFields: PropTypes.any,
    values: PropTypes.object,
    formValues: PropTypes.object,
    editable: PropTypes.bool,
    md: PropTypes.number,
    getForm: PropTypes.func,
    componentName: PropTypes.string,
  };

  static defaultProps = {
    formId: undefined,
    formFields: {},
    fields: {},
    values: {},
    formValues: {},
    editable: true,
    md: 12,
    componentName: 'FormBuilder',
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      formFields: !app._.isEmpty(props.formFields) ? props.formFields : props.fields,
    };
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.formId) {
      this.props.getForm(this.props.formId, {
        includes: ['fields'],
      }, (err, res) => {
        if (!err) {
          this.props.validate(this.props.values, {formFields: res.data.form});
        } else {
          console.log('error', err);
        }
      });
    }
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.formId, np.formId)) {
      this.props.getForm(np.formId, {
        includes: ['fields'],
      }, (err, res) => {
        if (!err) {
          np.validate(np.values, {formFields: res.data.form});
        } else {
          console.log('error', err);
        }
      });
    }
    if (!app._.isEqual(this.props.fields, np.fields)) {
      this.setState({formFields: np.fields});
    }
    if (!app._.isEqual(this.props.formFields, np.formFields)) {
      this.setState({formFields: np.formFields});
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    // super.componentWillUnmount();
  }

  _renderItem(item, index) {
    // console.log('field:', item);
    const {md} = this.props;
    let _item = '';
    let _type = item.type.toUpperCase();
    let name = app._.camelCase(item.name);
    if (item.permission !== undefined && item.permission === false) {
      _item = <Field
        name={`values[${name}]`}
        label={app.translate(`components.form-builder.${item.label}`, `${item.label}`)}
        component={Hidden}
        defaultValue={item.defaultValue}
      />;
    } else {
      switch (_type) {
        case 'DATEPICKER':
        case 'DATE':
          _item = <Col sm={24} md={md} key={index}><Field
            name={`values[${name}]`}
            label={app.translate(`components.form-builder.${item.label}`, `${item.label}`)}
            required={item.required ? true : false}
            component={Date}
          /></Col>;
          break;
        case 'TIMEPICKER':
        case 'TIME':
          _item = <Col sm={24} md={md} key={index}><Field
            name={`values[${name}]`}
            label={app.translate(`components.form-builder.${item.label}`, item.label)}
            component={Time}
            required={item.required ? true : false}
          /></Col>;
          break;
        case 'NUMBER':
          _item = <Col sm={24} md={md} key={index}><Field
            min={0}
            name={`values[${name}]`}
            label={app.translate(`components.form-builder.${item.label}`, item.label)}
            component={Number}
            required={item.required ? true : false}
          /></Col>;
          break;
        case 'TEXT':
          _item = <Col sm={24} md={md} key={index}><Field
            name={`values[${name}]`}
            label={app.translate(`components.form-builder.${item.label}`, item.label)}
            component={Text}
            required={item.required ? true : false}
          /></Col>;
          break;
        case 'FILE':
          _item = <Col sm={24} md={md} key={index}><Field
            name={`values[${name}]`}
            label={app.translate(`components.form-builder.${item.label}`, item.label)}
            component={File}
            required={item.required ? true : false}
          /></Col>;
          break;
        case 'SELECT':
        case 'SELECT.MULTI':
          if (item.resource === 'Api\\General\\Models\\Position') {
            _item = <Col sm={24} md={md} key={index}><Field
              name={`values[${name}]`}
              label={app.translate(`components.form-builder.${item.label}`, item.label)}
              component={Position}
              componentName={this.props.componentName}
            /></Col>;
          }
          else {
            if (item.resource === 'Api\\TA\\Models\\Writ') {
              _item = <Col sm={24} key={index}><Field
                name={`values[${name}]`}
                label={app.translate(`components.form-builder.${item.label}`, item.label)}
                component={WritKey}
                required={item.required ? true : false}
                positionId={this.props.values.positionId}
              /></Col>;
            }
            else {
              if (item.resource === 'Api\\Requests\\Models\\Request') {
                _item = <Col sm={24} key={index}><Field
                  name={`values[${name}]`}
                  label={app.translate(`components.form-builder.${item.label}`, item.label)}
                  component={Select}
                  required={item.required ? true : false}
                /></Col>;
              }
              else {
                if (item.name === 'clocking_type') {
                  _item = <Col sm={24} md={md} key={index}><Field
                    name={`values[${name}]`}
                    label={app.translate(`components.form-builder.${item.label}`, item.label)}
                    component={Select}
                    required={item.required ? true : false}
                  >
                    <AntdSelect.Option value="in">
                      <span>{app.translate('components.form-builder.clock_in')}</span>
                      <MaterialIcon name="arrow-down-thick" size="tiny" style={{
                        color: 'green',
                      }}/>
                    </AntdSelect.Option>
                    <AntdSelect.Option value="out">
                      <span>{app.translate('components.form-builder.clock_out')}</span>
                      <MaterialIcon name="arrow-up-thick" size="tiny" style={{
                        color: 'red',
                      }}/>
                    </AntdSelect.Option>
                    <AntdSelect.Option value="indeterminate">
                      <span>{app.translate('components.form-builder.attendance')}</span>
                      <MaterialIcon name="swap-vertical" size="tiny" style={{
                        color: 'orange',
                      }}/>
                    </AntdSelect.Option>
                  </Field></Col>;
                }
                else {
                  let options = [];
                  let values = {};
                  if (typeof item.values === 'object') {
                    values = (item.values) ? item.values : {};
                  } else {
                    values = (item.values) ? JSON.parse(item.values) : {};
                  }
                  let keys = Object.keys(values);
                  app._.map(keys, (key) => {
                    options.push(<AntdSelect.Option key={key} value={key}>{values[key]}</AntdSelect.Option>);
                  });
                  let multiple = {};
                  if (_type === 'SELECT.MULTI') {
                    multiple = {mode: 'multiple'};
                  }
                  _item = <Col sm={24} md={md} key={index}><Field
                    name={`values[${name}]`}
                    label={app.translate(`components.form-builder.${item.label}`, item.label)}
                    component={Select}
                    {...multiple}
                    required={item.required ? true : false}
                  >{options}</Field></Col>;
                }
              }
            }
          }
          break;
        case 'SELECT.TREE':
          if (item.resource === 'Api\\General\\Models\\Rule') {
            _item = <Col sm={24} md={md} key={index}><Field
              name={`values[${name}]`}
              label={app.translate(`components.form-builder.${item.label}`, item.label)}
              component={Rule}
              required={item.required ? true : false}
            /></Col>;
          }
          break;
        case 'CHECKBOX':
          _item = <Col sm={6} md={4} key={index}><Field
            name={`values[${name}]`}
            label={app.translate(`components.form-builder.${item.label}`, item.label)}
            component={CheckBoxSingel}
            required={item.required ? true : false}
            inline={true}
          /></Col>;
          break;
        case 'JSON':
          _item = <Col sm={24} key={index}><Field
            name={`values[${name}]`}
            label={app.translate(`components.form-builder.${item.label}`, item.label)}
            component={DailyReport}
            required={item.required ? true : false}
            dateFromBack={this.props.values.values.dateFromBack}
            dateToGoing={this.props.values.values.dateToGoing}
            inline={true}
          /></Col>;
          break;
        case 'userFamiliesNameList':
          _item = <Col sm={24} md={24} key={`userFamiliesNameList${i}`}>
            <Field
              name={`values[${name}]`}
              label={app.translate(`components.form-builder.${item.label}`, item.label)}
              component={FamiliesName}
              positionId={this.props.values.positionId}
            />
          </Col>;
          break;
        default:
          // console.log('field:', item);
          _item = <Col sm={24} key={index}><span>{item.name} : {item.type}</span></Col>;
      }
    }
    return _item;
  }

  _itemValue(item, index, value) {
    const {md} = this.props;
    let _type = item.type.toUpperCase();
    // console.log(item, index, value);
    let _return = '';
    switch (_type) {
      case 'DATEPICKER':
      case 'DATE':
        _return = (<Col sm={24} md={md} key={index}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="calendar" size="tiny"/>
                {app.translate(`components.form-builder.${item.label}`, item.label)} : </span>
          {value && jMoment(value, 'YYYY-M-D').format('dddd jYYYY/jMM/jDD')}
        </Col>);
        break;
      case 'TIMEPICKER':
      case 'TIME':
        _return = (<Col sm={24} md={md} key={index}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="clock" size="tiny"/>
                {app.translate(`components.form-builder.${item.label}`, item.label)} : </span>
          {value}
        </Col>);
        break;
      case 'NUMBER':
        _return = (<Col sm={24} md={md} key={index}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="numeric" size="tiny"/>
                {app.translate(`components.form-builder.${item.label}`, item.label)} : </span>
          {value}
        </Col>);
        break;
      case 'TEXT':
        _return = (<Col sm={24} md={md} key={index}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="note" size="tiny"/>
                {app.translate(`components.form-builder.${item.label}`, item.label)} : </span>
          {value}
        </Col>);
        break;
      case 'SELECT':
        if (item.resource === 'Api\\Requests\\Models\\Request') {
          _return = (<Col sm={24} md={md} key={index}>
            <span
              className="request-info-title">
            <MaterialIcon
              name="note-outline" size="tiny"/>
              {app.translate(`components.form-builder.${item.label}`, item.label)} : </span>

            ???
          </Col>);
        } else {
          if (item.name === 'clocking_type') {
            _return = (<Col sm={24} md={md} key={index}>
            <span
              className="request-info-title">
            <MaterialIcon
              name="note-outline" size="tiny"/>
              {app.translate(`components.form-builder.${item.label}`, item.label)} : </span>

              <span>{app.translate(`components.form-builder.${value}`)}</span>
              <MaterialIcon
                name={value === 'in' ? 'arrow-down-thick' : value === 'out' ? 'arrow-up-thick' : 'swap-vertical'} size="tiny"
                style={{
                  color: value === 'in' ? 'green' : value === 'out' ? 'red' : 'orange',
                }}/>
            </Col>);
          } else {
            _return = (<Col sm={24} md={md} key={index}>
            <span
              className="request-info-title">
            <MaterialIcon
              name="note-outline" size="tiny"/>
              {app.translate(`components.form-builder.${item.label}`, item.label)} : </span>
              ???
            </Col>);
          }
        }
        break;

      case 'SelectWrit':
        _return = (<Col sm={12} md={8} key={uuidv1()}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="numeric" size="tiny"/>
                {app.translate(`routes.form-builder.${item.label}`, item.label)} : </span>
          <SelectWritInfo
            dailyWritId={value}
          />
        </Col>);
        break;

      case 'userFamiliesNameList':
        _return = (<Col sm={12} md={8} key={uuidv1()}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="format-list-checks" size="tiny"/>
                {app.translate(`routes.form-builder.${item.label}`, item.label)} : </span>
          <FamiliesNameInfo
            value={value}
            positionId={this.props.values && this.props.values.positionId ? this.props.values.positionId : 0}
          />
        </Col>);
        break;
      case 'SelectPositions':
        break;
      case 'SelectRequest':
        /*   _form = (<Col sm={24} key={uuidv1()}>
             <span
               className="request-info-title">
                 {app.translate('components.form-builder.Select Request')} : </span> {value}

           </Col>); */
        break;
      case 'CHECKBOX':
        _return = (<Col sm={24} md={md} key={index}>
            <span
              className="request-info-title">
            <MaterialIcon
              name="pharmacy" size="tiny"/>
              {app.translate(`components.form-builder.${item.label}`, item.label)} :
            </span>
          <MaterialIcon
            name={(value === 'true') ? 'check' : 'close'} style={{
            color: ((value === 'true') ? 'green' : 'red'),
          }} size="tiny"/>
        </Col>);
        break;
      case 'JSON':
        let _val = JSON.parse(value);
        let _elment = [];
        app._.map(_val, (val) => {
          _elment.push(<Row key={uuidv1()}>
            <Col sm={8} md={8} key={uuidv1()}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="calendar" size="tiny"/>
                {app.translate(`components.form-builder.date`)} : </span>
              <span style={{display: 'inline-block'}}>{val.date}</span>
            </Col>
            <Col sm={8} md={8} key={uuidv1()}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="clock" size="tiny"/>
                {app.translate(`components.form-builder.time_from`)} : </span>
              {val.time_from}
            </Col>
            <Col sm={8} md={8} key={uuidv1()}>
              <span
                className="request-info-title">
            <MaterialIcon
              name="clock" size="tiny"/>
                {app.translate(`components.form-builder.time_to`)} : </span>
              {val.time_to}
            </Col>
          </Row>);
        });
        _return = (<Col sm={24} md={md} key={index}>
            <span
              className="request-info-title">
            {app.translate(`components.form-builder.${item.label}`, item.label)} :
            </span>
          {_elment}
        </Col>);
        break;
      case 'FILE':
        _return = (<Col sm={24} md={md} key={index}>
            <span
              className="request-info-title">
            <MaterialIcon
              name="note-outline" size="tiny"/>
              {app.translate(`components.form-builder.${item.label}`, item.label)}:</span>
          {
            value &&
            <a href={`${value}`} target="_blank" download="download">{app.translate(`components.form-builder.${item.label}`, item.label)}</a>
          }
        </Col>);

        break;
      default:
        _return = (<Col sm={24} key={index}>{item.type}:{item.name} - {item.name}</Col>);
    }
    return _return;
  }

  _formFieldsRender() {
    let _field = [];
    const {formValues, editable} = this.props;
    const {formFields} = this.state;
    if (formFields && formFields.fields) {
      formFields.fields.map((item, index) => {

        let name = app._.camelCase(item.name);

        _field.push(
          editable ? this._renderItem(item, index) : this._itemValue(item, index, formValues && formValues[name]),
        );
      });
    }

    return _field;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Row
        gutter={16}
        style={{
          fontSize: '14px',
          lineHeight: '25px',
          marginRight: '0px',
          marginLeft: '0px',
        }}>
        {this._formFieldsRender()}
      </Row>
    );
  }


}
