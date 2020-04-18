import React from 'react';
import {Row, Col, Modal, Button, Select as AntSelect} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Field, reduxForm, getFormValues, isPristine} from 'redux-form';
import {
  Text, TextArea, Date, Time, Cascader, Select, Number, File,
} from 'components/redux-form';
import {index, indexCities, indexProvinces} from '../Module';
import validate from './validate';
import MaterialIcon from 'components/common/MaterialIcon';
import Spin from 'components/common/Spin';

@reduxForm({
  form: 'device-chart-form',
  validate,
  onSubmit: (values, dispatch, props) => {
    props.onSubmit(values);
  },
})
@connect((state) => ({
  devices: state.Attendance.Device.devices,
  cities: state.Attendance.Device.cities,
  provinces: state.Attendance.Device.provinces,
  values: getFormValues('device-chart-form')(state),
}), {
  index,
  indexCities,
  indexProvinces,
}, null, {withRef: true})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    index: PropTypes.func,
    indexCities: PropTypes.func,
    indexProvinces: PropTypes.func,
    submit: PropTypes.func,
    devices: PropTypes.array,
    provinces: PropTypes.array,
    cities: PropTypes.array,
    visible: PropTypes.bool,
    action: PropTypes.string,
  };

  static defaultProps = {
    visible: false,
    item: {},
    action: 'add',
  };

  constructor(props) {
    super(props);
    this.state = {
      provinceId: props.item && props.item.provinceId ? props.item.provinceId : 0,
      type: props.item && props.item.type ? props.item.type : 'branch',
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexCities, indexProvinces, index, action} = this.props;

    indexProvinces((err) => {
      indexCities((err) => {
        index(null, (err) => {
          this.setState({loading: false});
          if (action !== 'add') {
            Form._initialize(this.props);
          } else {
            Form._initialize(Object.assign({}, this.props, {item: {parentId: this.props.item.id, cityId: this.props.item.cityId}}));
          }
        });
      });
    });
  }


  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (np.values && !app._.isEqual(this.state.provinceId, np.values.provinceId)) {
      this.setState({provinceId: np.values.provinceId});
    }
    if (!app._.isEqual(this.props.item, np.item)) {
      if (np.action !== 'add') {
        Form._initialize(np);
      } else {
        Form._initialize(Object.assign({}, np, {item: {parentId: np.item.id, cityId: np.item.cityId}}));
      }
    }
  }

  /**
   *
   * @param {Object} props
   * @private
   */
  static _initialize(props) {
    props.initialize({
      // ...props.item,
      parentId: props.item.parent ? `${props.item.parent}` : props.item.parentId ? `${props.item.parentId}` : null,
      name: props.item.name ? `${props.item.name}` : props.item.title ? `${props.item.title}` : null,
      type: props.item.type ? `${props.item.type}` : null,
      deviceId: props.item.deviceId ? `${props.item.deviceId}` : null,
      cityId: props.item.cityId ? `${props.item.cityId}` : undefined,
      provinceId: this._provinceId(props.cities, props.item.cityId),
    });
  }

  static _provinceId(cities, cityId) {
    let _city = cities && cities.find((city) => city.id === cityId);

    return _city && _city.provinceId ? `${_city.provinceId}` : undefined;
  }

  _onChangeType(type) {
    this.props.initialize({
      ...this.props.values,
      deviceId: null,
      type: type ? type : undefined,
    });

    this.setState({type});
  }

  _onChangeProvince(provinceId) {
    this.props.initialize({
      ...this.props.values,
      cityId: null,
      provinceId: provinceId ? provinceId : undefined,
    });

    this.setState({provinceId});
  }

  _citiesList() {
    let _cities = [];
    const {cities} = this.props;
    const {provinceId} = this.state;

    cities.map((city) => {
      if (provinceId && city.provinceId === parseInt(this.state.provinceId && provinceId !== '' ? provinceId : 0)) {
        _cities.push(
          <AntSelect.Option
            value={`${city.id}`}
            key={`city_${city.id}`}
          >
            {city.name}
          </AntSelect.Option>,
        );
      }
    });

    return _cities;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {loading} = this.state;
    const {visible, submit, provinces, devices, values, onCancel} = this.props;
    return (
      <Modal
        onOk={submit}
        onCancel={onCancel}
        okText={app.translate('main.Submit')}
        cancelText={app.translate('main.Cancel')}
        visible={visible}
        width='600px'
        title={app.translate('routes.home.attendance.device.Device Chart Form')}>
        <Spin
          spinning={loading}
        >
          <Row
            gutter={16}
            style={{
              margin: 0,
              height: '100%',
            }}
          >
            <Col sm={24} md={12}>
              <Field
                name="name"
                label={app.translate('routes.home.attendance.device.Device Chart Name')}
                component={Text}
                required
              />
            </Col>


            <Col xs={24} md={12}>
              <Field
                name="type"
                label={app.translate('routes.home.attendance.device.Device Chart Type')}
                required
                component={Select}
                onChangeSelect={this._onChangeType}
              >
                <AntSelect.Option
                  value={`branch`}
                  key={`branch`}
                >
                  {app.translate('routes.home.attendance.device.Branch')}
                </AntSelect.Option>
                <AntSelect.Option
                  value={`device`}
                  key={`device`}
                >
                  {app.translate('routes.home.attendance.device.Device')}
                </AntSelect.Option>
              </Field>
            </Col>

            <Col xs={24} md={12}>
              <Field
                name="provinceId"
                label={app.translate('routes.home.attendance.device.Device Chart Provinces')}
                required
                component={Select}
                onChangeSelect={this._onChangeProvince}
              >
                {
                  provinces.map((province) => (
                    <AntSelect.Option
                      value={`${province.id}`}
                      key={`province_${province.id}`}
                    >
                      {province.name}
                    </AntSelect.Option>
                  ))
                }
              </Field>
            </Col>

            <Col xs={24} md={12}>
              <Field
                name="cityId"
                label={app.translate('routes.home.attendance.device.Device Chart City')}
                required
                component={Select}
              >
                {this._citiesList()}
              </Field>
            </Col>
            {values && values.type === 'device' &&
            <Col xs={24}>
              <Field
                name="deviceId"
                label={app.translate('routes.home.attendance.device.Device')}
                required
                component={Select}
              >
                {
                  devices.map((device) => (
                    <AntSelect.Option
                      value={`${device.id}`}
                      key={`devices_${device.id}`}
                    >
                      {device.name}
                    </AntSelect.Option>
                  ))
                }
              </Field>
            </Col>
            }
          </Row>
        </Spin>
      </Modal>
    );
  }
}
