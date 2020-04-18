import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import RAvatar from 'components/common/Avatar';
import Field from 'components/common/Field';
import {Row, Col, Button, Radio, Select as AntdSelect} from 'antd';
import {Text, TextArea, RadioGroup, Date, Select, Avatar} from 'components/form';
import form from 'services/decorators/form';
import regex from 'services/regex';
import Phones from './Phones';
import {patchUser} from '../../Module';
import {connect} from 'react-redux';
import {indexCities, indexProvinces} from './../../Module';

@authorize
@form({
  name: 'personnel-personal-form',
  disabled: (props) => !props.can('User@update'),
  onSubmit: (value, props, dispatch, callback) => {
    dispatch(patchUser(props.user.id, {profile: value}, callback));
  },
})
@connect((state) => ({
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
    user: PropTypes.object,
    initialize: PropTypes.func,
    indexCities: PropTypes.func,
    indexProvinces: PropTypes.func,
    cities: PropTypes.arrayOf(PropTypes.object),
    provinces: PropTypes.arrayOf(PropTypes.object),
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      showPhones: false,
      loading: false,
    };
  }

  /**
   *
   */
  componentDidMount() {
    const {user, initialize} = this.props;
    const {indexCities, indexProvinces} = this.props;

    indexProvinces((err) => !err && this.setState({loading: false}));
    indexCities((err) => !err && this.setState({loading: false}));

    if (user.profile) {
      initialize({
        ...user.profile,
        cityId: user.profile.cityId && `${user.profile.cityId}`,
        provinceId: user.profile.provinceId && `${user.profile.provinceId}`,
        military: user.profile.military && `${user.profile.military}`,
        married: user.profile.married !== undefined && `${user.profile.married}`,
        education: user.profile.education && `${user.profile.education}`,
      });
    }
  }

  /**
   *
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (!app._.isEqual(this.props.user, nextProps.user) && nextProps.user.profile) {
      nextProps.initialize({
        ...nextProps.user.profile,
        cityId: nextProps.user.profile.cityId && `${nextProps.user.profile.cityId}`,
        provinceId: nextProps.user.profile.provinceId && `${nextProps.user.profile.provinceId}`,
        military: nextProps.user.profile.military && `${nextProps.user.profile.military}`,
        married: nextProps.user.profile.married !== undefined && `${nextProps.user.profile.married}`,
        education: nextProps.user.profile.education && `${nextProps.user.profile.education}`,
      });
    }
  }


  _onChangeProvince(provinceId) {
    this.setState({provinceId});
  }


  _citiesList() {
    let _cities = [];
    const {cities} = this.props;
    const provinceId = this.props.values && this.props.values.provinceId;

    cities.map((city) => {
      if (provinceId && city.provinceId === parseInt(provinceId !== '' ? provinceId : 0)) {
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
   * @param {Number} provinceId
   * @return {*}
   * @private
   */
  _province(provinceId = 0) {
    const {provinces} = this.props;
    let province = provinces.find((item) => item.id === parseInt(provinceId));
    return province && province.name;
  }

  /**
   *
   * @param {Number} cityId
   * @return {*}
   * @private
   */
  _city(cityId = 0) {
    const {cities} = this.props;
    let city = cities.find((item) => item.id === parseInt(cityId));
    return city && city.name;
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {showPhones} = this.state;
    const {user, provinces} = this.props;

    return (
      <Row
        gutter={16}
        style={{
          height: '100%',
        }}
      >

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="firstName"
            label={app.translate('routes.home.basic.personnel.First Name')}
            required
            component={Text}
            validate={(value) => {
              if (value.length < 3) {
                return app.translate('main.minCharacters', {count: 3});
              }

              if (!regex.persianAndLatin.test(value)) {
                return app.translate('main.Enter Persian/Latin words only');
              }

              return true;
            }}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="lastName"
            label={app.translate('routes.home.basic.personnel.Last Name')}
            required
            component={Text}
            validate={(value) => {
              if (value.length < 3) {
                return app.translate('main.minCharacters', {count: 3});
              }

              if (!regex.persianAndLatin.test(value)) {
                return app.translate('main.Enter Persian/Latin words only');
              }

              return true;
            }}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="sex"
            label={app.translate('routes.home.basic.personnel.Gender')}
            component={RadioGroup}
            parser={(value) => {
              if (value === 'female') {
                return app.translate('routes.home.basic.personnel.Female');
              }

              return app.translate('routes.home.basic.personnel.Male');
            }}
          >
            <Radio value="male">
              {app.translate('routes.home.basic.personnel.Male')}
            </Radio>
            <Radio value="female">
              {app.translate('routes.home.basic.personnel.Female')}
            </Radio>
          </Field>
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="nationalCode"
            label={app.translate('routes.home.basic.personnel.National Code')}
            required
            component={Text}
            validate={(value) => {
              if (!regex.number.test(value) || regex.persianAndLatin.test(value)) {
                return app.translate('main.Enter numbers only');
              }

              if (!regex.nationalCode.test(value)) {
                return app.translate('routes.home.basic.personnel.National Code is not valid');
              }

              return true;
            }}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="birthCertificateNumber"
            label={app.translate('routes.home.basic.personnel.Identification Number')}
            component={Text}
            validate={(value) => {
              if (!regex.number.test(value)) {
                return app.translate('main.Enter numbers only');
              }

              return true;
            }}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="birthday"
            label={app.translate('routes.home.basic.personnel.Birth Date')}
            component={Date}
            parser={(value) => jMoment(value.substr(0, 10), 'YYYY-MM-DD').format('jDD / jMM / jYYYY')}
          />
        </Col>
        {/*
        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="birthPlace"
            label={app.translate('routes.home.basic.personnel.Birth Place')}
            component={Text}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="birthRegisterPlace"
            label={app.translate('routes.home.basic.personnel.Birth Register Place')}
            component={Text}
          />
        </Col>*/}

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="fatherName"
            label={app.translate('routes.home.basic.personnel.Father\'s Name')}
            component={Text}
            validate={(value) => {
              if (value.length < 3) {
                return app.translate('main.minCharacters', {count: 3});
              }

              if (!regex.persianAndLatin.test(value)) {
                return app.translate('main.Enter Persian/Latin words only');
              }

              return true;
            }}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="nationality"
            label={app.translate('routes.home.basic.personnel.Nationality')}
            component={Text}
            validate={(value) => {
              if (value.length < 2) {
                return app.translate('main.minCharacters', {count: 2});
              }

              if (!regex.persianAndLatin.test(value)) {
                return app.translate('main.Enter Persian/Latin words only');
              }

              return true;
            }}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="military"
            label={app.translate('routes.home.basic.personnel.Military Service Status')}
            component={Select}
            disabled={user.profile && user.profile.sex === 'female'}
            parser={(value) => {
              switch (value) {
                case '1':
                  return app.translate('routes.home.basic.personnel.Unknown');
                case '2':
                  return app.translate('routes.home.basic.personnel.Serving');
                case '3':
                  return app.translate('routes.home.basic.personnel.Exempt from service');
                case '4':
                  return app.translate('routes.home.basic.personnel.Finished Service');
                default:
                  return value;
              }
            }}
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

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="provinceId"
            label={`${app.translate('routes.home.basic.personnel.Excerpt from')} ${app.translate('routes.home.basic.personnel.Provinces')}`}
            required
            component={Select}
            onChangeSelect={this._onChangeProvince}
            parser={(value) => {
              return this._province(value);
            }}
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

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="cityId"
            label={`${app.translate('routes.home.basic.personnel.Excerpt from')} ${app.translate('routes.home.basic.personnel.city')}`}
            required
            component={Select}
            parser={(value) => {
              return this._city(value);
            }}
          >
            {this._citiesList()}
          </Field>
        </Col>
        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="education"
            label={app.translate('routes.home.basic.personnel.Education')}
            component={Select}
            parser={(value) => {
              switch (value) {
                case '1':
                  return app.translate('routes.home.basic.personnel.Unknown');
                case '2':
                  return app.translate('routes.home.basic.personnel.Under the diploma');
                case '3':
                  return app.translate('routes.home.basic.personnel.Diploma');
                case '4':
                  return app.translate('routes.home.basic.personnel.Associate Degree');
                case '5':
                  return app.translate('routes.home.basic.personnel.Bachelor');
                case '6':
                  return app.translate('routes.home.basic.personnel.Masters');
                case '7':
                  return app.translate('routes.home.basic.personnel.PHD');
                case '8':
                  return app.translate('routes.home.basic.personnel.Basic');
                case '9':
                  return app.translate('routes.home.basic.personnel.Level 1');
                case '10':
                  return app.translate('routes.home.basic.personnel.Level 2');
                case '11':
                  return app.translate('routes.home.basic.personnel.Level 3');
                case '12':
                  return app.translate('routes.home.basic.personnel.Level 4');
                default:
                  return value;
              }
            }}
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

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="married"
            label={app.translate('routes.home.basic.personnel.Marital Status')}
            component={RadioGroup}
            parser={(value) => {
              if (value === '1') {
                return app.translate('routes.home.basic.personnel.Married');
              }

              return app.translate('routes.home.basic.personnel.Single');
            }}
          >
            <Radio value="0">
              {app.translate('routes.home.basic.personnel.Single')}
            </Radio>
            <Radio value="1">
              {app.translate('routes.home.basic.personnel.Married')}
            </Radio>
          </Field>
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <div
            style={{
              height: 56,
            }}
          >
            <Button
              onClick={() => this.setState({
                showPhones: true,
              })}
            >
              {app.translate('routes.home.basic.personnel.Phones')} ({user.phones && user.phones.length})
            </Button>
          </div>
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="avatar"
            label={app.translate('routes.home.basic.personnel.Avatar')}
            component={Avatar}
            parser={(value) => (
              <RAvatar
                src={value}
                size="large"
              />
            )}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={6}>
          <Field
            name="address"
            label={app.translate('routes.home.basic.personnel.Address')}
            component={TextArea}
          />
        </Col>

        {
          showPhones &&
          <Phones
            visible={showPhones}
            user={user}
            onClose={() => this.setState({showPhones: false})}
          />
        }

      </Row>
    );
  }
}
