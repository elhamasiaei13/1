import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Card, Button, Select as AntdSelect} from 'antd';
import {Number, Cascader, Select} from 'components/redux-form';
import {storeReason} from './../Module';
import PropTypes from 'prop-types';
import asyncValidate from './asyncValidate';
import validate from './validate';

@reduxForm({
  form: 'device-clocking-form',
  // asyncValidate,
  validate,
  onSubmit: (values, dispatch, props) => {
    dispatch(storeReason(props.device.id, {
      deviceReasonId: values.deviceReasonId * 1,
      typeId: values.clockingReasonId[values.clockingReasonId.length - 1],
      type: values.type * 1,
    }, (err) => !err && props.initialize({
      type: '1',
    })));
  },
})
@authorize
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    submit: PropTypes.func,
    can: PropTypes.func,
    device: PropTypes.object,
    reasons: PropTypes.arrayOf(PropTypes.object),
  };

  /**
   *
   * @param {Object} props - initial props
   */
  constructor(props) {
    super(props);

    this.state = {
      reasons: [],
    };
  }

  /**
   *
   * @param {Object} np - next props
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.reasons, np.groups) || (np.reasons.length !== 0 && this.state.reasons.length === 0)) {
      this.setState({
        reasons: this._renderReasons(np.reasons),
      });
    }
  }

  /**
   *
   * @param {Object[]} reasons
   * @return {Object[]}
   * @private
   */
  _renderReasons(reasons) {
    let _reasons = [];

    reasons.map((reason) => {
      let _reason = {
        value: reason.id,
        label: reason.label ? reason.label : reason.name ? reason.name : '',
      };

      if (!app._.isEmpty(reason.children)) {
        _reason.children = this._renderReasons(reason.children);
      }

      _reasons.push(_reason);
    });

    return _reasons;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {reasons} = this.state;
    const {can, submit} = this.props;

    return (
      <Card
        className="wrapper"
        title={app.translate('routes.home.attendance.clocking.New Type')}
        extra={
          <Button
            type="primary"
            onClick={submit}
            disabled={!can('ClockingReason@store')}
          >
            {app.translate('main.Submit')}
          </Button>
        }
      >

        <Field
          name="deviceReasonId"
          label={app.translate('routes.home.attendance.device.Code')}
          min={0}
          required
          component={Number}
        />

        <Field
          name="clockingReasonId"
          label={app.translate('routes.home.attendance.device.Reason')}
          items={reasons}
          required
          component={Cascader}
        />

        <Field
          name="type"
          label={app.translate('routes.home.attendance.device.Clocking Type')}
          defaultValue="1"
          required
          component={Select}
        >
          <AntdSelect.Option value="1">{app.translate('routes.home.attendance.clocking.In')}</AntdSelect.Option>
          <AntdSelect.Option value="2">{app.translate('routes.home.attendance.clocking.Out')}</AntdSelect.Option>
          <AntdSelect.Option value="3">{app.translate('routes.home.attendance.clocking.Check-in')}</AntdSelect.Option>
        </Field>

      </Card>
    );
  }
}
