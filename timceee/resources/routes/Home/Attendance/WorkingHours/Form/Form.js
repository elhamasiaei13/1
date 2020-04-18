import React from 'react';
import MaterialIcon from 'components/common/MaterialIcon';
import asyncValidate from './asyncValidate';
import Spin from 'components/common/Spin';
import PropTypes from 'prop-types';
// import validate from './validate';
import {Text, TextArea, Time, Select, Color} from 'components/redux-form';
import {Card, Button, Row, Col, Select as AntdSelect} from 'antd';
import {show, emptyWorkingHour, store, update} from './../Module';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';

@reduxForm({
  form: 'working-hour-form',
  // validate,
  asyncValidate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);

    data.dayTo = data.dayTo * 1;
    data.timeFrom = `${data.timeFrom}:00`;
    data.timeTo = `${data.timeTo}:00`;
    data.beforeStart = `${data.beforeStart}:00`;
    data.afterEnd = `${data.afterEnd}:00`;

    if (props.workingHourId) {
      dispatch(update(props.workingHourId, data, null, (err, res) => !err && props.handleSubmit(res.data)));
    } else {
      dispatch(store(data, null, (err, res) => !err && props.handleSubmit(res.data)));
    }
  },
})
@connect((state) => ({
  workingHour: state.Attendance.WorkingHours.workingHour,
}), {
  show,
  emptyWorkingHour,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    workingHourId: PropTypes.number,
    show: PropTypes.func,
    emptyWorkingHour: PropTypes.func,
    workingHour: PropTypes.object,
    initialize: PropTypes.func,
    submit: PropTypes.func,
    onCancel: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {workingHourId, show} = this.props;

    if (workingHourId) {
      show(workingHourId, null, (err) => !err && this.setState({loading: false}));
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.workingHour, np.workingHour)) {
      let data = app._.cloneDeep(np.workingHour);

      data.dayTo = `${data.dayTo}`;
      data.timeFrom = data.timeFrom.substr(0, 5);
      data.timeTo = data.timeTo.substr(0, 5);
      data.beforeStart = data.beforeStart.substr(0, 5);
      data.afterEnd = data.afterEnd.substr(0, 5);

      np.initialize(data);
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyWorkingHour();
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {submit, onCancel} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        <Card
          className="wrapper"
          title={app.translate('routes.home.attendance.working-hours.Working Hour Form')}
          extra={
            <Button.Group>
              <Button
                type="danger"
                onClick={() => onCancel()}
              >
                {app.translate('main.Cancel')}
              </Button>
              <Button
                type="primary"
                onClick={submit}
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
              overflowY: 'auto',
              padding: '4px',
            }}
          >

            <Col>
              <Field
                name="name"
                label={app.translate('routes.home.attendance.working-hours.Name')}
                prefix={<MaterialIcon name="alphabetical"/>}
                required
                component={Text}
              />
            </Col>

            <Col>
              <Field
                name="description"
                label={app.translate('routes.home.attendance.working-hours.Description')}
                component={TextArea}
              />
            </Col>

            <fieldset>
              <legend>{app.translate('routes.home.attendance.working-hours.Start End Time')}</legend>
              <Col>
                <Field
                  name="timeFrom"
                  label={app.translate('routes.home.attendance.working-hours.Start Time')}
                  required
                  component={Time}
                />
              </Col>

              <Col>
                <Field
                  name="timeTo"
                  label={app.translate('routes.home.attendance.working-hours.End Time')}
                  required
                  component={Time}
                />
              </Col>

              <Col>
                <Field
                  name="dayTo"
                  defaultValue="0"
                  component={Select}
                >
                  <AntdSelect.Option value="0">{app.translate('routes.home.attendance.working-hours.Same Day')}</AntdSelect.Option>
                  <AntdSelect.Option value="1">{app.translate('routes.home.attendance.working-hours.Next Day')}</AntdSelect.Option>
                  <AntdSelect.Option value="2">{app.translate('routes.home.attendance.working-hours.Two Days Later')}</AntdSelect.Option>
                </Field>
              </Col>
            </fieldset>

            <fieldset>
              <legend>{app.translate('routes.home.attendance.working-hours.Limit')}</legend>
              <Col>
                <Field
                  name="beforeStart"
                  label={app.translate('routes.home.attendance.working-hours.beforeStart')}
                  required
                  component={Time}
                />
              </Col>
              <Col>
                <Field
                  name="afterEnd"
                  label={app.translate('routes.home.attendance.working-hours.afterEnd')}
                  required
                  component={Time}
                />
              </Col>
            </fieldset>

            <Col>
              <Field
                name="color"
                label={app.translate('routes.home.attendance.working-hours.Color')}
                component={Color}
              />
            </Col>

          </Row>
        </Card>
      </Spin>
    );
  }
}
