import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Row, Col} from 'antd';
import {Text, TextArea, Password, Cascader} from 'components/redux-form';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import asyncValidate from './asyncValidate';
import {update} from './../Module';
import {Types} from 'routes/General/Types';

@reduxForm({
  form: 'devices-raden-rf900-general-settings',
  validate,
  asyncValidate,
  onSubmit: (values, dispatch, props) => {
    let data = app._.cloneDeep(values);

    data.typeId = data.typeId[data.typeId.length - 1];

    dispatch(update(props.device.id, data));
  },
})
@autobind
/**
 *
 * @extends React.PureComponent
 */
export default class Setting extends React.PureComponent {
  static propTypes = {
    device: PropTypes.object,
    initialize: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {device, initialize} = this.props;
    this.setState({groups: Types.items('Device')}, () => {
      let _device = app._.cloneDeep(device);
      _device.typeId = this._getGroupIds(this.state.groups, _device.typeId);
      _device.port = `${_device.port}`;
      initialize(_device);
    });
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
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
    if (groups) {
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
    }

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
    if (groups) {
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
    }

    return _groups;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {groups} = this.state;

    let _groups = [];
    if (groups) {
      _groups = this._renderGroups(groups);
    }

    return (
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
            name="typeId"
            label={app.translate('routes.home.attendance.device.Type')}
            items={_groups}
            defaultValue={[1, 3]}
            required
            component={Cascader}
          />
        </Col>

      </Row>
    );
  }
}
