import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {Card, Button, Row, Col} from 'antd';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';
import {Text, TextArea, Password, Cascader} from 'components/redux-form';
import validate from './validate';
import asyncValidate from './asyncValidate';
import {indexGroups, store, emptyGroups} from '../../Module';

@reduxForm({
  form: 'device-form',
  validate,
  asyncValidate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);

    data.deviceGroupId = data.deviceGroupId[data.deviceGroupId.length -1];

    // TODO
    data.userName = 'admin';

    dispatch(store(data, (err) => !err && props.onCancel()));
  },
})
@connect((state) => ({
  groups: state.Attendance.Device.groups,
}), {
  indexGroups,
  emptyGroups,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    submit: PropTypes.func,
    onCancel: PropTypes.func,
    indexGroups: PropTypes.func,
    emptyGroups: PropTypes.func,
    groups: PropTypes.arrayOf(PropTypes.object),
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      loading: true,
      saving: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexGroups} = this.props;

    indexGroups({
      includes: [
        'children',
        'children.children',
      ],
      filterGroups: [
        {
          filters: [
            {
              key: 'device_group_id',
              value: null,
              operator: 'eq',
            },
          ],
        },
      ],
    }, (err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.groups, np.groups) || (np.groups.length !== 0 && this.state.groups.length === 0)) {
      this.setState({
        groups: this._renderGroups(np.groups),
      });
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    this.props.emptyGroups();
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
        label: group.name,
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
    const {loading, saving, groups} = this.state;
    const {onCancel, submit} = this.props;

    return (
      <Spin
        wrapperClassName="wrapper"
        spinning={loading}
      >
        <Card
          className="wrapper"
          title={app.translate('routes.home.attendance.device.Device Form')}
          extra={
            <Button.Group>
              <Button
                type="danger"
                disabled={saving}
                onClick={() => onCancel()}
              >
                {app.translate('main.Cancel')}
              </Button>
              <Button
                type="primary"
                loading={saving}
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
            }}
          >

            <Col md={12} lg={8}>
              <Field
                name="name"
                label={app.translate('routes.home.attendance.device.Name')}
                prefix={<MaterialIcon name="alphabetical"/>}
                required
                component={Text}
              />
            </Col>

            <Col md={12} lg={16}>
              <Field
                name="description"
                label={app.translate('main.Description')}
                prefix={<MaterialIcon name="alphabetical"/>}
                component={TextArea}
              />
            </Col>

            <Col md={12} lg={8}>
              <Field
                name="address"
                label={app.translate('routes.home.attendance.device.Address')}
                prefix={<MaterialIcon name="network"/>}
                placeholder="192.168.1.2"
                required
                component={Text}
              />
            </Col>

            <Col md={12} lg={8}>
              <Field
                name="port"
                label={app.translate('routes.home.attendance.device.Port')}
                prefix={<MaterialIcon name="numeric"/>}
                placeholder="8080"
                component={Text}
              />
            </Col>

            <Col md={12} lg={8}>
              <Field
                name="password"
                label={app.translate('routes.home.attendance.device.Password')}
                prefix={<MaterialIcon name="keyboard-variant"/>}
                component={Password}
              />
            </Col>

            <Col md={12} lg={8}>
              <Field
                name="deviceGroupId"
                label={app.translate('routes.home.attendance.device.Type')}
                items={groups}
                defaultValue={[1, 3]}
                required
                component={Cascader}
              />
            </Col>

          </Row>
        </Card>
      </Spin>
    );
  }
}
