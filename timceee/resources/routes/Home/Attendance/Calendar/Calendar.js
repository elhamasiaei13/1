import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import CalendarC from 'components/common/Calendar';
import Spin from 'components/common/Spin';
import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import {Card, Button, Row, Col, Form as AntdForm, Input, Select, Modal} from 'antd';
import {show, emptyCalendar, store, update, indexDayTypes} from './Module';
import {connect} from 'react-redux';

jMoment.loadPersian({usePersianDigits: false}); // TODO

@connect((state) => ({
  calendar: state.Attendance.Calendar.calendar,
  dayTypes: state.Attendance.Calendar.dayTypes,
}), {
  show,
  emptyCalendar,
  store,
  update,
  indexDayTypes,
})
@autobind
/**
 *
 */
export default class Calendar extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    show: PropTypes.func,
    emptyCalendar: PropTypes.func,
    item: PropTypes.object,
    calendar: PropTypes.object,
    dayTypes: PropTypes.array,
    store: PropTypes.func,
    update: PropTypes.func,
    indexDayTypes: PropTypes.func,
  };
  static defaultProps = {
    item: {
      id: 1,
    },
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      calendar: {
        id: 1,
        name: 'calendar',
      },
      item: props.item,
      type: {
        id: 1,
      },
      statuses: [],
      showAddForm: false,
      error: false,
      receiving: true,
      loading: false,
      saving: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexDayTypes, show} = this.props;
    const {item} = this.state;

    indexDayTypes(null, (err) => {
      if (!err) {
        if (item) {
          return show(item.id, {includes: ['days']});
        }

        this.setState({
          receiving: false,
        });
      }
    });
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
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
        calendar: np.calendar,
        statuses,
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyCalendar();
  }

  /**
   *
   * @param {Number} id
   * @return {Object}
   * @private
   */
  _getType(id) {
    const {dayTypes} = this.props;

    return dayTypes[dayTypes.findIndex((_dayType) => _dayType.id === id)];
  }

  /**
   *
   * @private
   */
  _onRemove() {
    const {statuses} = this.state;

    this.setState({
      loading: true,
    }, () => {
      const _selected = this.calendar.selected();
      let _statuses = app._.cloneDeep(statuses);
      let _indexes = [];

      _selected.map((_range) => {
        _statuses.map((_status, _index) => {
          if (_range.start <= _status.date && _status.date <= _range.end) {
            _indexes.push(_index);
          }
        });
      });

      _indexes.sort((a, b) => a - b);
      _indexes.reverse();
      _indexes.map((_index) => _statuses.splice(_index, 1));

      this.setState({
        loading: false,
        statuses: _statuses,
      }, () => this.calendar.reset());
    });
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
    const {statuses, type} = this.state;
    const _selected = this.calendar.selected();
    let _statuses = app._.cloneDeep(statuses);

    this.setState({
      loading: true,
    }, () => {
      _selected.map((_range) => {
        let _date = _range.start;

        for (let _moment = jMoment(_date, 'jYYYY-jMM-jDD'); _date <= _range.end; _moment.add(1, 'day'), _date = _moment.format('jYYYY-jMM-jDD')) {
          let _type = this._getType(type.id);

          let _status = {
            calendarDayTypeId: type.id,
            date: _date,
            title: _type.displayName,
            color: _type.color,
          };

          if (type.description && type.description !== '') {
            _status.description = type.description;
          }

          let _index = _statuses.findIndex((status) => status.date === _date);

          if (_index > -1) {
            _status.id = _statuses[_index].id;
            _statuses[_index] = _status;
          } else {
            _statuses.push(_status);
          }
        }
      });

      this.setState({
        loading: false,
        statuses: _statuses,
        type: {
          id: 1,
        },
        showAddForm: false,
      }, () => this.calendar.reset());
    });
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      if (obj[prop]) {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      } else {
        return true;
      }
    });
  }

  /**
   *
   * @private
   */
  _submit() {
    const {calendar, statuses} = this.state;
    const {store, update, onCancel} = this.props;
    let _statuses = app._.cloneDeep(statuses);

    this.setState({
      saving: true,
    }, () => {
      let _calendar = app._.cloneDeep(calendar);
      let days = [];
      _statuses.map((status) => {
        days.push({
          id: status.id,
          calendarDayTypeId: status.calendarDayTypeId,
          date: jMoment(status.date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
          description: status.description,
        });
      });

      let _days = this.removeDuplicates(days, 'id');

      _calendar = {
        ..._calendar,
        days: _days,
      };
      if (calendar.id) {
        update(calendar.id, _calendar, null, (err) => this.setState({saving: false}));
      } else {
        store(_calendar, null, (err) => this.setState({saving: false}));
      }
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {receiving, loading, saving, calendar, type, statuses, showAddForm, error} = this.state;
    const {onCancel, dayTypes} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={receiving}
      >
        <Card
          className="wrapper"
          title={app.translate('routes.home.attendance.calendar.Calendar')}
          extra={
            <Button.Group>
              <Button
                type="primary"
                disabled={loading}
                loading={saving}
                onClick={() => {
                  this._submit();
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
              xs={24}
              style={{
                height: '100%',
              }}
            >
              <CalendarC
                title={app.translate('routes.home.attendance.calendar.Edit Days')}
                ref={(input) => this.calendar = input}
                statuses={statuses}
                loading={loading}
                extra={
                  <Button.Group>
                    <Button
                      type="dashed"
                      icon="close"
                      disabled={loading}
                      onClick={() => this.calendar.reset()}
                    />
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

          <Modal
            title={app.translate('routes.home.attendance.calendar.Setting Dates')}
            visible={showAddForm}
            onOk={this._handleAdded}
            onCancel={() => this.setState({
              showAddForm: false,
              type: {
                id: 1,
              },
            })}
          >
            <Row
              gutter={16}
            >

              <Col
                xs={24} md={12}
              >
                <AntdForm.Item
                  label={app.translate('main.Description')}
                >
                  <Select
                    value={`${type.id}`}
                    onChange={(value) => this.setState({
                      type: {
                        ...type,
                        id: parseInt(value),
                      },
                    })}
                  >
                    {
                      dayTypes.map((dayType) =>
                        <Select.Option key={dayType.id} value={`${dayType.id}`}>
                          <MaterialIcon name="format-color-fill" style={{color: dayType.color}} size="tiny"/> {dayType.displayName}
                        </Select.Option>,
                      )
                    }
                  </Select>
                </AntdForm.Item>
              </Col>

              <Col
                xs={24} md={12}
              >
                <AntdForm.Item
                  label={app.translate('main.Description')}
                >
                  <Input.TextArea
                    value={type.description}
                    onChange={(event) => this.setState({
                      type: {
                        ...type,
                        description: event.target.value,
                      },
                    })}
                  />
                </AntdForm.Item>
              </Col>

            </Row>
          </Modal>

        </Card>
      </Spin>
    );
  }
}
