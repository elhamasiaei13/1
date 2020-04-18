import React from 'react';
import {Modal, Button, Row, Col, Input, Select, Form as AntdForm} from 'antd';
import PropTypes from 'prop-types';
import DatePicker from 'components/common/DatePicker';
import TimePicker from 'components/common/TimePicker';

@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      onChange: false,
      values: {
        date: !app._.isEmpty(props.item) && props.item.applyDate ? props.item.applyDate.split(' ')[0] : '',
        time: !app._.isEmpty(props.item) && props.item.applyDate ? props.item.applyDate.split(' ')[1] : '',
        calc: !app._.isEmpty(props.item) ? props.item.calcTime : '',
        type: !app._.isEmpty(props.item) ? props.item.calcType : 'second',
        action: !app._.isEmpty(props.item) && props.item.calcTime < 0 ? 'mines' : 'plus',
        description: !app._.isEmpty(props.item) && props.item.description ? props.item.description : '',
      },
      validateStatus: {
        date: '',
        time: '',
        calc: '',
        type: '',
        action: '',
      },
      error: {
        date: '',
        time: '',
        calc: '',
        type: '',
        action: '',
      },
    };
  }

  _onChange(e) {
    let {values, onChange, error, validateStatus} = this.state;
    values[e.target.id] = e.target.value;
    validateStatus[e.target.id] = '';
    error[e.target.id] = '';
    this.setState({values, error, validateStatus, onChange: !onChange});
  }

  _checkError() {
    let {values, onChange, error, validateStatus} = this.state;
    let _return = true;
    let err = ['date', 'time', 'calc', 'type'];

    for (let x in err) {
      if (err.indexOf(err[x]) > -1) {
        if (!values[err[x]] || values[err[x]] === '') {
          error[err[x]] = app.translate('main.This field is required');
          validateStatus[err[x]] = 'error';
          _return = false;
        } else {
          error[err[x]] = '';
          validateStatus[err[x]] = 'success';
        }
      }
    }

    this.setState({error, validateStatus, onChange: !onChange});

    return _return;
  }

  _onSubmit() {
    let {values} = this.state;
    let calcTime = 0;
    const {onSubmit, item} = this.props;
    let stackLogId = !app._.isEmpty(item) && item.id ? item.id : null;
    if (this._checkError()) {

      calcTime = parseInt(values['calc']);
      calcTime = calcTime > 0 ? calcTime : calcTime * -1;
      calcTime = values['action'] === 'plus' ? calcTime : calcTime * -1;

      onSubmit({
        stackLogId: stackLogId,
        applyDate: `${values['date']} ${values['time']}`,
        calcTime: calcTime,
        calcType: values['type'],
        description: values['description'],
      });
    }
  }

  _Sec(time) {
    let min = time.split(':');
    if (min.length > 0) {
      return min[0] * 3600 + min[1] * 60;
    } else {
      return 0;
    }
  }

  _time(_second) {
    let second = (_second < 0 ? _second * -1 : _second);
    let h = parseInt(second / 3600);
    let m = parseInt((second - (h * 3600)) / 60);
    return `${(h > 9 ? '' : '0')}${h}:${(m > 9 ? '' : '0')}${m}`;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {onCancel, item, visible} = this.props;
    const {values, error, validateStatus} = this.state;

    return (
      <Modal
        title={app._.isEmpty(item) ? app.translate('routes.home.attendance.stack.Add Form') : app.translate('routes.home.attendance.stack.Edit Form')}
        visible={visible}
        wrapClassName="vertical-center-modal"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" size="large" onClick={onCancel}>
            {app.translate('main.Cancel')}
          </Button>,
          <Button key="submit" type="primary" size="large" onClick={this._onSubmit}>
            {app.translate('main.Submit')}
          </Button>,
        ]}
      >
        <Row
          gutter={16}
          style={{
            fontSize: '14px',
            lineHeight: '25px',
          }}
        >
          <Col sm={12}>
            <AntdForm.Item
              label={app.translate('routes.home.attendance.stack.Apply Date')}
              validateStatus={validateStatus['date']}
              help={error['date']}
            >
              <DatePicker
                value={values['date']}
                id='date'
                onChange={(value) => this._onChange({target: {id: 'date', value: value}})}
              />
            </AntdForm.Item>
          </Col>

          <Col sm={12}>
            <AntdForm.Item
              label={app.translate('routes.home.attendance.stack.Apply Time')}
              validateStatus={validateStatus['time']}
              help={error['time']}
            >
              <TimePicker
                value={values['time']}
                onChange={(value) => this._onChange({target: {id: 'time', value: value}})}
              />
            </AntdForm.Item>
          </Col>

          <Col sm={12}>
            <AntdForm.Item
              label={app.translate('routes.home.attendance.stack.Calc Type')}
              validateStatus={validateStatus['type']}
              help={error['type']}
            >
              <Select
                id="type"
                defaultValue="second"
                onChange={(value) => {
                  this._onChange({target: {id: 'calc', value: ''}});
                  this._onChange({target: {id: 'type', value: value}});
                }}
                value={values['type']}
              >
                <Select.Option value="second">{app.translate('routes.home.attendance.stack.Hour')}</Select.Option>
                <Select.Option value="day">{app.translate('routes.home.attendance.stack.Day')}</Select.Option>
              </Select>
            </AntdForm.Item>
          </Col>

          <Col sm={12}>
            <AntdForm.Item
              label={app.translate('routes.home.attendance.stack.Calc Time')}
              validateStatus={validateStatus['calc']}
              help={error['calc']}
            >
              {values['type'] === 'day' ?
                <Input
                  value={values['calc']}
                  type="Number"
                  id='calc'
                  min="0"
                  onChange={this._onChange}
                  style={{
                    width: '50%',
                  }}
                />
                :
                <TimePicker
                  value={this._time(values['calc'])}
                  style={{
                    width: '50%',
                  }}
                  onChange={
                    (value) => {
                      let val = this._Sec(value);
                      this._onChange({target: {id: 'calc', value: val}});
                    }
                  }
                />
              }
              <Select
                id="action"
                defaultValue="plus"
                onChange={(value) => {
                  this._onChange({target: {id: 'action', value: value}});
                }}
                value={values['action']}
                style={{
                  width: '50%',
                  display: 'inline-block',
                }}
              >
                <Select.Option value="plus">{app.translate('routes.home.attendance.stack.Plus')}</Select.Option>
                <Select.Option value="mines">{app.translate('routes.home.attendance.stack.Mines')}</Select.Option>
              </Select>
            </AntdForm.Item>
          </Col>
          <Col sm={24}>
            <AntdForm.Item label={app.translate('routes.home.attendance.stack.Description')}>
              <Input
                value={values['description']}
                type="textarea"
                id='description'
                onChange={this._onChange}
              />
            </AntdForm.Item>
          </Col>
        </Row>

      </Modal>
    );
  }
}
