import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Select as AntSelect } from 'antd';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { TextArea, Select, Date } from 'components/redux-form';
import Spin from 'components/common/Spin';
import asyncValidate from './asyncValidate';
import validate from './validate';
import { storeUserContract, updateUserContract, indexUserInsurances, indexInsuranceTypes } from './../../../Module';

@reduxForm({
  form: 'user-contract-form',
  asyncValidate,
  validate,
  onSubmit: (values, dispatch, props) => {
    let _data = app._.cloneDeep(values);

    for (let _key in _data) {
      if (!_data[_key] || _data[_key] === '') {
        _data[_key] = undefined;
      }
    }

    _data.userId = props.user.id;
    _data.recruitmentTypeId = _data.recruitmentTypeId * 1;
    _data.insuranceId = _data.insuranceId && _data.insuranceId * 1;
    _data.rate = _data.rate && _data.rate * 1;

    if (_data.id) {
      dispatch(updateUserContract(_data.id, _data, (err) => !err && props.onCancel()));
    } else {
      dispatch(storeUserContract(_data, (err) => !err && props.onCancel()));
    }
  },
})
@connect((state) => ({
  insurances: state.Basic.Personnel.insurances,
  insuranceTypes: state.Basic.Personnel.insuranceTypes,
  values: getFormValues('user-contract-form')(state),
}), {
  indexInsurances: indexUserInsurances,
  indexInsuranceTypes,
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    insuranceTypes: PropTypes.arrayOf(PropTypes.object),
    insurances: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    values: PropTypes.object,
    contract: PropTypes.object,
    onCancel: PropTypes.func,
    submit: PropTypes.func,
    indexInsurances: PropTypes.func,
    indexInsuranceTypes: PropTypes.func,
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
    const { user, indexInsuranceTypes, indexInsurances } = this.props;

    indexInsuranceTypes((err) => !err && indexInsurances(user.id, (err2) => !err2 && this.setState({ loading: false }, () => Form._initialize(this.props))));
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.contract, np.contract)) {
      Form._initialize(np);
    }
  }

  /**
   *
   * @param {Object} props
   * @private
   */
  static _initialize(props) {
    if (props.contract && props.contract.id) {
      props.initialize({
        ...props.contract,
        rate: props.contract.rate && `${props.contract.rate}`,
        recruitmentTypeId: props.contract.recruitmentTypeId && `${props.contract.recruitmentTypeId}`,
        insuranceId: props.contract.insuranceId && `${props.contract.insuranceId}`,
        beginDate: props.contract.beginDate && props.contract.beginDate.slice(0, 10),
        expireDate: props.contract.expireDate && props.contract.expireDate.slice(0, 10),
        leavingDate: props.contract.leavingDate && props.contract.leavingDate.slice(0, 10),
      });
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { loading } = this.state;
    const { values, contract, onCancel, submit, types, insuranceTypes, insurances } = this.props;

    return (
      <Modal
        title={app.translate('routes.home.basic.personnel.Contract Form')}
        visible={!!contract}
        onCancel={onCancel}
        onOk={submit}
      >
        <Spin
          spinning={loading}
        >

          <Row
            gutter={16}
            style={{
              margin: 0,
            }}
          >

            <Col xs={24} md={12}>
              <Field
                name="recruitmentTypeId"
                label={app.translate('routes.home.basic.personnel.Recruitment Type')}
                required
                component={Select}
              >
                {
                  types.map((type) => (
                    <AntSelect.Option
                      value={`${type.id}`}
                      key={type.id}
                    >
                      {type.name}
                    </AntSelect.Option>
                  ))
                }
              </Field>
            </Col>

            <Col xs={24} md={12}>
              <Field
                name="insuranceId"
                label={app.translate('routes.home.basic.personnel.Insurance')}
                defaultValue={insurances.length > 0 ? `${insurances[0].id}` : undefined}
                component={Select}
              >
                {
                  insurances.map((insurance) => {
                    let _type = insurance.typeId;
                    let _index = insuranceTypes.findIndex((_item) => _item.id == insurance.typeId);

                    if (_index > -1) {
                      _type = insuranceTypes[_index].name;
                    }

                    return (
                      <AntSelect.Option
                        value={`${insurance.id}`}
                        key={insurance.id}
                      >
                        {`${_type} -> ${insurance.code}`}
                      </AntSelect.Option>
                    );
                  })
                }
              </Field>
            </Col>

            {/* <Col xs={24} md={12}>*/}
            {/* <Field*/}
            {/* name="rate"*/}
            {/* label={app.translate('routes.home.basic.personnel.Organizational rank')}*/}
            {/* component={Number}*/}
            {/* min={1}*/}
            {/* />*/}
            {/* </Col>*/}

            <Col xs={24} md={12}>
              <Field
                name="beginDate"
                label={app.translate('main.Start date')}
                required
                component={Date}
                max={values && values.expireDate}
              />
            </Col>

            <Col xs={24} md={12}>
              <Field
                name="expireDate"
                label={app.translate('main.End date')}
                required
                component={Date}
                min={values && values.beginDate}
              />
            </Col>

            {
              contract.id &&
              [
                <Col key="leavingDate" xs={24} md={12}>
                  <Field
                    name="leavingDate"
                    label={app.translate('routes.home.basic.personnel.Leaving Date')}
                    component={Date}
                    min={values && values.beginDate}
                    max={values && values.expireDate}
                  />
                </Col>,
                <Col key="leavingReason" xs={24}>
                  <Field
                    name="leavingReason"
                    label={app.translate('routes.home.basic.personnel.Leaving Reason')}
                    component={TextArea}
                    dir="auto"
                  />
                </Col>,
              ]
            }

          </Row>

        </Spin>

      </Modal>
    );
  }
}
