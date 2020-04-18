import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import { Input, Button } from 'antd';
import Calendar from 'components/common/Calendar';
import MaterialIcon from 'components/common/MaterialIcon';

@autobind
/**
 *
 */
export default class DatePicker extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
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

    let value = (props.value && props.value !== '') ? jMoment(props.value.substr(0, 10), 'YYYY-MM-DD').format('jYYYY-jMM-jDD') : undefined;

    this.state = {
      value,
      input: value ? value.replace(/(-)/g, ' / ') : '',
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
      let value = (np.value && np.value !== '') ? jMoment(np.value.substr(0, 10), 'YYYY-MM-DD').format('jYYYY-jMM-jDD') : undefined;

      this.setState({
        value,
        input: value ? value.replace(/(-)/g, ' / ') : '',
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
   * @private
   */
  _onCalendarChange(selected) {
    const { value } = this.state;
    const { onChange } = this.props;

    this.setState({
      active: false,
    }, () => {
      if (selected.length > 0 && selected[0].start !== value) {
        onChange(jMoment(selected[0].start, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'));
      }
    });
  }

  /**
   *
   * @param {*} event
   * @private
   */
  _onChange(event) {
    const { max, min } = this.state;
    const { onChange } = this.props;
    const input = event.target.value;

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
      input: output,
    }, () => {
      if (output.length === 14) {
        let _value = output.replace(/\D\/\D/g, '-');

        if (_value !== this.state.value) {
          onChange(jMoment(_value, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'));
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
    const { min, max, value, input, active } = this.state;
    const { onChange, ...rest } = this.props;

    return (
      <div
        ref={(node) => this.node = node}
        style={{
          position: 'relative',
        }}
      >

        <Input
          {...app._.omit(rest, ['onBlur', 'onFocus'])}
          prefix={<MaterialIcon name="calendar"/>}
          type="text"
          dir="auto"
          placeholder={jMoment().format('jYYYY / jMM / jDD')}
          onChange={this._onChange}
          onClick={() => this.setState({active: true})}
          onPressEnter={() => this.setState({
            active: false,
            input: value ? value.replace(/(-)/g, ' / ') : '',
          })}
          value={input}
        />

        {
          active &&
          <div
            onFocus={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onKeyUp={(e) => /Tab/.test(e.key) && this.setState({active: false})}
            style={{
              position: 'absolute',
              margin: 8,
              left: 0,
              zIndex: 1029,
              boxShadow: '0 5px 10px rgba(0, 0, 0, .5)',
              maxWidth: 380
            }}
          >
            <Calendar
              mode="monthly"
              year={value ? jMoment(value, 'jYYYY-jMM-jDD').jYear() : undefined}
              month={value ? jMoment(value, 'jYYYY-jMM-jDD').jMonth() : undefined}
              selected={value ? [{start: value, end: value}] : []}
              disabled={(date) => {
                if (min && date < min) {
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
                    onClick={() => onChange(null)}
                  >
                    {app.translate('main.Reset')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      let today = jMoment().format('jYYYY-jMM-jDD');

                      this._onCalendarChange([{
                        start: today,
                        end: today,
                      }]);
                    }}
                  >
                     {app.translate('main.Today')}
                   </Button>
                 </Button.Group>
               }
               onChange={this._onCalendarChange}
             />
           </div>
         }

      </div>
    );
  }
}
