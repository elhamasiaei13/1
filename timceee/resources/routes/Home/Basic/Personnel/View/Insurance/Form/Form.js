import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Row, Col, Select as AntSelect} from 'antd';
import {Field, reduxForm} from 'redux-form';
import {Text, Select} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import asyncValidate from './asyncValidate';
import validate from './validate';
import {storeUserInsurances, updateUserInsurances} from './../../../Module';

@reduxForm({
  form: 'user-insurance-form',
  asyncValidate,
  validate,
  onSubmit: (values, dispatch, props) => {
    let _data = app._.cloneDeep(values);

    _data.typeId = _data.typeId * 1;

    if (_data.id) {
      dispatch(updateUserInsurances(_data.id, _data, (err) => !err && props.onCancel()));
    } else {
      dispatch(storeUserInsurances(props.user.id, _data, (err) => !err && props.onCancel()));
    }
  },
})
@autobind
/**
 *
 */
export default class Form extends React.PureComponent {
  static propTypes = {
    types: PropTypes.arrayOf(PropTypes.object),
    insurance: PropTypes.object,
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
    if (!app._.isEqual(this.props.insurance, np.insurance)) {
      Form._initialize(np);
    }
  }

  /**
   *
   * @param {Object} props
   * @private
   */
  static _initialize(props) {
    if (props.insurance && props.insurance.id) {
      props.initialize({
        ...props.insurance,
        typeId: props.insurance.typeId && `${props.insurance.typeId}`,
      });
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {insurance, onCancel, submit, types} = this.props;

    return (
      <Modal
        title={app.translate('routes.home.basic.personnel.Insurance Form')}
        visible={!!insurance}
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
              name="typeId"
              label={app.translate('routes.home.basic.personnel.Insurance Type')}
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
              name="code"
              label={app.translate('routes.home.basic.personnel.Insurance Number')}
              component={Text}
              required
              prefix={<MaterialIcon name="numeric"/>}
              dir="auto"
            />
          </Col>

        </Row>

      </Modal>
    );
  }
}
