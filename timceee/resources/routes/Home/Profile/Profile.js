import React from 'react';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import Field from 'components/common/Field';
import form from 'services/decorators/form';
import { reduxForm, Field as ReduxField } from 'redux-form';
import { connect } from 'react-redux';
import { Avatar, Text, TextArea, Date, RadioGroup, Email, Select } from 'components/form';
import { Password } from 'components/redux-form';
import { Card, Row, Col, Form, Radio, Button, Select as AntdSelect } from 'antd';
import AvatarShow from 'components/common/Avatar';
import { loginResetPassword } from 'routes/Auth/Module';
import validate from './validate';

@reduxForm({
  form: 'user-profile',
  validate,
  onSubmit: (values, dispatch) => {
    dispatch(loginResetPassword(values));
  },
})
@connect((state) => ({
  currentUser: state.Auth.currentUser,
}))
@form({
  name: 'user-profile',
  onSubmit: () => {},
})
@autobind
/**
 *
 */
export default class Profile extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
    currentUser: PropTypes.object,
  };

  /**
   *
   */
  componentDidMount() {
    const { initialize, currentUser } = this.props;
    initialize({
      ...currentUser,
      ...currentUser.profile,
    });
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const { currentUser, handleSubmit } = this.props;

    return (
      <Card
        className="wrapper"
        style={{
          width: 'calc(100% - 16px)',
          margin: '0 8px',
        }}
      >

        <Row
          gutter={16}
          style={{
            margin: 0,
            marginBottom: 16,
            height: 'fit-content',
          }}
        >

          <Col sm={24} md={12} lg={8} xl={6} push={10}>
            <AvatarShow
              src={currentUser.avatar}
              size="large"
            />
          </Col>

        </Row>

        <Row
          gutter={16}
          style={{
            height: 'fit-content',
            margin: 0,
          }}
        >

          {currentUser && currentUser.profile ? [
              <Col key={13} sm={24} md={12} lg={8}>
                <Field
                  name="firstName"
                  label={app.translate('routes.home.basic.personnel.First Name')}
                  component={Text}
                  disabled
                  required
                />
              </Col>,
              <Col key={0} sm={24} md={12} lg={8}>
                <Field
                  name="lastName"
                  label={app.translate('routes.home.basic.personnel.Last Name')}
                  component={Text}
                  disabled
                  required
                />
              </Col>,
              <Col key={1} sm={24} md={12} lg={8}>
                <Field
                  name="personnelId"
                  label={app.translate('routes.home.basic.personnel.Personnel Code')}
                  component={Text}
                  disabled
                  required
                />
              </Col>,
              <Col key={2} sm={24} md={12} lg={8}>
                <Field
                  name="sex"
                  label={app.translate('routes.home.basic.personnel.Gender')}
                  component={RadioGroup}
                  disabled
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
              </Col>,
              <Col key={3} sm={24} md={12} lg={8}>
                <Field
                  name="nationalCode"
                  label={app.translate('routes.home.basic.personnel.National Code')}
                  component={Text}
                  disabled
                  required
                />
              </Col>,
              <Col key={4} sm={24} md={12} lg={8}>
                <Field
                  name="birthCertificateNumber"
                  label={app.translate('routes.home.basic.personnel.Identification Number')}
                  component={Text}
                  disabled
                />
              </Col>,
              <Col key={5} sm={24} md={12} lg={8}>
                <Field
                  name="birthday"
                  label={app.translate('routes.home.basic.personnel.Birth Date')}
                  component={Date}
                  disabled
                  parser={(value) => jMoment(value.substr(0, 10), 'YYYY-MM-DD').format('jDD / jMM / jYYYY')}
                />
              </Col>,
              <Col key={6} sm={24} md={12} lg={8}>
                <Field
                  name="birthPlace"
                  label={app.translate('routes.home.basic.personnel.Birth Place')}
                  component={Text}
                  disabled
                />
              </Col>,
              <Col key={7} sm={24} md={12} lg={8}>
                <Field
                  name="birthRegisterPlace"
                  label={app.translate('routes.home.basic.personnel.Birth Register Place')}
                  component={Text}
                  disabled
                />
              </Col>,
              <Col key={8} sm={24} md={12} lg={8}>
                <Field
                  name="fatherName"
                  label={app.translate('routes.home.basic.personnel.Father\'s Name')}
                  component={Text}
                  disabled
                />
              </Col>,
              <Col key={9} sm={24} md={12} lg={8}>
                <Field
                  name="nationality"
                  label={app.translate('routes.home.basic.personnel.Nationality')}
                  component={Text}
                  disabled
                />
              </Col>,
            <Col key={10} sm={24} md={12} lg={8}>
                <Field
                  name="education"
                  label={app.translate('routes.home.basic.personnel.Education')}
                  disabled
                  component={Select}
                  parser={(value) => {
                    switch (value) {
                      case 1:
                      case '1':
                        return app.translate('routes.home.basic.personnel.Unknown');
                      case 2:
                      case '2':
                        return app.translate('routes.home.basic.personnel.Under the diploma');
                      case 3:
                      case '3':
                        return app.translate('routes.home.basic.personnel.Diploma');
                      case 4:
                      case '4':
                        return app.translate('routes.home.basic.personnel.Associate Degree');
                      case 5:
                      case '5':
                        return app.translate('routes.home.basic.personnel.Bachelor');
                      case 6:
                      case '6':
                        return app.translate('routes.home.basic.personnel.Masters');
                      case 7:
                      case '7':
                        return app.translate('routes.home.basic.personnel.PHD');
                      default:
                        return value;
                    }
                  }}
                >
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
                </Field>
              </Col>,
              <Col key={11} sm={24} md={12} lg={8}>
                <Field
                  name="married"
                  label={app.translate('routes.home.basic.personnel.Marital Status')}
                  component={RadioGroup}
                  disabled
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
              </Col>,
              <Col key={12} sm={24} md={12} lg={8}>
                <Field
                  name="address"
                  label={app.translate('routes.home.basic.personnel.Address')}
                  component={TextArea}
                  disabled
                />
              </Col>,
            ] :
            <Col sm={24} md={12} lg={8}>
              <Field
                name="name"
                label={app.translate('routes.auth.Username')}
                component={Text}
              />
            </Col>
          }

          <Col sm={24} md={12} lg={8}>
            <Field
              name="email"
              label={app.translate('routes.home.basic.personnel.Email')}
              component={Email}
            />
          </Col>

          <Col sm={24} className="spacer"/>

          <Col sm={24} md={12} lg={8}>
            <ReduxField
              name="oldPassword"
              label={app.translate('routes.home.basic.personnel.Old Password', 'Old Password')}
              component={Password}
            />
          </Col>
          <Col sm={24} md={12} lg={8}>
            <ReduxField
              name="newPassword"
              label={app.translate('routes.home.basic.personnel.New Password', 'New Password')}
              component={Password}
            />
          </Col>
          <Col sm={24} md={12} lg={8}>
            <ReduxField
              name="newPasswordConfirmation"
              label={app.translate('routes.home.basic.personnel.ReNew Password', 'ReNew Password')}
              component={Password}
            />
          </Col>
          <Col
            sm={24}
          >
            <Button
              className="right"
              type="primary"
              onClick={handleSubmit}
            >
              {app.translate('main.Submit')}
            </Button>
          </Col>

          {/* <Col sm={24} md={12} lg={8}>*/}
          {/* <Field*/}
          {/* name="email"*/}
          {/* label={app.translate('routes.option.profile.Company Code')}*/}
          {/* component={Email}*/}
          {/* />*/}
          {/* <Form.Item*/}
          {/* label={app.translate('routes.option.profile.Company Code')}*/}
          {/* style={{display: 'flex'}}*/}
          {/* >*/}
          {/* <span className="ant-form-text">{this.props.currentUser.profile.company && this.props.currentUser.profile.company.name}</span>*/}
          {/* </Form.Item>*/}
          {/* </Col>*/}

        </Row>
      </Card>
    );
  }
}
