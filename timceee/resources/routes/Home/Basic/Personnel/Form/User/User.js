import React from 'react';
import {Row, Col} from 'antd';
import {Field, reduxForm} from 'redux-form';
import {
  Text, Toggle, Email, Password,
} from 'components/redux-form';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import validate from './validate';
import asyncValidate from './asyncValidate';

@reduxForm({
  form: 'personnel-form-user-information',
  destroyOnUnmount: false,
  asyncValidate,
  validate,
  onSubmitFail: (errors, dispatch, submitError, props) => props.onFailure(),
  onSubmit: (values, dispatch, props) => props.onSuccess(),
})
@autobind
/**
 *
 */
export default class User extends React.PureComponent {
  static propTypes = {
    initialize: PropTypes.func,
    user: PropTypes.object,
  };

  static defaultProps = {
    user: {},
  };

  /**
   *
   */
  componentDidMount() {
    const {user} = this.props;

    if (user.id) {
      User._initialize(this.props);
    }
  }

  /**
   *
   * @param {Object} np
   */
  componentWillReceiveProps(np) {
    if (!app._.isEqual(this.props.user, np.user)) {
      User._initialize(np);
    }
  }

  /**
   *
   * @param {Object} props
   * @private
   */
  static _initialize(props) {
    props.initialize({
      personnelId: props.user.profile.personnelId,
      identificationCode: props.user.taInfo.identificationCode,
      nightShift: !!props.user.taInfo.nightShift,
      email: props.user.email,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    return (
      <Row
        gutter={16}
        style={{
          width: '100%',
        }}
      >

        <Col sm={24} md={12} lg={8}>
          <Field
            name="personnelId"
            label={app.translate('routes.home.basic.personnel.Personnel Code')}
            prefix={<MaterialIcon name="numeric"/>}
            required
            component={Text}
          />
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Field
            name="identificationCode"
            label={app.translate('routes.home.basic.personnel.Identification Code')}
            prefix={<MaterialIcon name="numeric"/>}
            component={Text}
          />
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Field
            name="password"
            label={app.translate('routes.home.basic.personnel.Password')}
            prefix={<MaterialIcon name="keyboard-variant"/>}
            component={Password}
          />
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Field
            name="email"
            label={app.translate('routes.home.basic.personnel.Email')}
            component={Email}
          />
        </Col>

        <Col sm={24} md={12} lg={8} xl={4}>
          <Field
            name="nightShift"
            label={app.translate('routes.home.basic.personnel.Night Shift')}
            component={Toggle}
          />
        </Col>

      </Row>
    );
  }
}
