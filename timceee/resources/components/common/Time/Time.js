import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

@autobind
/**
 *
 */
export default class Time extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    let time = ['', ''];

    if (props.value) {
      time = props.value.replace(/( )/g, '').split(':');

      if (time.length === 1) {
        time.concat('0');
      }
    }

    this.state = {
      hours: time[0],
      minutes: time[1],
    };
  }

  /**
   *
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      let time = ['', ''];

      if (nextProps.value) {
        time = nextProps.value.replace(/( )/g, '').split(':');

        if (time.length === 1) {
          time.concat('0');
        }
      }

      this.setState({
        hours: time[0],
        minutes: time[1],
      });
    }
  }

  /**
   *
   * @param {*} event
   * @param {String} field
   */
  _onChange(event, field) {
    const { onChange } = this.props;
    const input = event.target.value;

    let value = input.replace(/\D/g, '');

    if (field === 'minutes' && value && value !== '') {
      value = Math.max(0, +value);
      value = Math.min(59, value);
      value = `${value}`;
    }

    this.setState({
      [field]: value,
    }, () => {
      if (!app._.isEmpty(this.state.hours) && !app._.isEmpty(this.state.minutes)) {
        onChange(`${this.state.hours}:${this.state.minutes}`);
      } else if (app._.isEmpty(this.state.hours) && app._.isEmpty(this.state.minutes)) {
        onChange(null);
      }
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { hours, minutes } = this.state;
    const { disabled } = this.props;

    return (
      <div className="time-input">
        <Input.Group>
          <Input
            type="number"
            placeholder={app.translate('main.Hour')}
            value={hours}
            onChange={(event) => this._onChange(event, 'hours')}
            style={{ width: '55%', textAlign: 'center' }}
            addonAfter=" : "
            disabled={disabled}
            min={0}
          />
          <Input
            type="number"
            placeholder={app.translate('main.Minute')}
            value={minutes}
            onChange={(event) => this._onChange(event, 'minutes')}
            style={{ width: '45%', textAlign: 'center' }}
            disabled={disabled}
            min={0}
            max={59}
          />
        </Input.Group>
      </div>
    );
  }
}
