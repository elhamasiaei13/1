import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'components/common/MaterialIcon';
import Field from 'components/common/Field';
import form from 'services/decorators/form';
import { Row, Col, Radio } from 'antd';
import { Text, RadioGroup, Email, Password } from 'components/form';
import { patchUser } from '../../Module';

@authorize
@form({
  name: 'personnel-user-form',
  disabled: (props) => !props.can('Profile@update'),
  onSubmit: (value, props, dispatch, callback) => dispatch(patchUser(props.user.id, { taInfo: value }, callback)),
})
@connect(null, {
  patchUser,
})
@autobind
/**
 *
 */
export default class User extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object,
    initialize: PropTypes.func,
    patchUser: PropTypes.func,
  };

  /**
   *
   */
  componentDidMount() {
    const { user, initialize } = this.props;

    initialize({
      email: user.email,
      ...user.profile,
      ...user.taInfo,
      nightShift: user.taInfo && user.taInfo.nightShift ? '1' : '0',
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { user, patchUser } = this.props;

    return (
      <Row>

        <Col sm={24} md={12} lg={8}>
          <Field
            name="personnelId"
            label={app.translate('routes.home.basic.personnel.Personnel Code')}
            component={Text}
            required
            onSubmit={(value, callback) => patchUser(user.id, {profile: {personnelId: value}}, callback)}
            prefix={<Icon name="numeric"/>}
          />
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Field
            name="identificationCode"
            label={app.translate('routes.home.basic.personnel.Identification Code')}
            component={Text}
            prefix={<Icon name="numeric"/>}
          />
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Field
            name="nightShift"
            label={app.translate('routes.home.basic.personnel.Night Shift')}
            component={RadioGroup}
            parser={(value) => {
              if (value === '1') {
                return app.translate('main.Yes');
              }

              return app.translate('main.No');
            }}
          >
            <Radio value="0">
              {app.translate('main.No')}
            </Radio>
            <Radio value="1">
              {app.translate('main.Yes')}
            </Radio>
          </Field>
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Field
            name="email"
            label={app.translate('routes.home.basic.personnel.Email')}
            component={Email}
            onSubmit={(value, callback) => patchUser(user.id, {email: value}, callback)}
          />
        </Col>

        <Col sm={24} md={12} lg={8}>
          <Field
            name="password"
            label={app.translate('routes.home.basic.personnel.Password')}
            component={Password}
            onSubmit={(value, callback) => patchUser(user.id, {password: value}, callback)}
            masked
          />
        </Col>

      </Row>
    );
  }
}
