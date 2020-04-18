import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import Calendar from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import { index as indexCalendars, emptyCalendars, show as showCalendar, emptyCalendar, indexDayTypes } from 'routes/Home/Attendance/Calendar/Module';
import { List as WorkingHoursRemoveList, ListWrapper as WorkingHoursList } from 'routes/Home/Attendance/WorkingHours/List';
import { Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal, Tooltip } from 'antd';
import { index as indexWorkingHours, emptyWorkingHours } from 'routes/Home/Attendance/WorkingHours/Module';
import { show, emptyShift, store, update } from './../Module';
import { connect } from 'react-redux';

jMoment.loadPersian({ usePersianDigits: false });

@connect((state) => ({
  calendars: state.Attendance.Calendar.calendars,
  calendar: state.Attendance.Calendar.calendar,
  shift: state.Attendance.Shift.Definition.shift,
  workingHours: state.Attendance.WorkingHours.workingHours,
  dayTypes: state.Attendance.Calendar.dayTypes,
}), {
  show,
  emptyShift,
  store,
  update,
  indexDayTypes,
  indexWorkingHours,
  emptyWorkingHours,
  indexCalendars,
  emptyCalendars,
  showCalendar,
  emptyCalendar,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    indexWorkingHours: PropTypes.func,
    emptyWorkingHours: PropTypes.func,
    show: PropTypes.func,
    emptyShift: PropTypes.func,
    item: PropTypes.object,
    shift: PropTypes.object,
    dayTypes: PropTypes.array,
    workingHours: PropTypes.arrayOf(PropTypes.object),
    store: PropTypes.func,
    update: PropTypes.func,
    indexDayTypes: PropTypes.func,
    indexCalendars: PropTypes.func,
    emptyCalendars: PropTypes.func,
    showCalendar: PropTypes.func,
    emptyCalendar: PropTypes.func,
    calendars: PropTypes.arrayOf(PropTypes.object),
    calendar: PropTypes.object,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      shift: {},
      statuses: [],
      events: [],
      showAddForm: false,
      error: {},
      workingHours: null,
      receiving: true,
      loading: false,
      saving: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const { indexDayTypes, showCalendar, indexWorkingHours, show, item } = this.props;

    indexDayTypes(null, (err) => {
      if (!err) {
        indexWorkingHours(null, (err) => {
          if (!err) {
            showCalendar(1, {includes: ['days']}, (err) => {
              if (!err) {
                if (item) {
                  return show(item.id, { includes: ['workingDays'] });
                }

                this.setState({
                  receiving: false,
                });
              }
            });
          }
        });
      }
    });
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.shift, np.shift)) {
      let statuses = [];
      let events = [];


      np.calendar.days.map((day) => {
        let _type = this._getType(day.calendarDayTypeId);

        let _status = {
          ...day,
          date: jMoment(day.date).format('jYYYY-jMM-jDD'),
          title: _type.displayName,
          color: _type.color,
        };

        statuses.push(_status);
      });


      np.shift.workingDays.map((workingDay) => {
        // console.log(workingDay);
        let _workingHour = this._getWorkingHour(workingDay.workingHourId);

        if (_workingHour) {
          events.push({
            ...workingDay,
            date: jMoment(workingDay.date).format('jYYYY-jMM-jDD'),
            content: _workingHour.name,
            color: _workingHour.color,
          });
        }
      });
      // console.log(events);

      this.setState({
        receiving: false,
        shift: np.shift,
        statuses,
        events,
      });
    }

    if (!app._.isEqual(this.props.calendar, np.calendar)) {
      let statuses = [];

      np.calendar.days.map((day) => {
        let _type = this._getType(day.calendarDayTypeId);

        let _status = {
          ...day,
          date: jMoment(day.date).format('jYYYY-jMM-jDD'),
          title: _type.displayName,
          color: _type.color,
        };

        if (day.description && day.description !== '') {
          _status.description = day.description;
        }

        statuses.push(_status);
      });

      this.setState({
        receiving: false,
        statuses,
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    const { emptyWorkingHours, emptyCalendars, emptyCalendar, emptyShift } = this.props;

    emptyWorkingHours();
    emptyCalendars();
    emptyCalendar();
    emptyShift();
  }

  /**
   *
   * @param {String} date
   * @return {Object}
   * @private
   */
  _getStatus(date) {
    const { statuses } = this.state;

    return statuses[statuses.findIndex((status) => status.date === date)];
  }

  /**
   *
   * @param {Number} id
   * @return {Object}
   * @private
   */
  _getType(id) {
    const { dayTypes } = this.props;

    return dayTypes[dayTypes.findIndex((_dayType) => _dayType.id === id)];
  }

  /**
   *
   * @param {Number} workingHour
   * @return {Object}
   * @private
   */
  _getWorkingHour(workingHour) {
    const { workingHours } = this.props;

    return workingHours[workingHours.findIndex((_workingHour) => _workingHour.id === workingHour)];
  }

  /**
   *
   * @private
   */
  _onRemove() {
    const { events } = this.state;
    const _selected = this.calendar.selected();

    let _workingHours = [];

    _selected.map((_range) => {
      events.map((_event) => {
        if (_range.start <= _event.date && _event.date <= _range.end) {
          _workingHours.push(this._getWorkingHour(_event.workingHourId));
        }
      });
    });

    _workingHours = app._.uniqWith(_workingHours, app._.isEqual);

    if (_workingHours.length > 0) {
      this.setState({
        workingHours: _workingHours,
      });
    }
  }

  /**
   *
   * @private
   */
  _handleRemove() {
    const { events } = this.state;
    const _selected = this.calendar.selected();
    const _workingHours = this.workingHoursRemoveList.selected();
    let _events = app._.cloneDeep(events);
    let _indexes = [];

    _selected.map((_range) => {
      _events.map((_event, _index) => {
        if (_range.start <= _event.date && _event.date <= _range.end && _workingHours.indexOf(_event.workingHourId) > -1) {
          _indexes.push(_index);
        }
      });
    });

    _indexes.sort((a, b) => a - b);
    _indexes.reverse();
    _indexes.map((_index) => _events.splice(_index, 1));

    this.setState({
      events: _events,
      workingHours: null,
    }, () => this.calendar.reset());
  }

  /**
   *
   * @private
   */
  _onAdd() {
    const _selected = this.calendar.selected();

    if (_selected.length > 0) {
      this.setState({
        showAddForm: true,
      });
    }
  }

  /**
   *
   * @private
   */
  _handleAdded() {
    const { events } = this.state;
    const _selected = this.calendar.selected();
    const _workingHours = this.workingHoursList.selected();
    let _events = app._.cloneDeep(events);

    _selected.map((_range) => {
      let _date = _range.start;

      for (let _moment = jMoment(_date, 'jYYYY-jMM-jDD'); _date <= _range.end; _moment.add(1, 'day'), _date = _moment.format('jYYYY-jMM-jDD')) {
        _workingHours.map((workingHour) => {
          let _workingHour = this._getWorkingHour(workingHour);
          let _status = this._getStatus(_date);

          let _event = {
            workingHourId: workingHour,
           // calendarDayId: _status.id,
            date: _date,
            content: _workingHour.name,
            color: _workingHour.color,
          };

          _events.push(_event);
        });
      }
    });

    _events = app._.uniqWith(_events, (a, b) => a.date === b.date && a.workingHourId === b.workingHourId);

    this.setState({
      events: _events,
      showAddForm: false,
    }, () => this.calendar.reset());
  }

  /**
   *
   * @private
   */
  _submit() {
    const { shift, events } = this.state;
    const { store, update, onCancel } = this.props;

    this.setState({
      saving: true,
    }, () => {
      let _shift = app._.cloneDeep(shift);
      let workingDays = [];

      delete _shift.calendar;

      events.map((event) => {
        workingDays.push({
          id: event.id,
         // calendarDayId: event.calendarDayId,
          workingHourId: event.workingHourId,
          date: jMoment(event.date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
        });
      });

      _shift = {
        ..._shift,
        workingDays,
      };
      // console.log(_shift);
      if (shift.id) {
        update(shift.id, _shift, null, (err) => this.setState({ saving: false }, () => !err && onCancel()));
      } else {
        store(_shift, null, (err) => this.setState({ saving: false }, () => !err && onCancel()));
      }
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { loading, saving, receiving, shift, statuses, events, showAddForm, workingHours, error } = this.state;
    const { onCancel, calendars } = this.props;
    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >

        <Card
          className="wrapper"
          title={app.translate('routes.home.attendance.shift.Shift Form')}
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
                onClick={() => {
                  if (!error.name) {
                    if (shift.name) {
                      this._submit();
                    } else {
                      if (!shift.name) {
                        this.setState((state) => ({
                          error: {
                            ...state.error,
                            name: true,
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
              xs={24} md={12} lg={8}
            >
              <AntdForm.Item
                label={app.translate('routes.home.attendance.shift.Name')}
                help={error.name && app.translate('main.This field is required')}
                validateStatus={error.name ? 'error' : ''}
                required
                hasFeedback
              >
                <Input
                  type="text"
                  prefix={<MaterialIcon name="alphabetical"/>}
                  value={shift.name}
                  onChange={(event) => this.setState({
                    shift: {
                      ...shift,
                      name: event.target.value,
                    },
                    error: {
                      ...error,
                      name: event.target.value === '',
                    },
                  })}
                  onBlur={() => this.setState((state) => ({
                    error: {
                      ...state.error,
                      name: shift.name === '' || !shift.name,
                    },
                  }))}
                />
              </AntdForm.Item>
            </Col>

            <Col
              xs={24} md={12} lg={16}
            >
              <AntdForm.Item
                label={app.translate('routes.home.attendance.shift.Description')}
              >
                <Input.TextArea
                  value={shift.description}
                  onChange={(event) => this.setState({
                    shift: {
                      ...shift,
                      description: event.target.value,
                    },
                  })}
                  style={{
                    maxHeight: 46,
                  }}
                />
              </AntdForm.Item>
            </Col>

            <Col
              xs={24}
              style={{
                height: 'calc(100% - 102px)',
              }}
            >
              <Calendar
                title={app.translate('routes.home.attendance.shift.Edit Days')}
                ref={(input) => this.calendar = input}
                statuses={statuses}
                loading={loading}
                // disabled={(date) => statuses.findIndex((status) => status.date === date) === -1}
                events={events}
                extra={
                  <Button.Group>
                    <Tooltip title={app.translate('main.Reset Selected')}>
                      <Button
                        type="dashed"
                        icon="close"
                        disabled={loading}
                        onClick={() => this.calendar.reset()}
                      />
                    </Tooltip>
                    <Button
                      type="danger"
                      disabled={loading}
                      onClick={this._onRemove}
                    >
                      {app.translate('main.Remove')}
                    </Button>
                    <Button
                      type="primary"
                      disabled={loading}
                      onClick={this._onAdd}
                    >
                      {app.translate('main.Add')}
                    </Button>
                  </Button.Group>
                }
              />
            </Col>

          </Row>

          {
            showAddForm &&
            <Modal
              title={app.translate('routes.home.attendance.shift.Setting Dates')}
              visible={showAddForm}
              onOk={this._handleAdded}
              onCancel={() => this.setState({
                showAddForm: false,
              })}
            >
              <Row
                gutter={16}
              >

                <Col
                  xs={24}
                >
                  <WorkingHoursList
                    reference={(input) => this.workingHoursList = input}
                    selected={[]}
                  />
                </Col>

              </Row>
            </Modal>
          }

          {
            workingHours &&
            <Modal
              title={app.translate('routes.home.attendance.working-hours.Removing Working Hour')}
              visible={!!workingHours}
              onOk={this._handleRemove}
              onCancel={() => this.setState({
                workingHours: null,
              })}
            >
              <Row
                gutter={16}
              >

                <Col
                  xs={24}
                >
                  <WorkingHoursRemoveList
                    reference={(input) => this.workingHoursRemoveList = input}
                    items={workingHours}
                    icon={(item) => <MaterialIcon name="format-color-fill" style={{color: item.color}}/>}
                    loading={false}
                    pagination={false}
                    selected={workingHours.pluck('id')}
                  />
                </Col>

              </Row>
            </Modal>
          }

        </Card>

      </Spin>
    );
  }
}
