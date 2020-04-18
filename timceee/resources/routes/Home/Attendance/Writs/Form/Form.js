import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col, Select as AntdSelect} from 'antd';
import {Field, reduxForm, getFormValues, isPristine} from 'redux-form';
import {Cascader, Select, Date, Time, TextArea} from 'components/redux-form';
import {FormBuilder} from 'components/FormBuilder';
import jMoment from 'moment-jalaali';

import {show, emptyWrit} from './../Module';
import validate from './validate';
import {Types} from 'routes/General/Types';

@reduxForm({
  form: 'FormBuilder',
  validate,
  onSubmit: (values, dispatch, props) => {
    props.onOk(values);
  },
})
@connect((state) => ({
  writ: state.Attendance.Writs.writ,
  values: getFormValues('FormBuilder')(state),
  isPristine: isPristine('FormBuilder')(state),
}), {
  show,
  emptyWrit,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    item: PropTypes.arrayOf(
      PropTypes.object,
    ),
    writ: PropTypes.object,
    show: PropTypes.func,
    emptyWrit: PropTypes.func,
    values: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    submit: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string,
    visible: PropTypes.bool,
    isPristine: PropTypes.bool,
  };

  static defaultProps = {
    item: [],
    onOk: () => {
    },
    onCancel: () => {
    },
    title: '',
    visible: false,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      reasons: [],
    };
  }

  /**
   *
   */
  componentDidMount() {

    this.setState({reasons: Types.items('Writ')});
    if (this.props.item[0].id) {
      this.props.show(this.props.item[0].id, {includes: ['type'],});
    }
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (this.props.item[0].id &&
      !app._.isEmpty(np.writ) &&
      !(np.values.typeId && np.values.typeId[0]) &&
      app._.isEqual(this.props.item[0].id, np.writ.id) &&
      !(!app._.isEmpty(np.writ) && app._.isEqual(this.props.values, np.writ))) {
      let newWrits = this._getNewWrits(np.writ);
      np.initialize(newWrits);
    }

    if (this.props.values && np.values && this.props.values.typeId && this.props.values.typeId[0] && !app._.isEqual(this.props.values.typeId, np.values.typeId)) {
      np.initialize(Object.assign({}, np.values, {values: {}}));
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyWrit();
  }


  _getNewWrits(writ) {
    let i = null;

    for (i in writ) {
      if (writ.hasOwnProperty(i)) {
        if (i === 'typeId') {
          if (this.state.reasons && !Array.isArray(writ[i])) {
            writ[i] = this._getGroupIds(this.state.reasons, writ[i]);
          }
        }
      }
    }
    return writ;
  }

  /**
   *
   * @param {Object[]} groups
   * @param {Number} group
   * @return {String[]}
   * @private
   */
  _getGroupIds(groups, group) {
    let _ids = [];

    groups.map((_group) => {
      if (_group.id === group) {
        _ids.push(_group.id);
      } else if (!app._.isEmpty(_group.children)) {
        let _id = this._getGroupIds(_group.children, group);
        if (_id.length > 0) {
          _ids.push(_group.id, ..._id);
        }
      }
    });

    return _ids;
  }

  /**
   *
   * @param {Object[]} groups
   * @return {Object[]}
   * @private
   */
  _renderGroups(groups) {
    let _groups = [];
    groups.map((group) => {
      let _group = {
        value: group.id,
        label: group.label,
      };

      if (!app._.isEmpty(group.children)) {
        _group.children = this._renderGroups(group.children);
      }

      _groups.push(_group);
    });
    return _groups;
  }

  get _findForm() {
    let item = {};
    let {reasons} = this.state;
    let index = 0;
    let reasonId = 0;
    let form = {};

    if (this.props.values && this.props.values.typeId) {
      do {
        reasonId = this.props.values.typeId[index];
        item = reasons.find((item) => item.id === reasonId);
        if (item) {
          if (item.form) {
            form = item.form;
          }
          if (item.children) {
            reasons = item.children;
          } else {
            break;
          }
          index++;
        } else {
          break;
        }
      } while (index < this.props.values.typeId.length);
    }
    return form;
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {title, submit, visible, item, onCancel, isPristine} = this.props;
    let reasonType = [];
    if (!app._.isEmpty(this.state.reasons)) {
      reasonType = this._renderGroups(this.state.reasons);
    }
    return (
      <Modal
        title={title}
        visible={visible}
        wrapClassName="vertical-center-modal jModal"
        onCancel={() => onCancel()}
        width={800}
        footer={[
          <Button key="back" size="large" onClick={() => onCancel()}>
            {app.translate('main.Cancel')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            onClick={submit}
            disabled={isPristine}
          >
            {app.translate('main.Submit')}
          </Button>,
        ]}
      >
        <Row gutter={16}>

          <Col sm={24} md={12}>
            <Field
              name="typeId"
              label={app.translate('routes.home.attendance.writs.reason')}
              component={Cascader}
              required
              items={reasonType}
            />
          </Col>
          <Col sm={24} md={12}>
            <Field
              name="registrationDatetime"
              label={app.translate('routes.home.attendance.writs.registrationDatetime')}
              component={Date}
              defaultValue={(item[0].registrationDatetime) ? item[0].registrationDatetime.split(' ')[0] : jMoment().format('YYYY-MM-DD')}
            />
          </Col>
        </Row>
        {
          <FormBuilder
            formFields={this._findForm}
            formValues={this.props.values && this.props.values.values ? this.props.values.values : {}}
          />
        }
        <Row>
          <Col sm={24} md={24} lg={24}>
            <Field
              name="description"
              label={app.translate('routes.home.attendance.writs.description')}
              component={TextArea}
            />
          </Col>
        </Row>


      </Modal>
    );
  }


}
