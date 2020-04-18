import React from 'react';
import {Button, Row, Col, Radio, Select as AntdSelect} from 'antd';
import {Field, reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {Text, TextArea, Date, RadioGroup, Select, Avatar} from 'components/redux-form';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import asyncValidate from './asyncValidate';
import validate from './validate';
import Phones from './Phones';
import {indexCities, indexProvinces} from './../../Module';

@reduxForm({
  form: 'personnel-form-personal-information',
  destroyOnUnmount: false,
  validate,
  asyncValidate,
  onSubmitFail: (errors, dispatch, submitError, props) => props.onFailure(),
  onSubmit: (values, dispatch, props) => props.onSuccess(),
})
@connect((state) => ({
  values: getFormValues('personnel-form-personal-information')(state),

  cities: state.Basic.Personnel.cities,
  provinces: state.Basic.Personnel.provinces,
}), {
  indexCities,
  indexProvinces,
})
@autobind
/**
 *
 */
export default class Personal extends React.PureComponent {
  static propTypes = {
    initialize: PropTypes.func,
    indexCities: PropTypes.func,
    indexProvinces: PropTypes.func,
    cities: PropTypes.arrayOf(PropTypes.object),
    provinces: PropTypes.arrayOf(PropTypes.object),
    values: PropTypes.object,
    user: PropTypes.object,
  };

  static defaultProps = {
    values: {},
    user: {},
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      viewModal: false,
      loading: false,
      provinceId: undefined,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {indexCities, indexProvinces} = this.props;

    indexProvinces((err) => !err && this.setState({loading: false}));
    indexCities((err) => !err && this.setState({loading: false}));
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.user, np.user)) {
      Personal._initialize(np);
    }

    if (!app._.isEqual(this.props.values, np.values) && this.props.values.sex !== np.values.sex && np.values.sex !== 'male') {
      let _data = app._.cloneDeep(np.values);
      _data.military = '1';
      np.initialize(_data);
    }

    if (!app._.isEqual(this.props.values, np.values) && !app._.isEqual(this.props.values.provinceId, np.values.provinceId)) {
      let _data = app._.cloneDeep(np.values);
      _data.cityId = undefined;
      np.initialize(_data);
    }
  }

  /**
   *
   * @param {Object} props
   * @private
   */
  static _initialize(props) {
    props.initialize({
      firstName: props.user.profile.firstName,
      lastName: props.user.profile.lastName,
      nationalCode: props.user.profile.nationalCode,
      birthCertificateNumber: props.user.profile.birthCertificateNumber,
      fatherName: props.user.profile.fatherName,
      birthday: props.user.profile.birthday,
      birthPlace: props.user.profile.birthPlace,
      birthRegisterPlace: props.user.profile.birthRegisterPlace,
      sex: props.user.profile.sex,
      married: `${props.user.profile.married}`,
      education: `${props.user.profile.education}`,
      military: `${props.user.profile.military}`,
      nationality: props.user.profile.nationality,
      address: props.user.profile.address,
      phones: props.user.phones,
      avatar: props.user.profile.avatar,
      cityId: props.user.profile.cityId,
      provinceId: props.user.profile.provinceId,
    });
  }

  /**
   *
   * @param {Object[]} phones
   */
  onPhonesClose(phones) {
    const {initialize} = this.props;
    let values = app._.clone(this.props.values);

    values.phones = phones;

    initialize(values);

    this.setState({
      viewModal: false,
    });
  }


  _onChangeProvince(provinceId) {
    // this.props.initialize({
    //   ...this.props.values,
    //   cityId: undefined,
    //   provinceId: provinceId ? provinceId : undefined,
    // });

    this.setState({provinceId});
  }


  _citiesList() {
    let _cities = [];
    const {cities} = this.props;
    const {provinceId} = this.state;

    cities.map((city) => {
      if (provinceId && city.provinceId === parseInt(this.state.provinceId && provinceId !== '' ? provinceId : 0)) {
        _cities.push(
          <AntdSelect.Option
            value={`${city.id}`}
            key={`city_${city.id}`}
          >
            {city.name}
          </AntdSelect.Option>,
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
    const {viewModal} = this.state;
    const {values, cities, provinces} = this.props;

    return (
      <div>

        <Row
          gutter={16}
          style={{
            width: '100%',
          }}
        >

          <Col sm={24} md={12} lg={8}>
            <Field
              name="firstName"
              label={app.translate('routes.home.basic.personnel.First Name')}
              prefix={<MaterialIcon name="account"/>}
              required
              component={Text}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="lastName"
              label={app.translate('routes.home.basic.personnel.Last Name')}
              prefix={<MaterialIcon name="account"/>}
              required
              component={Text}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="nationalCode"
              label={app.translate('routes.home.basic.personnel.National Code')}
              prefix={<MaterialIcon name="numeric"/>}
              required
              component={Text}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="birthCertificateNumber"
              label={app.translate('routes.home.basic.personnel.Identification Number')}
              prefix={<MaterialIcon name="numeric"/>}
              required
              component={Text}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="fatherName"
              label={app.translate('routes.home.basic.personnel.Father\'s Name')}
              prefix={<MaterialIcon name="account"/>}
              required
              component={Text}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="birthday"
              label={app.translate('routes.home.basic.personnel.Birth Date')}
              required
              component={Date}
            />
          </Col>
          {/*
          <Col sm={24} md={12} lg={8}>
            <Field
              name="birthPlace"
              label={app.translate('routes.home.basic.personnel.Birth Place')}
              prefix={<MaterialIcon name="map-marker"/>}
              required
              component={Text}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="birthRegisterPlace"
              label={app.translate('routes.home.basic.personnel.Birth Register Place')}
              prefix={<MaterialIcon name="map-marker"/>}
              required
              component={Text}
            />
          </Col>
          */}

          <Col sm={24} md={12} lg={8} xl={4}>
            <Field
              name="sex"
              label={app.translate('routes.home.basic.personnel.Gender')}
              component={RadioGroup}
              defaultValue="male"
            >
              <Radio value="male">
                {app.translate('routes.home.basic.personnel.Male')}
              </Radio>
              <Radio value="female">
                {app.translate('routes.home.basic.personnel.Female')}
              </Radio>
            </Field>
          </Col>

          <Col sm={24} md={12} lg={8} xl={4}>
            <Field
              name="married"
              label={app.translate('routes.home.basic.personnel.Marital Status')}
              component={RadioGroup}
              defaultValue="0"
            >
              <Radio value="0">
                {app.translate('routes.home.basic.personnel.Single')}
              </Radio>
              <Radio value="1">
                {app.translate('routes.home.basic.personnel.Married')}
              </Radio>
            </Field>
          </Col>


          <Col sm={24} md={12} lg={8}>
            <Field
              name="provinceId"
              label={`${app.translate('routes.home.basic.personnel.Excerpt from')} ${app.translate('routes.home.basic.personnel.Provinces')}`}
              required
              component={Select}
              onChangeSelect={this._onChangeProvince}
            >
              {
                provinces.map((province) => (
                  <AntdSelect.Option
                    value={`${province.id}`}
                    key={`province_${province.id}`}
                  >
                    {province.name}
                  </AntdSelect.Option>
                ))
              }
            </Field>
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="cityId"
              label={`${app.translate('routes.home.basic.personnel.Excerpt from')} ${app.translate('routes.home.basic.personnel.city')}`}
              required
              component={Select}
            >
              {this._citiesList()}
            </Field>
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="education"
              label={app.translate('routes.home.basic.personnel.Education')}
              defaultValue="1"
              component={Select}
            >
              <AntdSelect.OptGroup label={app.translate('routes.home.basic.personnel.Education Scientific')}>
                <AntdSelect.Option value="1">
                  {app.translate('routes.home.basic.personnel.Unknown')}
                </AntdSelect.Option>
                <AntdSelect.Option value="2">
                  {app.translate('routes.home.basic.personnel.Under the diploma')}
                </AntdSelect.Option>
                <AntdSelect.Option value="3">
                  {app.translate('routes.home.basic.personnel.Diploma')}
                </AntdSelect.Option>
                <AntdSelect.Option value="4">
                  {app.translate('routes.home.basic.personnel.Associate Degree')}
                </AntdSelect.Option>
                <AntdSelect.Option value="5">
                  {app.translate('routes.home.basic.personnel.Bachelor')}
                </AntdSelect.Option>
                <AntdSelect.Option value="6">
                  {app.translate('routes.home.basic.personnel.Masters')}
                </AntdSelect.Option>
                <AntdSelect.Option value="7">
                  {app.translate('routes.home.basic.personnel.PHD')}
                </AntdSelect.Option>
              </AntdSelect.OptGroup>
              <AntdSelect.OptGroup label={app.translate('routes.home.basic.personnel.Education Howzavi')}>
                <AntdSelect.Option value="8">
                  {app.translate('routes.home.basic.personnel.Basic')}
                </AntdSelect.Option>
                <AntdSelect.Option value="9">
                  {app.translate('routes.home.basic.personnel.Level 1')}
                </AntdSelect.Option>
                <AntdSelect.Option value="10">
                  {app.translate('routes.home.basic.personnel.Level 2')}
                </AntdSelect.Option>
                <AntdSelect.Option value="11">
                  {app.translate('routes.home.basic.personnel.Level 3')}
                </AntdSelect.Option>
                <AntdSelect.Option value="12">
                  {app.translate('routes.home.basic.personnel.Level 4')}
                </AntdSelect.Option>
              </AntdSelect.OptGroup>
            </Field>
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="nationality"
              label={app.translate('routes.home.basic.personnel.Nationality')}
              prefix={<MaterialIcon name="flag"/>}
              defaultValue="ایرانی"
              component={Text}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="military"
              label={app.translate('routes.home.basic.personnel.Military Service Status')}
              defaultValue="1"
              disabled={values && values.sex !== 'male'}
              component={Select}
            >
              <AntdSelect.Option value="1">
                {app.translate('routes.home.basic.personnel.Unknown')}
              </AntdSelect.Option>
              <AntdSelect.Option value="2">
                {app.translate('routes.home.basic.personnel.Serving')}
              </AntdSelect.Option>
              <AntdSelect.Option value="3">
                {app.translate('routes.home.basic.personnel.Exempt from service')}
              </AntdSelect.Option>
              <AntdSelect.Option value="4">
                {app.translate('routes.home.basic.personnel.Finished Service')}
              </AntdSelect.Option>
            </Field>
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="address"
              label={app.translate('routes.home.basic.personnel.Address')}
              component={TextArea}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Button
              style={{
                marginTop: 32,
              }}
              onClick={() => this.setState({viewModal: true})}
            >
              {app.translate('routes.home.basic.personnel.Phones')} ({values.phones ? values.phones.length : 0})
            </Button>
          </Col>

          <Col sm={24} md={12} lg={8}>
            <Field
              name="avatar"
              label={app.translate('routes.home.basic.personnel.Avatar')}
              component={Avatar}
            />
          </Col>

          {
            viewModal &&
            <Phones
              visible={viewModal}
              phones={values.phones}
              onClose={this.onPhonesClose}
            />
          }

        </Row>

      </div>
    );
  }
}
