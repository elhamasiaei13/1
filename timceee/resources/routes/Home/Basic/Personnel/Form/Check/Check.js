import React from 'react';
import {Row, Col, Form} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';

@connect((state) => ({
  types: state.Basic.Personnel.insuranceTypes,
}))
@autobind
/**
 *
 */
export default class Check extends React.PureComponent {
  static propTypes = {
    personalInformationValues: PropTypes.object,
    userInformationValues: PropTypes.object,
    contractInformationValues: PropTypes.object,
    financialInformationValues: PropTypes.object,
    types: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    personalInformationValues: {},
    userInformationValues: {},
    contractInformationValues: {},
    financialInformationValues: {},
    types: [],
  };

  /**
   *
   * @return {Object}
   * @private
   */
  _getLatestContract() {
    const {contractInformationValues} = this.props;
    let _contract = {};

    if (contractInformationValues.contracts) {
      _contract = app._.orderBy(contractInformationValues.contracts, ['startDate'], ['desc']);

      if (_contract.length > 0) _contract = _contract[0];
    }

    return _contract;
  }

  /**
   *
   * @param {Number} type
   * @return {Object}
   * @private
   */
  _getInsuranceType(type) {
    const {types} = this.props;

    let _index = types.findIndex((_type) => (_type.id == type));

    if (_index > -1) return types[_index];

    return {};
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {personalInformationValues, userInformationValues} = this.props;

    let _contract = this._getLatestContract();

    return (
      <Row
        gutter={16}
        style={{
          paddingRight: 8,
          paddingLeft: 8,
          width: '100%',
        }}
      >

        <Col sm={24} md={12} lg={8}>
          <Form.Item
            label={app.translate('routes.home.basic.personnel.First Name')}
            style={{display: 'flex'}}
          >
            <span className="ant-form-text">{personalInformationValues.firstName}</span>
          </Form.Item>
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Form.Item
            label={app.translate('routes.home.basic.personnel.Last Name')}
            style={{display: 'flex'}}
          >
            <span className="ant-form-text">{personalInformationValues.lastName}</span>
          </Form.Item>
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Form.Item
            label={app.translate('routes.home.basic.personnel.National Code')}
            style={{display: 'flex'}}
          >
            <span className="ant-form-text">{personalInformationValues.nationalCode}</span>
          </Form.Item>
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Form.Item
            label={app.translate('routes.home.basic.personnel.Personnel Code')}
            style={{display: 'flex'}}
          >
            <span className="ant-form-text">{userInformationValues.personnelId}</span>
          </Form.Item>
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Form.Item
            label={app.translate('routes.home.basic.personnel.Email')}
            style={{display: 'flex'}}
          >
            <span className="ant-form-text">{userInformationValues.email || '-'}</span>
          </Form.Item>
        </Col>

      </Row>
    );
  }
}
