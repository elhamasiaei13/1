import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import Day from './Day';
import {Card} from 'antd';

jMoment.loadPersian({dialect: 'persian-modern'});

const weekDays = [
  'ش',
  'ی',
  'د',
  'س',
  'چ',
  'پ',
  'ج',
];

@autobind
/**
 *
 */
export default class Month extends React.PureComponent {
  static propTypes = {
    year: PropTypes.number,
    month: PropTypes.number,
    selected: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
      }),
    ),
    start: PropTypes.string,
    disabled: PropTypes.func,
    onMonthClick: PropTypes.func,
    onWeekDayClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        color: PropTypes.string,
        content: PropTypes.string,
      }),
    ),
    statuses: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        color: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    title: PropTypes.bool,
  };

  static defaultProps = {
    year: jMoment().jYear(),
    disabled: (date) => {
    },
    onMonthClick: (month) => {
    },
    // onWeekDayClick: (month, weekDay) => {
    // },
    onMouseDown: (date) => {
    },
    onMouseUp: (date) => {
    },
    month: 0,
    events: [],
    statuses: [],
    selected: [],
    start: null,
    title: true,
  };

  /**
   *
   * @param {String} date
   * @return {String|Boolean}
   * @private
   */
  _isSelected(date) {
    const {selected, start} = this.props;
    let _isSelected = false;

    for (let _selected of selected) {
      if (_selected.start === date && _selected.end === date) {
        _isSelected = true;
        break;
      } else if (_selected.start === date) {
        _isSelected = 'start';
        break;
      } else if (_selected.end === date) {
        _isSelected = 'end';
        break;
      } else if (_selected.start < date && _selected.end > date) {
        _isSelected = 'range';
        break;
      }
    }

    if (start === date) {
      _isSelected = 'selecting';
    }

    return _isSelected;
  }

  /**
   *
   * @return {Array}
   * @private
   */
  _renderDays() {
    const {year, month, events, statuses, onMouseDown, onMouseUp, start, disabled} = this.props;
    let _days = [];
    /**
     * including previous month and next month too
     * @type {number}
     * @private
     */
    let _total = 42;

    /**
     * let's count how many days this month has
     * @type {number}
     * @private
     */
    let _totalMonthDays = jMoment.jDaysInMonth(year, month);

    /**
     * do you know which day of week is first day of this month ?
     * @type {number}
     * @private
     */
    let _firstWeekDay = jMoment(`${year}-${month + 1}-1`, 'jYYYY-jM-jD').weekday();

    /**
     * those days that belong to next month to put empty day just to match all months at the same size
     * @type {number}
     * @private
     */
    let _nextMontDays = _total - (_firstWeekDay + _totalMonthDays);

    /**
     * do you know which day of week is first day of next month ?
     * @type {number}
     * @private
     */
    let _nextMonthFirstWeekDay = 0;
    if (month === 11) {
      _nextMonthFirstWeekDay = jMoment(`${year + 1}-1-1`, 'jYYYY-jM-jD').weekday();
    } else {
      _nextMonthFirstWeekDay = jMoment(`${year}-${month + 2}-1`, 'jYYYY-jM-jD').weekday();
    }

    /**
     * then, let's find out how many week (row) our table should have
     * @type {number}
     * @private
     */
    let _totalWeeks = 6;

    /**
     * this little fella is sort of a counter
     * @type {number}
     * @private
     */
    let _day = 1;

    /**
     * and this other little fella is sort of a counter too
     * @type {number}
     * @private
     */
    let _nextMonthDay = 1;

    for (let _week = 1; _week <= _totalWeeks; _week++) {
      let _weekDays = [];

      if (_firstWeekDay === 0) {
        for (let _weekDay = 1; _weekDay < 8 && _day <= _totalMonthDays; _weekDay++) {
          let _date = `${sprintf('%04s', year)}-${sprintf('%02s', month + 1)}-${sprintf('%02s', _day)}`;
          let _events = events.filter((event) => event.date === _date);
          let index = statuses.findIndex((status) => status.date === _date);
          let _status = statuses[index];
          if (_weekDay === 7) {
            if (_status && _status.static) {
              _status = Object.assign({}, _status, {
                calendarDayTypeId: 2,
                date: _date,
                description: 'پایان هفته',
                color: '#cc0000',
                title: 'روز تعطیل رسمی',
              });
            } else {
              _status = Object.assign({}, {
                calendarDayTypeId: 2,
                date: _date,
                description: 'پایان هفته',
                color: '#cc0000',
                title: 'روز تعطیل رسمی',
              }, _status);
            }
            if (index > -1) {
              statuses[index] = _status;
            } else {
              statuses.push(_status);
            }
          }

          _weekDays.push(
            <Day
              key={_date}
              date={_date}
              events={_events}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              disabled={disabled(_date)}
              selected={this._isSelected(_date)}
              start={start}
              status={_status}
            />,
          );

          _day++;
        }

        if ((_nextMonthFirstWeekDay !== 0 || _week === 6) && _day > _totalMonthDays) {
          for (let _weekDay = 1; _weekDay < 8 - _nextMonthFirstWeekDay && _nextMonthDay <= _nextMontDays; _weekDay++) {
            _weekDays.push(
              <Day
                key={`empty-next-month-${month}-day-${_weekDay}`}
              />,
            );

            _nextMonthDay++;
          }

          _nextMonthFirstWeekDay = 0;
        }
      } else {
        for (let _weekDay = 1; _weekDay <= _firstWeekDay && _day <= _totalMonthDays; _weekDay++) {
          _weekDays.push(
            <Day
              key={`empty-month-${month}-day-${_weekDay}`}
            />,
          );
        }
        for (let _weekDay = 1; _weekDay < 8 - _firstWeekDay && _day <= _totalMonthDays; _weekDay++) {
          let _date = `${sprintf('%04s', year)}-${sprintf('%02s', month + 1)}-${sprintf('%02s', _day)}`;

          let _events = events.filter((event) => event.date === _date);
          let index = statuses.findIndex((status) => status.date === _date);
          let _status = statuses[index];
          if (_weekDay === 7 - _firstWeekDay) {
            if (_status && _status.static) {
              _status = Object.assign({}, _status, {
                calendarDayTypeId: 2,
                date: _date,
                description: 'پایان هفته',
                color: '#cc0000',
                title: 'روز تعطیل رسمی',
              });
            } else {
              _status = Object.assign({}, {
                calendarDayTypeId: 2,
                date: _date,
                description: 'پایان هفته',
                color: '#cc0000',
                title: 'روز تعطیل رسمی',
              }, _status);
            }
            if (index > -1) {
              statuses[index] = _status;
            } else {
              statuses.push(_status);
            }
          }

          _weekDays.push(
            <Day
              key={_date}
              date={_date}
              events={_events}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              disabled={disabled(_date)}
              selected={this._isSelected(_date)}
              start={start}
              status={_status}
            />,
          );

          _day++;
        }

        _firstWeekDay = 0;
      }

      _days.push(
        <tr
          key={`week-${_week}`}
        >
          {_weekDays}
        </tr>,
      );
    }

    return _days;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {month, onMonthClick, onWeekDayClick, title} = this.props;

    return (
      <Card
        className="month"
      >
        <table
          style={{
            borderCollapse: 'separate',
            width: '100%',
          }}
        >
          <thead>
          {
            title &&
            <tr>
              <th
                colSpan="7"
                className="month-name"
                onClick={() => onMonthClick(month)}
              >
                {jMoment(month + 1, 'jM').format('jMMMM')}
              </th>
            </tr>
          }
          <tr>
            {
              weekDays.map((weekDay, index) => (
                <th
                  key={index}
                  onClick={() => !!onWeekDayClick && onWeekDayClick(month, index)}
                  className={`week-day ${!!onWeekDayClick ? 'selectable' : ''}`}
                >
                  {weekDay}
                </th>
              ))
            }
          </tr>
          </thead>
          <tbody>
          {this._renderDays()}
          </tbody>
        </table>
      </Card>
    );
  }
}
