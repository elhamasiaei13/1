import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import {Button, Dropdown, Menu} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import {Year} from './../Components';
import Mode from './Mode';

@autobind
/**
 *
 * @extends Mode
 */
export default class Yearly extends Mode {
  /**
   *
   * @return {Object}
   */
  static get propTypes() {
    return Object.assign({}, Mode.propTypes, {
      onChange: PropTypes.func,
      disabled: PropTypes.func,
    });
  }

  /**
   *
   * @return {Object}
   */
  static get defaultProps() {
    return Object.assign({}, Mode.defaultProps, {});
  }

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this._initialState, {});
  }

  /**
   *
   * @param {Number} month
   * @private
   */
  _onMonthClick(month) {
    const {onChange, disabled} = this.props;
    const {year} = this.state;
    let _monthDays = jMoment.jDaysInMonth(year, month);
    let _start = `${year}-${sprintf('%02s', month + 1)}-01`;
    let _selected = [];

    let _tmpStart;
    let _tmpDate = _start;
    for (let _i = 0; _i < _monthDays; _i++) {
      if (disabled(_tmpDate)) {
        if (_tmpStart) {
          _selected.push({
            start: _tmpStart,
            end: jMoment(_tmpDate, 'jYYYY-jMM-jDD').add(-1, 'day').format('jYYYY-jMM-jDD'),
          });

          _tmpStart = null;
        }

        _tmpDate = jMoment(_tmpDate, 'jYYYY-jMM-jDD').add(1, 'day').format('jYYYY-jMM-jDD');
        continue;
      }

      if (!_tmpStart) {
        _tmpStart = _tmpDate;
      }

      _tmpDate = jMoment(_tmpDate, 'jYYYY-jMM-jDD').add(1, 'day').format('jYYYY-jMM-jDD');
    }

    if (_tmpStart) {
      _selected.push({
        start: _tmpStart,
        end: jMoment(_tmpDate, 'jYYYY-jMM-jDD').add(-1, 'day').format('jYYYY-jMM-jDD'),
      });
    }

    let selected = this.state.selected;

    _selected.map((_item) => selected = this._changeSelected(_item.start, _item.end, selected));

    this.setState({
      selected,
    }, () => onChange(selected));
  }

  /**
   *
   * @param {Number} month
   * @param {Number} weekDay
   * @private
   */
  _onWeekDayClick(month, weekDay) {
    const {selected} = this.state;
    const {onChange, disabled} = this.props;
    const {year} = this.state;
    let _lastDay = jMoment.jDaysInMonth(year, month);
    let _selected = app._.cloneDeep(selected);
    for (let _day = 0; _day < _lastDay; _day++) {
      let _date = `${year}-${sprintf('%02s', month + 1)}-${sprintf('%02s', _day + 1)}`;
      if (weekDay === jMoment(_date, 'jYYYY-jMM-jDD').weekday() && !disabled(_date)) {
        _selected = this._changeSelected(_date, _date, _selected);
      }
    }

    this.setState({
      selected: _selected,
    }, () => onChange(_selected));
  }

  /**
   *
   * @param {String} start
   * @private
   */
  _onMouseDown(start) {
    this.setState({
      start,
    });
  }

  /**
   *
   * @param {String} end
   * @private
   */
  _onMouseUp(end) {
    const {start} = this.state;
    const {onChange, disabled} = this.props;
    let _selected = [];
    let _start = '';
    let _end = '';

    if (start > end) {
      _start = end;
      _end = start;
    } else {
      _start = start;
      _end = end;
    }

    let _tmpStart;
    let _tmpDate = _start;
    while (_tmpDate <= _end) {
      if (disabled(_tmpDate)) {
        if (_tmpStart) {
          _selected.push({
            start: _tmpStart,
            end: jMoment(_tmpDate, 'jYYYY-jMM-jDD').add(-1, 'day').format('jYYYY-jMM-jDD'),
          });

          _tmpStart = null;
        }

        _tmpDate = jMoment(_tmpDate, 'jYYYY-jMM-jDD').add(1, 'day').format('jYYYY-jMM-jDD');
        continue;
      }

      if (!_tmpStart) {
        _tmpStart = _tmpDate;
      }

      _tmpDate = jMoment(_tmpDate, 'jYYYY-jMM-jDD').add(1, 'day').format('jYYYY-jMM-jDD');
    }

    if (_tmpStart) {
      _selected.push({
        start: _tmpStart,
        end: jMoment(_tmpDate, 'jYYYY-jMM-jDD').add(-1, 'day').format('jYYYY-jMM-jDD'),
      });
    }

    let selected = app._.cloneDeep(this.state.selected);

    _selected.map((_item) => selected = this._changeSelected(_item.start, _item.end, selected));

    if (start) {
      this.setState({
        selected,
        start: null,
      }, () => onChange(selected));
    }
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _title() {
    const {year} = this.state;

    return (
      <Dropdown
        key="year-select"
        overlay={(
          <Menu
            onClick={({key}) => this.setState({year: key * 1})}
            selectedKeys={[`${year}`]}
            style={{
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            { /* //TODO change year */
              app.range(this.state.minYear, this.state.maxYear).map((_year) =>
                <Menu.Item key={`${_year}`}>
                  {_year}
                </Menu.Item>,
              )
            }
          </Menu>
        )}
        trigger={['click']}
      >
        <a className="ant-dropdown-link">
          {year} <MaterialIcon name="chevron-down"/>
        </a>
      </Dropdown>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _extra() {
    const {year} = this.state;
    const {loading} = this.props;

    // noinspection RequiredAttributes
    return (
      <Button.Group>
        <Button
          type="primary"
          icon="left"
          disabled={loading || (year - 1) < this.state.minYear}
          onClick={() => this.setState({year: (year - 1) >= this.state.minYear ? (year - 1) : this.state.minYear })}
        />
        <Button
          type="dashed"
          disabled={loading || year === jMoment().jYear()}
          onClick={() => this.setState({year: jMoment().jYear()})}
        >
          {app.translate('main.Current Year')}
        </Button>
        <Button
          type="primary"
          icon="right"
          disabled={loading|| (year + 1) > this.state.maxYear}
          onClick={() => this.setState({year: (year + 1) <= this.state.maxYear ? (year + 1) : this.state.maxYear })}
        />
      </Button.Group>
    );
  }

  /**
   *
   * @return {XML}
   * @private
   */
  get _component() {
    const {year, start, selected} = this.state;
    const {...rest} = this.props;

    return (
      <Year
        {...app._.omit(rest, ['onChange'])}
        year={year}
        onMonthClick={this._onMonthClick}
        onWeekDayClick={this._onWeekDayClick}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        start={start}
        selected={selected}
      />
    );
  }
}
