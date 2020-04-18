import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Row, Col, Select as AntSelect} from 'antd';
import {Field, reduxForm} from 'redux-form';
import {Text, Select, InputTooltip} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import {storeUserFinancial, updateUserFinancial} from './../../../Module';

@reduxForm({
  form: 'user-financial-form',
  validate,
  onSubmit: (values, dispatch, props) => {
    let _data = app._.cloneDeep(values);
    _data.shabaNumber = _data.shabaNumber.length > 2 ? `${_data.shabaNumber}` : '';
    _data.userId = props.user.id;
    _data.bankId = _data.bankId * 1;

    if (_data.id) {
      dispatch(updateUserFinancial(_data.id, _data, (err) => !err && props.onCancel()));
    } else {
      dispatch(storeUserFinancial(_data, (err) => !err && props.onCancel()));
    }
  },
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    banks: PropTypes.arrayOf(PropTypes.object),
    financialInfo: PropTypes.object,
    onCancel: PropTypes.func,
    submit: PropTypes.func,
  };

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
    if (!app._.isEqual(this.props.financialInfo, np.financialInfo)) {
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
      ...props.financialInfo,
      shabaNumber: props.financialInfo.shabaNumber ? `${props.financialInfo.shabaNumber}` : 'IR',
      bankId: props.financialInfo.bankId ? `${props.financialInfo.bankId}` : undefined,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {financialInfo, onCancel, submit, banks} = this.props;

    return (
      <Modal
        title={app.translate('routes.home.basic.personnel.Financial Form')}
        visible={!!financialInfo}
        onCancel={onCancel}
        onOk={submit}
      >

        <Row
          gutter={16}
          style={{
            margin: 0,
          }}
        >


          <Col xs={24} md={12}>
            <Field
              name="bankId"
              label={app.translate('routes.home.basic.personnel.Bank')}
              required
              component={Select}
            >
              {
                banks.map((bank) => (
                  <AntSelect.Option
                    value={`${bank.id}`}
                    key={bank.id}
                  >
                    {bank.name}
                  </AntSelect.Option>
                ))
              }
            </Field>
          </Col>

          <Col xs={24} md={12}>
            <Field
              name="accountNumber"
              label={app.translate('routes.home.basic.personnel.Account Number')}
              component={Text}
              required
              prefix={<MaterialIcon name="numeric"/>}
              dir="auto"
            />
          </Col>

          <Col xs={24} md={12}>
            <Field
              name="shabaNumber"
              label={app.translate('routes.home.basic.personnel.Shaba Number')}
              component={InputTooltip}
              separator=" "
              tooltip={app.translate('routes.home.basic.personnel.Shaba Number')}
              mask="____ ____ ____ ____ ________ __"
              required
              maxLength="26"
              prefix={<MaterialIcon name="barcode"/>}
              dir="auto"
            />
          </Col>

          <Col xs={24} md={12}>
            <Field
              name="cardNumber"
              label={app.translate('routes.home.basic.personnel.Card Number')}
              component={InputTooltip}
              maxLength="16"
              separator=" "
              tooltip={app.translate('routes.home.basic.personnel.Card Number')}
              mask="____ ____ ____ ____"
              prefix={<MaterialIcon name="numeric"/>}
              dir="auto"
            />
          </Col>

        </Row>

      </Modal>
    );
  }
}
