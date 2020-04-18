import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Row, Col, Select as AntSelect} from 'antd';
import {Field, reduxForm, getFormValues} from 'redux-form';
import {Text, Select, Date} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import {storeUserFamily, updateUserFamily} from './../../../Module';

@reduxForm({
  form: 'user-family-form',
  validate,
  onSubmit: (values, dispatch, props) => {
    let _data = app._.cloneDeep(values);

    _data.userId = props.user.id;
    _data.cityId = _data.cityId * 1;

    if (_data.id) {
      dispatch(updateUserFamily(_data.id, _data, (err) => !err && props.onCancel()));
    } else {
      dispatch(storeUserFamily(_data, (err) => !err && props.onCancel()));
    }
  },
})
@connect((state) => ({
  values: getFormValues('user-family-form')(state),
}), {})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object),
    provinces: PropTypes.arrayOf(PropTypes.object),
    family: PropTypes.object,
    onCancel: PropTypes.func,
    submit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      provinceId: props.provinceId,
    };
  }

  /**
   *
   */
  componentDidMount() {
    Form._initialize(this.props);
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    // console.log(np);
    if (!app._.isEqual(this.state.provinceId, np.values.provinceId)) {
      this.setState({provinceId: np.values.provinceId});
    }
    if (!app._.isEqual(this.props.family, np.family)) {
      Form._initialize(np);
    }
  }

  /**
   *
   * @param {Object} props
   * @private
   */
  static _initialize(props) {
    props.initialize({
      ...props.family,
      cityId: props.family.cityId ? `${props.family.cityId}` : undefined,
      provinceId: this._provinceId(props.cities, props.family.cityId),
    });
  }

  static _provinceId(cities, cityId) {
    let _city = cities.find((city) => city.id === cityId);

    return _city && _city.provinceId ? `${_city.provinceId}` : undefined;
  }

  _onChangeProvince(provinceId) {
    this.props.initialize({
      ...this.props.values,
      cityId: undefined,
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
    const {family, onCancel, submit, provinces} = this.props;

    return (
      <Modal
        title={app.translate('routes.home.basic.personnel.Family Form')}
        visible={!!family}
        onCancel={onCancel}
        onOk={submit}
        width='660px'
      >

        <Row
          gutter={16}
          style={{
            margin: 0,
          }}
        >

          <Col xs={24} md={8}>
            <Field
              name="name"
              label={app.translate('routes.home.basic.personnel.name')}
              component={Text}
              prefix={<MaterialIcon name="alphabetical"/>}
              dir="auto"
            />
          </Col>

          <Col xs={24} md={8}>
            <Field
              name="family"
              label={app.translate('routes.home.basic.personnel.family')}
              component={Text}
              prefix={<MaterialIcon name="alphabetical"/>}
              dir="auto"
            />
          </Col>

          <Col xs={24} md={8}>
            <Field
              name="fatherName"
              label={app.translate('routes.home.basic.personnel.father_name')}
              component={Text}
              prefix={<MaterialIcon name="numeric"/>}
              dir="auto"
            />
          </Col>

          <Col xs={24} md={8}>
            <Field
              name="birthday"
              label={app.translate('routes.home.basic.personnel.birthday')}
              component={Date}
              prefix={<MaterialIcon name="alphabetical"/>}
              dir="auto"
            />
          </Col>


          <Col xs={24} md={8}>
            <Field
              name="provinceId"
              label={`${app.translate('routes.home.basic.personnel.Excerpt from')} ${app.translate('routes.home.basic.personnel.Provinces')}`}
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

          <Col xs={24} md={8}>
            <Field
              name="cityId"
              label={`${app.translate('routes.home.basic.personnel.Excerpt from')} ${app.translate('routes.home.basic.personnel.city')}`}
              required
              component={Select}
            >
              {this._citiesList()}
            </Field>
          </Col>

          <Col xs={24} md={8}>
            <Field
              name="certificateId"
              label={app.translate('routes.home.basic.personnel.certificate_id')}
              component={Text}
              prefix={<MaterialIcon name="numeric"/>}
              dir="auto"
            />
          </Col>

          <Col xs={24} md={8}>
            <Field
              name="nationalId"
              label={app.translate('routes.home.basic.personnel.national_id')}
              component={Text}
              prefix={<MaterialIcon name="numeric"/>}
              dir="auto"
            />
          </Col>

          <Col xs={24} md={8}>
            <Field
              name="sex"
              label={app.translate('routes.home.basic.personnel.sex')}
              required
              component={Select}
            >
              <AntSelect.Option
                value={`male`}
                key={`male`}
              >
                {app.translate('routes.home.basic.personnel.male')}
              </AntSelect.Option>
              <AntSelect.Option
                value={`female`}
                key={`female`}
              >
                {app.translate('routes.home.basic.personnel.female')}
              </AntSelect.Option>
            </Field>
          </Col>
          <Col xs={24} md={8}>
            <Field
              name="relation"
              label={app.translate('routes.home.basic.personnel.relation')}
              required
              component={Select}
            >
              <AntSelect.Option
                value={`child`}
                key={`child`}
              >
                {app.translate('routes.home.basic.personnel.child')}
              </AntSelect.Option>
              <AntSelect.Option
                value={`spouse`}
                key={`spouse`}
              >
                {app.translate('routes.home.basic.personnel.spouse')}
              </AntSelect.Option>
              <AntSelect.Option
                value={`father`}
                key={`father`}
              >
                {app.translate('routes.home.basic.personnel.father')}
              </AntSelect.Option>
              <AntSelect.Option
                value={`mother`}
                key={`mother`}
              >
                {app.translate('routes.home.basic.personnel.mother')}
              </AntSelect.Option>
            </Field>
          </Col>

          <Col xs={24} md={8}>
            <Field
              name="supported"
              label={app.translate('routes.home.basic.personnel.supported')}
              required
              component={Select}
            >
              <AntSelect.Option
                value={`1`}
                key={`supportedYes`}
              >
                {app.translate('main.Yes')}
              </AntSelect.Option>
              <AntSelect.Option
                value={`0`}
                key={`supportedNo`}
              >
                {app.translate('main.No')}
              </AntSelect.Option>
            </Field>
          </Col>

        </Row>

      </Modal>
    );
  }
}
