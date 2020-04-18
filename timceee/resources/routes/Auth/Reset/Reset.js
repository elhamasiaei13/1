import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm, getFormValues} from 'redux-form';
import {Card, Row, Col, Button, Select} from 'antd';
import {Email, TextArea, Password} from 'components/redux-form';
import PropTypes from 'prop-types';
import MaterialIcon from 'components/common/MaterialIcon';
import Hint from 'components/common/Hint';
import jMoment from 'moment-jalaali';
import regex from 'services/regex';
import validate from './validate';
import {emailResetToken, resetPassword} from './../Module';

@withRouter
@reduxForm({
  form: 'reset-password',
  validate,
  onSubmit: (values, dispatch, props) => dispatch(resetPassword(values, (err) => !err && props.history.push('/login'))),
})
@connect((state) => ({
  values: getFormValues('reset-password')(state),
}), {
  emailResetToken,
})
@autobind
/**
 *
 */
export default class Reset extends React.PureComponent {
  static propTypes = {
    submitting: PropTypes.bool,
    history: PropTypes.object,
    values: PropTypes.object,
    submit: PropTypes.func,
    emailResetToken: PropTypes.func,
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      reset: false,
      sending: false,
    };
  }

  /**
   *
   * @private
   */
  _sendEmail() {
    const {emailResetToken, values} = this.props;

    if (values && values.email && regex.email.test(values.email)) {
      this.setState({
        sending: true,
      }, () => emailResetToken({email: values.email}, (err) => this.setState({sending: false}, () => !err && this.setState({reset: true}))));
    }
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {sending, reset} = this.state;
    const {history, submitting, submit} = this.props;

    return (
      <div
        className="wrapper auth"
      >
        <Row
          className="center"
        >
          <Col md={6}>
            <Card
              style={{width: '100%'}}
            >

              <MaterialIcon
                className="logo"
                name="lock-reset"
                spin={sending || submitting}
                style={{
                  color: '#ff9800',
                }}
              />

              <h2
                className="title"
              >
                {app.translate('routes.Password Reset')}
              </h2>

              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#e9e9e9',
                  margin: '16px 0',
                  width: '100%',
                  height: 1,
                }}
              />

              <Field
                name="email"
                label={<span>
                  {app.translate('routes.auth.Email')} <Hint text={app.translate('routes.auth.We will send a reset token to this email which you have to enter in the next step')}/>
                </span>}
                required
                inline
                onPressEnter={this._sendEmail}
                disabled={reset}
                component={Email}
              />

              {
                reset &&
                [
                  <Field
                    key="password"
                    name="password"
                    label={app.translate('routes.auth.Password')}
                    required
                    inline
                    onPressEnter={submit}
                    component={Password}
                  />,
                  <Field
                    key="passwordConfirmation"
                    name="passwordConfirmation"
                    label={app.translate('routes.auth.Password Confirmation')}
                    required
                    inline
                    onPressEnter={submit}
                    component={Password}
                  />,
                  <Field
                    key="token"
                    name="token"
                    label={app.translate('routes.auth.Reset Token')}
                    required
                    inline
                    onPressEnter={submit}
                    autosize={{maxRows: 3}}
                    component={TextArea}
                  />,
                ]
              }

              <p
                className="left"
                onClick={() => history.push('/login')}
                style={{
                  cursor: 'pointer',
                }}
              >
                {app.translate('routes.Login')}
              </p>

              <Button
                className="right"
                type="primary"
                onClick={reset ? submit : this._sendEmail}
                loading={sending || submitting}
              >
                {reset ? app.translate('routes.auth.Reset') : app.translate('routes.auth.Send Email')}
              </Button>

            </Card>

            <div
              style={{
                display: 'flex',
                marginTop: 8,
              }}
            >
              <Select
                defaultValue={app.lang.get()}
                onChange={(language) => {
                  app.lang.set(language);
                  location.reload();
                }}
              >
                <Select.Option value="fa">فارسی</Select.Option>
                <Select.Option value="en">English</Select.Option>
              </Select>

              <div
                className="copyrights"
                style={{
                  flex: 'auto',
                  textAlign: 'end',
                }}
              >
                {app.translate('main.copyrights', {date: jMoment().format(app.translate('main.YYYY'))})}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
