import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import { Input, Button } from 'antd';
import Calendar from 'components/common/Calendar';
import MaterialIcon from 'components/common/MaterialIcon';
import DatePicker from '../DatePicker';

@autobind
/**
 *
 */
export default class RangePicker extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.array,
    min: PropTypes.string,
    max: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    let value = RangePicker._value(props);

    this.state = {
      value,
      inputStart: value && value[0] ? value[0].replace(/(-)/g, ' / ') : '',
      inputEnd: value && value[1] ? value[1].replace(/(-)/g, ' / ') : '',
      active: false,
      min: props.min && jMoment(props.min.substr(0, 10), 'YYYY-MM-DD').format('jYYYY-jMM-jDD'),
      max: props.max && jMoment(props.max.substr(0, 10), 'YYYY-MM-DD').format('jYYYY-jMM-jDD'),
    };
  }

  /**
   *
   */
  componentDidMount() {
    document.addEventListener('click', this._onOutsideClick, false);
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (this.props.value !== np.value) {
      let value = RangePicker._value(np);

      this.setState({
        value,
        inputStart: value && value[0] ? value[0].replace(/(-)/g, ' / ') : '',
        inputEnd: value && value[1] ? value[1].replace(/(-)/g, ' / ') : '',
      });
    }

    if (this.props.min !== np.min) {
      this.setState({
        min: np.min && jMoment(np.min.substr(0, 10), 'YYYY-MM-DD').format('jYYYY-jMM-jDD'),
      });
    }

    if (this.props.max !== np.max) {
      this.setState({
        max: np.max && jMoment(np.max.substr(0, 10), 'YYYY-MM-DD').format('jYYYY-jMM-jDD'),
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    document.removeEventListener('click', this._onOutsideClick, false);
  }

  /**
   *
   * @param {Object} props
   * @return {*}
   * @private
   */
  static _value(props) {
    if (props.value && !app._.isEmpty(props.value)) {
      return [
        props.value[0] && jMoment(props.value[0].substr(0, 10), 'YYYY-MM-DD').format('jYYYY-jMM-jDD'),
        props.value[1] && jMoment(props.value[1].substr(0, 10), 'YYYY-MM-DD').format('jYYYY-jMM-jDD'),
      ];
    }

    return undefined;
  }

  /**
   *
   * @param {*} e
   * @private
   */
  _onOutsideClick(e) {
    if (!this.node.contains(e.target)) {
      this.setState({
        active: false,
      });
    }
  }

  /**
   *
   * @param {String} string
   * @param {Number} [max=Infinity]
   * @param {Number} [min=1]
   * @param {Number} [length=2]
   * @return {String}
   * @static
   * @private
   */
  static _checkValue(string, max = Infinity, min = 1, length = 2) {
    if (string.length === length) {
      return sprintf(`%0${length}s`, Math.min(max, Math.max(min, +string)));
    }

    return string;
  }

  /**
   *
   * @param {Object[]} selected
   * @param {Function} [callback=(function())]
   * @private
   */
  _onCalendarChange(selected, callback = () => {}) {
    const { value } = this.state;

    this.setState({
      active: false,
    }, () => {
      if (selected.length > 0 && (!value || !(value[0] && value[1]) || !(selected[0].start === value[0] && selected[0].end === value[1]))) {
        callback();
      }
    });
  }

  /**
   *
   * @param {Object[]} selected
   * @private
   */
  _onStartCalendarChange(selected) {
    const { onChange } = this.props;

    this._onCalendarChange(selected, () => {
      onChange([
        jMoment(selected[0].start, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
        jMoment(selected[0].end, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
      ]);
    });
  }

  /**
   *
   * @param {Object[]} selected
   * @private
   */
  _onEndCalendarChange(selected) {
    const { value } = this.state;
    const { onChange } = this.props;

    this._onCalendarChange(selected, () => {
      onChange([
        jMoment(value[0], 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
        jMoment(selected[0].end, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
      ]);
    });
  }

  /**
   *
   * @param {*} event
   * @param {String} [inputKey='inputStart']
   * @private
   */
  _onChange(event, inputKey = 'inputStart') {
    const { value } = this.state;
    const { onChange } = this.props;
    let input = event.target.value;
    let min = this.state.min;
    let max = this.state.max;

    if (inputKey === 'inputStart') {
      if (value && value[1] && (!max || value[1] < max)) {
        max = value[1];
      }
    } else {
      if (value && value[0] && (!min || value[0] > min)) {
        min = value[0];
      }
    }

    let values = [];

    input.split('/')
      .map((value, index) => {
        value = value.replace(/\D/g, '');

        switch (index) {
          case 2:
            values.push(DatePicker._checkValue(
              value.substr(0, 2),
              ((max && max.substr(0, 4) === values[0] && max.substr(5, 2) === values[1]) ? +max.substr(8, 2) : jMoment.jDaysInMonth(+values[0], values[1] - 1)),
              ((min && min.substr(0, 4) === values[0] && min.substr(5, 2) === values[1]) ? +min.substr(8, 2) : 1)
            ));
            break;
          case 1:
            values.push(DatePicker._checkValue(
              value.substr(0, 2),
              ((max && max.substr(0, 4) === values[0]) ? +max.substr(5, 2) : 12),
              ((min && min.substr(0, 4) === values[0]) ? +min.substr(5, 2) : 1)
            ));
            break;
          case 0:
          default:
            values.push(DatePicker._checkValue(
              value.substr(0, 4),
              (max ? +max.substr(0, 4) : 3000),
              (min ? +min.substr(0, 4) : 1),
              4
            ));
            break;
        }
      });

    if (values.length === 1 && values[0].length === 4) {
      values.push('');
    }

    if (values.length === 2 && values[1].length === 2) {
      values.push('');
    }

    const output = values.join(' / ');

    this.setState({
      [inputKey]: output,
    }, () => {
      if (output.length === 14) {
        let _value = output.replace(/(\D\/\D)/g, '-');

        if (_value !== this.state.value) {
          if (inputKey === 'inputStart') {
            onChange([
              jMoment(_value, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
              value && value[1] ? jMoment(value[1], 'jYYYY-jMM-jDD').format('YYYY-MM-DD') : jMoment(_value, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
            ]);
          } else {
            onChange([
              jMoment(value[0], 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
              jMoment(_value, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'),
            ]);
          }
        }
      } else if (output.length === 0) {
        onChange(null);
      }
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { min, max, value, inputStart, inputEnd, active } = this.state;
    const { onChange, ...rest } = this.props;

    return (
      <div
        ref={(node) => this.node = node}
      >

        <Input.Group compact>
          <Input
            {...app._.omit(rest, ['onBlur', 'onFocus'])}
            prefix={<MaterialIcon name="calendar-range"/>}
            placeholder={app.translate('main.Start date')}
            type="text"
            dir="auto"
            onChange={(event) => this._onChange(event, 'inputStart')}
            onClick={() => this.setState({active: 'start'})}
            onPressEnter={() => this.setState({
              active: 'end',
              inputStart: value && value[0] ? value[0].replace(/(-)/g, ' / ') : '',
            })}
            value={inputStart}
            style={{
              width: '50%',
            }}
          />
          <Input
            {...app._.omit(rest, ['onBlur', 'onFocus'])}
            disabled={!value || !value[0]}
            prefix={<MaterialIcon name="calendar-range"/>}
            placeholder={app.translate('main.End date')}
            type="text"
            dir="auto"
            onChange={(event) => this._onChange(event, 'inputEnd')}
            onClick={() => value && value[0] && this.setState({active: 'end'})}
            onPressEnter={() => this.setState({
              active: false,
              inputEnd: value && value[1] ? value[1].replace(/(-)/g, ' / ') : '',
            })}
            value={inputEnd}
            style={{
              width: '50%',
            }}
          />
        </Input.Group>

        {
          active === 'start' &&
          <div
            onKeyUp={(e) => /Tab/.test(e.key) && this.setState({active: 'end'})}
            className="left-0"
            style={{
              position: 'absolute',
              margin: 8,
              width: 350,
              zIndex: 1029,
              boxShadow: '0 5px 10px rgba(0, 0, 0, .5)',
            }}
          >
            <Calendar
              ref={(input) => this._startCalendar = input}
              mode="monthly"
              year={value && value[0] ? jMoment(value[0], 'jYYYY-jMM-jDD').jYear() : undefined}
              month={value && value[0] ? jMoment(value[0], 'jYYYY-jMM-jDD').jMonth() : undefined}
              selected={value && value[0] ? [{start: value[0], end: value[1]}] : []}
              disabled={(date) => {
                if (value && value[1] && (!max || value[1] < max) && date > value[1]) {
                  return true;
                } else if (max && date > max) {
                  return true;
                }

                return !!(min && date < min);
              }}
              footer={
                <Button.Group
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 8,
                  }}
                >
                  <Button
                    type="danger"
                    onClick={() => onChange(null)}
                  >
                    {app.translate('main.Reset')}
                  </Button>
                  <Button
                    onClick={() => {
                      let start = `${sprintf('%04s', this._startCalendar.year)}-${sprintf('%02s', this._startCalendar.month + 1)}-01`;
                      if (min && min > start) {
                        start = min;
                      } else if (max && max < start) {
                        start = max;
                      }

                      let end = `${sprintf('%04s', this._startCalendar.year)}-${sprintf('%02s', this._startCalendar.month + 1)}-${jMoment.jDaysInMonth(this._startCalendar.year, this._startCalendar.month)}`;
                      if (max && max < end) {
                        end = max;
                      }

                      this._onStartCalendarChange([{
                        start,
                        end,
                      }]);
                    }}
                  >
                    {app.translate('main.All Month')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      let today = jMoment().format('jYYYY-jMM-jDD');

                      this._onStartCalendarChange([{
                        start: today,
                        end: today,
                      }]);
                    }}
                  >
                    {app.translate('main.Today')}
                  </Button>
                </Button.Group>
              }
              onChange={(selected) => this._onStartCalendarChange(((value && value[1]) ? [{start: selected[0].start, end: value[1]}] : selected))}
            />
          </div>
        }

        {
          active === 'end' &&
          <div
            onKeyUp={(e) => /Tab/.test(e.key) && this.setState({active: false})}
            className="right-0"
            style={{
              position: 'absolute',
              margin: 8,
              width: 350,
              zIndex: 1029,
              boxShadow: '0 5px 10px rgba(0, 0, 0, .5)',
            }}
          >
            <Calendar
              mode="monthly"
              year={value && value[1] ? jMoment(value[1], 'jYYYY-jMM-jDD').jYear() : undefined}
              month={value && value[1] ? jMoment(value[1], 'jYYYY-jMM-jDD').jMonth() : undefined}
              selected={value && value[1] ? [{start: value[0], end: value[1]}] : []}
              disabled={(date) => {
                if (value && value[0] && (!min || value[0] > min) && date < value[0]) {
                  return true;
                } else if (min && date < min) {
                  return true;
                }

                return !!(max && date > max);
              }}
              footer={
                <Button.Group
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 8,
                  }}
                >
                  <Button
                    type="danger"
                    onClick={() => this.setState({active: 'start'}, () => onChange(null))}
                  >
                    {app.translate('main.Reset')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      let today = jMoment().format('jYYYY-jMM-jDD');

                      this._onEndCalendarChange([{
                        start: today,
                        end: today,
                      }]);
                    }}
                  >
                    {app.translate('main.Today')}
                  </Button>
                </Button.Group>
              }
              onChange={this._onEndCalendarChange}
            />
          </div>
        }

      </div>
    );
  }
}
