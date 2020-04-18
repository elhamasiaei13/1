import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Form, Button, Row, Col, Select as AntdSelect} from 'antd';
import MaterialIcon from 'components/common/MaterialIcon';
import {Field, reduxForm, getFormValues, isPristine} from 'redux-form';
import jMoment from 'moment-jalaali';
import TimePicker from 'components/common/TimePicker';
import uuidv1 from 'uuid/v1';
import {Text, TextArea, Date, Time, Checkbox, Cascader, Select, Number, File, Rule, Position, Hidden} from 'components/redux-form';

@autobind
/**
 *
 */
export default class DailyReport extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    required: PropTypes.bool,
    meta: PropTypes.object,
    validateStatus: PropTypes.oneOf([
      'success', 'warning', 'error', 'validating',
    ]),
    defaultValue: PropTypes.any,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    addonBefore: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    addonAfter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    prefix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    onPressEnter: PropTypes.func,
    autosize: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        minRows: PropTypes.number,
        maxRows: PropTypes.number,
      }),
    ]),
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
    }),
    rest: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    label: undefined,
    validateStatus: undefined,
    required: false,
    input: {},
    disabled: false,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }


  /**
   *
   */
  componentWillMount() {
    super.componentWillMount();

    const {input, defaultValue} = this.props;
    input.onChange(defaultValue);
  }

  /**
   *
   */
  componentDidMount() {

  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (( !app._.isEqual(this.props.dateFromBack, np.dateFromBack) || !app._.isEqual(this.props.dateToGoing, np.dateToGoing))) {
      np.input.onChange(this._dailyReport(np.input.value, np.dateFromBack, np.dateToGoing));
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    // super.componentWillUnmount();
  }


  _dailyReport(dailyReport = [], dateFromBack, dateToGoing) {
    let _return = [];

    let diff = jMoment(dateFromBack).diff(dateToGoing, 'day');
    let day;

    if (dateFromBack && dateFromBack) {
      if (diff >= 0) {
        for (let i = 0; i <= diff; i++) {
          day = jMoment(dateToGoing).add(i, 'day').format('YYYY-MM-DD');

          let _dailyReport = dailyReport.find((item) => item.date === day);

          _return.push(Object.assign({}, {date: day, timeFrom: '', timeTo: ''}, _dailyReport));
        }
      }
    }
    return _return;
  }

  _renderItem() {
    let children = [];
    let i = 0;
    let dateFromBack = this.props.dateFromBack;
    let dateToGoing = this.props.dateToGoing;
    let diff = jMoment(dateFromBack).diff(dateToGoing, 'day');
    let dailyReport = [];//this.props.values.values && this.props.values.values.dailyReport ? this.props.values.values.dailyReport : [];
    let day;
    if (dateFromBack && dateFromBack) {
      if (diff >= 0) {
        for (i = 0; i <= diff; i++) {
          day = jMoment(dateToGoing).add(i, 'day').format('YYYY-MM-DD');

          dailyReport[day] = day;

          // console.log(dailyReport);

          children.push(
            <Col sm={8} key={`col1_daily_report${day}`} style={{
              height: '82px',
            }}>
              <Field
                name={`values.dailyReport[${i}].date`}
                label={app.translate('components.form-builder.Date')}
                component={Date}
                required
                disabled
                //  value={dailyReport[day]}
              />
            </Col>,
            <Col sm={8} key={`col2_daily_report${day}`} style={{
              height: '82px',
            }}>
              <Field
                name={`values.dailyReport[${i}].timeFrom`}
                label={app.translate('components.form-builder.Time From')}
                component={Time}
                required
              />
            </Col>,
            <Col sm={8} key={`col3_daily_report${day}`} style={{
              height: '82px',
            }}>
              <Field
                name={`values.dailyReport[${i}].timeTo`}
                label={app.translate('components.form-builder.Time To')}
                component={Time}
                required
              />
            </Col>,
          );
        }
      } else {
        children.push(<Col sm={24} key={`daily_report${i}`}>تاریخ رسیدن از تاریخ برگشت بزرگتر است</Col>);
      }
    } else {
      children.push(<Col sm={24} key={`daily_report${i}`}>تاریخ رسیدن و تاریخ برگشت را وارد کنید</Col>);
    }
    return (<Row
      gutter={16}
      style={{
        padding: '8px 0px',
      }}
    >
      {children}
    </Row>);
  }

  /**
   *
   * @return {String}
   * @private
   */
  _validateStatus() {
    const {disabled, required, validateStatus, input, meta} = this.props;
    let _status = validateStatus;

    if (!disabled) {
      if (meta.asyncValidating) {
        _status = 'validating';
      } else if (meta.touched) {
        if (meta.error) {
          _status = 'error';
        } else {
          if (!required && app._.isEmpty(input.value)) {
            _status = 'warning';
          } else if (meta.valid) {
            _status = 'success';
          }
        }
      }
    }

    return _status;
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {
      input, defaultValue, size, onPressEnter, addonBefore,
      addonAfter, disabled, prefix, suffix, label,
      required, validateStatus, meta, ...rest
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={this._validateStatus()}
        hasFeedback
      >
        {this._renderItem()}
      </Form.Item>
    );
  }


}
