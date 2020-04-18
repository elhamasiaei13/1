import React from 'react';
import PropTypes from 'prop-types';
import 'clockpicker/dist/jquery-clockpicker.min';
import 'clockpicker/dist/jquery-clockpicker.min.css';

@autobind
/**
 *
 */
export default class TimePicker extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    max: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([false]),
    ]),
    name: PropTypes.string,
  };

  static defaultProps = {
    max: 23,
    name: 'TimePicker',
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      input: props.value ? props.value.replace(/( )/g, '').replace(/(:)/g, ' : ').slice(0, 7) : '',
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {max, onChange, name} = this.props;

    if (max !== false && max < 24) {
      $(this.clockPicker).clockpicker({
        autoclose: true,
      }).change(function () {
        // eslint-disable-next-line

        if (name !== 'TimePicker') {
          onChange(this.value ? this.value.replace(/ /g, '') : this.value, name);
        } else {
          onChange(this.value ? this.value.replace(/ /g, '') : this.value);
        }
      });
    }
  }

  /**
   *
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        input: nextProps.value ? nextProps.value.replace(/( )/g, '').replace(/(:)/g, ' : ').slice(0, 7) : '',
      });
    }
  }

  /**
   *
   * @param  {String} value
   * @param  {Number} [max]
   * @return {String}
   * @static
   */
  _check(value, max) {
    if (!max) {
      max = this.props.max;
    }

    if (max && value > sprintf('%02s', max)) {
      return sprintf('%02s', max);
    }

    if (value < 0) {
      return 0;
    }

    return value;
  }

  /**
   *
   * @param {*} event
   */
  _onChange(event) {
    const {onChange, name} = this.props;
    let input = event.target.value;

    if (/\D:$/.test(input)) {
      input = input.substr(0, input.length - 3);
    }

    let values = input.split(':').map((value) => {
      return value.replace(/\D/g, '');
    });

    let output = '';

    if (values.length === 2) {
      output = this._check(values[0]);
      output = `${output} : ${this._check(values[1], 59)}`;
    } else if (values[0]) {
      output = values[0];
      if (values[0].length === 2) {
        output = this._check(output);
        output = `${output} : `;
      }
    }

    output = output.slice(0, 7);

    this.setState({
      input: output,
    }, () => {
      if (output.length === 7) {
        let _value = output.replace(/ /g, '');

        if (_value !== this.props.value) {
          if (name !== 'TimePicker') {
            onChange(_value, name);
          } else {
            onChange(_value);
          }
        }
      } else if (output.length === 0) {
        if (name !== 'TimePicker') {
          onChange(null, name);
        } else {
          onChange(null);
        }
      }
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {input} = this.state;
    const {...rest} = this.props;

    return (
      <input
        {...rest}
        ref={(input) => this.clockPicker = input}
        dir="ltr"
        type="text"
        className="ant-input ant-input-lg"
        value={input}
        onChange={this._onChange}
      />
    );
  }
}
