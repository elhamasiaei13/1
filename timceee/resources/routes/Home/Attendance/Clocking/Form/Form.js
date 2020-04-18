import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col, Checkbox, Select as AntdSelect} from 'antd';
import {Field, reduxForm, getFormValues, isPristine} from 'redux-form';
import {Cascader, Select, Date, Time, TextArea} from 'components/redux-form';
import {show, emptyClocking, indexReasons} from './../Module';
import validate from './validate';
import asyncValidate from './asyncValidate';
import MaterialIcon from 'components/common/MaterialIcon';
import {Types} from 'routes/General/Types';

@reduxForm({
  form: 'clocking-form',
  validate,
  asyncValidate,
  onSubmit: (values, dispatch, props) => {
    props.onOk(values);
  },
})
@connect((state) => ({
  clocking: state.Attendance.Clocking.clocking,
 // reasons: state.Attendance.Clocking.reasons,
  values: getFormValues('clocking-form')(state),
  isPristine: isPristine('clocking-form')(state),
}), {
  show,
  indexReasons,
  emptyClocking,
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
    clocking: PropTypes.object,
    show: PropTypes.func,
    indexReasons: PropTypes.func,
    values: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    submit: PropTypes.func,
    emptyClocking: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string,
    visible: PropTypes.bool,
    reSubmit: PropTypes.bool,
    onReSubmit: PropTypes.func,
  };

  static defaultProps = {
    item: [],
    onOk: () => {
    },
    onCancel: () => {
    },
    title: '',
    visible: false,
    reSubmit: false,
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
    this.setState({reasons: Types.items('Clocking')});
    if (this.props.item[0].id) {
      // if (app._.isEmpty(this.props.reasons)) {
      //
      //   // this.props.indexReasons({
      //   //   includes: [
      //   //     'children',
      //   //     'children.children',
      //   //   ],
      //   //   filterGroups: [
      //   //     {
      //   //       filters: [
      //   //         {
      //   //           key: 'clocking_reason_id',
      //   //           value: null,
      //   //           operator: 'eq',
      //   //         },
      //   //         {
      //   //           key: 'id',
      //   //           value: [1, 10, 19],
      //   //           operator: 'in',
      //   //         },
      //   //       ],
      //   //     },
      //   //   ],
      //   // });
      // }
      this.props.show(this.props.item[0].id);
    }
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (np.submitSucceeded) {
      np.reset();
    }
    if (this.props.item[0].id &&
      !(app._.isEmpty(np.clocking) || app._.isEqual(np.clocking, this.props.clocking) ) &&
      app._.isEqual(this.props.item[0].id, np.clocking.id) &&
      !(!app._.isEmpty(np.clocking) && app._.isEqual(this.props.values, np.clocking))) {
      let newClocking = this._getNewClocking(np.clocking);
      np.initialize(newClocking);
    }
  }

  componentWillUnmount() {
    this.props.emptyClocking();
    this.props.reset();
  }


  _getNewClocking(clocking) {
    let i = null;

    for (i in clocking) {
      if (clocking.hasOwnProperty(i)) {
        if (i === 'typeId') {
          if (this.state.reasons && !Array.isArray(clocking[i])) {
            clocking[i] = this._getGroupIds(this.state.reasons, clocking[i]);
          }
        }
        if (i === 'datetime') {
          clocking['date'] = clocking[i].split(' ')[0];
          if (clocking[i].split(' ')[1]) {
            clocking['time'] = clocking[i].split(' ')[1];
          }
        }
        if (i === 'entryType') {
          clocking['entryType'] = clocking[i].toString();
        }
      }
    }
    return clocking;
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

  /**
   *
   * @return {XML}
   */
  render() {
    const {title, values, visible, item, submit, onCancel, reSubmit, onReSubmit, type} = this.props;
    let reasonType = [];
    if (!app._.isEmpty(this.state.reasons)) {
      reasonType = this._renderGroups(this.state.reasons);
    }
    return (
      <Modal
        title={title}
        maskClosable={this.props.isPristine}
        visible={visible}
        wrapClassName="vertical-center-modal jModal"
        onCancel={() => onCancel(false)}
        footer={[
          <div key="resubmit" className="jModal-footer-toolbar">
            {type !== 'edit' && <Checkbox
              defaultChecked={reSubmit}
              onChange={(e) => {
                onReSubmit(e.target.checked);
              }}
            >
              {app.translate('routes.home.attendance.clocking.add new')}
            </Checkbox>
            }
          </div>,
          <Button key="back" size="large" onClick={() => onCancel(false)}>
            {app.translate('main.Cancel')}
          </Button>,
          <Button key="submit" type="primary" size="large" onClick={submit} disabled={this.props.isPristine}>
            {app.translate('main.Submit')}
          </Button>,
        ]}
      >
        <Row gutter={16}>

          <Col sm={24} md={12}>
            <Field
              name="typeId"
              label={app.translate('routes.home.attendance.clocking.Reason')}
              component={Cascader}
              required
              items={reasonType}
            />
          </Col>
          <Col sm={24} md={12}>
            <Field
              name="entryType"
              label={app.translate('routes.home.attendance.clocking.Type')}
              component={Select}
            >
              <AntdSelect.Option value="in">
                <spn>{app.translate('routes.home.attendance.clocking.clock_in')}</spn>
                <MaterialIcon name="arrow-down-thick" size="tiny" style={{
                  color: 'green',
                }}/>
              </AntdSelect.Option>
              <AntdSelect.Option value="out">
                <span>{app.translate('routes.home.attendance.clocking.clock_out')}</span>
                <MaterialIcon name="arrow-up-thick" size="tiny" style={{
                  color: 'red',
                }}/>
              </AntdSelect.Option>
              {/*
              <AntdSelect.Option value="attendance">
                <span>{app.translate('routes.home.attendance.clocking.attendance')}</span>
                <MaterialIcon name="swap-vertical" size="tiny" style={{
                  color: 'orange',
                }}/>
              </AntdSelect.Option>
              */}
            </Field>
          </Col>

          <Col sm={24} md={12}>
            <Field
              name="date"
              label={app.translate('routes.home.attendance.clocking.Date')}
              component={Date}
              defaultValue={(item[0].datetime) ? item[0].datetime.split(' ')[0] : ''}
            />
          </Col>

          <Col sm={24} md={12}>
            <Field
              name="time"
              label={app.translate('routes.home.attendance.clocking.Time')}
              component={Time}
              min={1}
              defaultValue={(item[0].datetime) ? item[0].datetime.split(' ')[1] : ''}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={24} md={24} lg={24}>
            <Field
              name="description"
              label={app.translate('routes.home.attendance.clocking.Description')}
              component={TextArea}
            />
          </Col>
        </Row>

      </Modal>
    );
  }


}
