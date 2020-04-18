import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../../components/user/Register';
import { withRouter, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { register, reloadCaptcha } from '../../actions/userActions'
import GenericError from '../../components/common/GenericError'
import { Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


class RegisterContainer extends Component {

    render() {
        const {
            actions,
            submitting,
            error,
            authenticated,
            captcha
        } = this.props;

        const { register, reloadCaptcha } = actions;

        if (error && (error.status !== 418 || (error.status===418 && !error.recoverable) )) {
            return (
                <GenericError err={error} />
            )
        }

        if (authenticated) {
            return (
                // <Redirect to="/" />
                <Alert bsStyle="success" >
                    <h2>
                        به روان آگاهی خوش آمدید.
                </h2>
                    <p>
                        ثبت نام با موفقیت انجام شد. می‌خواهم به
                <LinkContainer to="/" >
                            <Button bsStyle="link">صفحه اصلی</Button>
                        </LinkContainer>
                        بروم.
                </p>
                </Alert>
            );
        }

        return (
            <Register
                onSubmit={register}
                reloadCaptchaHandler={reloadCaptcha}
                captcha={captcha}
                callbackError={error ? error.code : null}
                submitting={submitting}
            />
        );
    }
    componentDidMount() {
        const {actions} = this.props;
        actions.reloadCaptcha();
    }
    

}

RegisterContainer.PropTypes = {
    actions: PropTypes.shape({
        register: PropTypes.func.isRequired,
        reloadCaptcha: PropTypes.func.isRequired,
    }).isRequired,
    error: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { submitting, error, captcha } = state.ui.user.register;
    const { authenticated } = state.app.auth;

    return {
        error: error,
        submitting: submitting,
        captcha,
        authenticated,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            register,
            reloadCaptcha
        }, dispatch)
    };
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer));