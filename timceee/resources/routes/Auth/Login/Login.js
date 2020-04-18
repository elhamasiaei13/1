import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {Card, Row, Col, Button, Select} from 'antd';
import {Text, Password} from 'components/redux-form';
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import validate from './validate';
import {authenticate} from './../Module';

@withRouter
@connect((state) => ({
  authenticating: state.Auth.authenticating,
}))
@reduxForm({
  form: 'login',
  validate,
  onSubmit: (values, dispatch, props) => dispatch(authenticate(values, (err) => !err && props.history.push('/'))), // (props.location.state && props.location.state.referrer) ||
})
@autobind
/**
 *
 */
export default class Login extends React.PureComponent {
  static propTypes = {
    authenticating: PropTypes.bool,
    history: PropTypes.object,
    submit: PropTypes.func,
  };

  /**
   *
   * @return {XML}
   */
  render() {
    const {history, authenticating, submit} = this.props;

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

              <img
                className="logo"
                src={`/src/${require('assets/images/jgpr-logo.png')}`}
              />

              <h2
                className="title"
              >
                {app.translate('main.appName')}
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
                name="username"
                label={app.translate('routes.auth.Username')}
                required
                inline
                onPressEnter={submit}
                component={Text}
              />

              <Field
                name="password"
                label={app.translate('routes.auth.Password')}
                required
                inline
                onPressEnter={submit}
                component={Password}
              />

              <p
                className="left"
                onClick={() => history.push('/password/reset')}
                style={{
                  cursor: 'pointer',
                }}
              >
                {app.translate('routes.auth.Forgot Password\?')}
              </p>

              <Button
                className="right"
                type="primary"
                onClick={submit}
                loading={authenticating}
              >
                {app.translate('routes.Login')}
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
