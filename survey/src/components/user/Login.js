import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Form,
    Col,
    Button,
    Alert,
    PageHeader,
    ButtonToolbar,
} from 'react-bootstrap';
import { FieldGroup } from '../common/Commons';
import { FormattedMessage } from 'react-intl';

class Login extends Component {

    constructor(props) {
        super(props);
        const username = props.callbackError ?
            props.callbackError.username : '';
        this.state = { username };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFieldChange(e) {

        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const { onSubmit } = this.props;
        onSubmit(username, password);
    }

    render() {
        const { submitting, callbackError } = this.props;
        return (
            <div>
                <PageHeader>
                    ورود
				</PageHeader>
                <Col xs={12} sm={6} md={4} mdOffset={4} smOffset={3}>

                    <Form onChange={this.onFieldChange} onSubmit={this.onSubmit} >
                        {callbackError &&
                            <Alert bsStyle="danger">
                                <FormattedMessage
                                    id={`code.${callbackError.code}`}
                                    defaultMessage={callbackError.code} />
                            </Alert>
                        }
                        <FieldGroup
                            id="registerUsername"
                            label="ایمیل"
                            value={this.state.username}
                            name="username"
                            placeholder="Email"
                            style={{ direction: "ltr" }}
                            onChange={this.onFieldChange}
                            type="text" />

                        <FieldGroup
                            id="registerPassword"
                            label="گذرواژه"
                            name="password"
                            placeholder="گذرواژه"
                            onChange={this.onFieldChange}
                            type="password" />

                        <ButtonToolbar>
                            <Button type="submit" bsStyle="success" disabled={submitting}>
                                <i className="fa fa-sign-in" >&nbsp;</i>
                                ورود
                            </Button>
                            <LinkContainer to="/register" exact>
                                <Button bsStyle="link">ثبت نام</Button>
                            </LinkContainer>
                        </ButtonToolbar>

                    </Form>
                </Col>
            </div>
        );
    }
}

Login.PropTypes = {
    onSubmit: PropTypes.func.isRequired,
    callbackError: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
};

export default Login;