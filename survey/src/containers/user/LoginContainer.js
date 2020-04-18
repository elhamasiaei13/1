import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';
import { login, destroyGenericError } from '../../actions/userActions'
import Login from '../../components/user/Login';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';
import GenericError from '../../components/common/GenericError';
import Loading from '../../components/common/Loading';


class LoginContainer extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        const {
            logged,
            actions,
            error,
            submitting,
            location } = this.props;
        const { login } = actions;
        const { from } = location.state || { from: { pathname: '/' } }

        if (logged) {
            return <Redirect to={from} />;
        }

        if (submitting) {
            return <Loading />
        }

        if (error && error.status !== "401") {
            return <GenericError err={error} />
        }

        return (
            <Login
                onSubmit={login}
                callbackError={error}
                submitting={submitting} />
        );
    }

    componentWillUnmount() {
        // console.log('LoginContainer componentWillUnmount');
        const { actions } = this.props;
        actions.destroyGenericError();

    }


}

LoginContainer.PropTypes = {
    actions: PropTypes.shape({
        login: PropTypes.func.isRequired,
    }).isRequired,
    error: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
    logged: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {

    const { submitting, error } = state.ui.user.login;
    const { authenticated } = state.app.auth;
    return {
        error: error,
        submitting: submitting,
        logged: authenticated
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            login,
            destroyGenericError,
        }, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer));