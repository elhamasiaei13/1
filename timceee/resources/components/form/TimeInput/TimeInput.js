import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/MaterialIcon';
import {Input} from 'antd';
import uuidv1 from 'uuid/v1';

@autobind
/**
 *
 */
export default class TimeInput extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    format: PropTypes.string,
    separator: PropTypes.string,
    max: PropTypes.string,
    min: PropTypes.string,
  };
  static defaultProps = {
    format: 'H:i',
    max: '23:59',
    min: '00:00',
    separator: ':',
    name: `TimeInput${uuidv1()}`,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this._value(props.value),
    };
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(np.value, this.state.value)) {
      this.setState({value: this._value(np.value)});
    }
  }

  _value(_value) {
    let {format, separator, name, max, min} = this.props;
    let returnValue = '';
    if (_value) {
      let value = _value.split(separator);
      let oldValue = this.state && this.state.value ? this.state.value.split(separator) : [];
      let _format = format.split(separator);
      let _max = max.split(separator);
      let _min = min.split(separator);
      let __max = 59;
      let __min = 0;
      let temp = 0;
      let changePosition = 0;
      let arrayFormat = ['H', 'h', 'n', 'N', 'i', 'I'];
      let change = false;

      for (let i in _format) {
        if (value[i] && arrayFormat.indexOf(_format[i]) > -1) {
          temp = parseInt(value[i]);
          temp = (Number.isInteger(temp) ? temp : 0);
          // console.log(temp);
          // if (temp > 100) {
          //   temp = parseInt(temp / 10);
          // }
          if (_max[i]) {
            __max = parseInt(_max[i]);
          } else {
            __max = 59;
          }
          if (_min[i]) {
            __min = parseInt(_min[i]);
          } else {
            __min = 59;
          }
          if (temp < __min) {
            temp = __min;
          }
          switch (_format[i]) {
            case 'H':
              if (temp > 23) {
                temp = 23;
              }
              break;
            case 'h':
              if (temp > 12) {
                temp = 12;
              }
              break;
            case 'n':
            case 'N':
              if (temp > __max) {
                temp = __max;
              }
              break;
            case 'i':
            case 'I':
              if (temp > 59) {
                temp = 59;
              }
              break;
          }
          if (i + 1 < value.length || value[i].length > 1) {
            returnValue += (temp > 9 ? temp : '0' + temp);
          } else {
            returnValue += temp;
          }
          // console.log(i + 1 < _format.length, i + 1 < value.length, _value.length > (_max[i] ? _max[i].length : 2));
          if (i + 1 < _format.length && _value.length >= (_max[i] ? _max[i].length : 2)) {
            returnValue += separator;
          }
        }
        if (oldValue[i] && oldValue[i] !== value[i]) {
          change = true;
          changePosition = 0;
          for (let k = 0; k <= i; k++) {
            if (value[k]) {
              changePosition += value[k].length; // ((_max[k] ? _max[k].length : 2) + 1);
            }
           // if (k > 0)
            {
              changePosition += 1;
            }
          }
        }
      }

      if (changePosition === 0 && !change) {
        changePosition = returnValue.length;
      }
      if (document.getElementById(`${name}`)) {
        setTimeout(() => {
          document.getElementById(`${name}`).setSelectionRange(changePosition, changePosition);
        }, 5);
      }
    }
    return returnValue;
  }

  _onChange(e) {
    const {onChange} = this.props;
    let value = this._value(e.target.value);
    this.setState({value: value}, () => {
      if (onChange) {
        onChange({target: {value: value}});
      }
    });
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {name, separator, ...rest} = this.props;
    const {value} = this.state;

    return (
      <Input
        prefix={<Icon name="clock"/>}
        {...rest}
        type="text"
        dir="auto"
        id={name}
        name={name}
        value={value}
        onChange={this._onChange}
      />
    );
  }
}
