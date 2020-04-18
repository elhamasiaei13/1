import UserApi from '../api/UserApi'
import * as types from './actionTypes';
import { produceErrorData } from './actionUtility';
import Profile from '../components/user/Profile';

// -------------------------------------------------------------------------------------
export function login(username, password) {
    return (dispatch) => {
        dispatch({
            type: types.LOGIN_WAITING,
            payload: {}
        });
        UserApi.getCaptcha();
        return UserApi.login(username, password)
            .then(user => {
                dispatch(loginSuccess(user));
            })
            .catch(error => {
                dispatch(loginFialure(username, error))
            });
    }
}

export function loginSuccess(user) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: { user }
    }
}

export function loginFialure(username, error) {    
    return {
        type: types.LOGIN_FAILURE,
        payload: produceErrorData(error,{username})
            
        
    }
}

// -------------------------------------------------------------------------------------
export function logout() {
    return (dispatch) => {
        return UserApi.logout()
            .then(response => {
                dispatch(logoutSuccess());
            });
    }
}

export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS,
    }
}

// -------------------------------------------------------------------------------------
export function register(registerData) {
    return (dispatch) => {
        // dispatch(registerRequest);

        return UserApi.register(registerData)
            .then(response => {
                dispatch(registerSuccess(response));
                dispatch(login(registerData.username, registerData.password));
            })
            .catch(error => { dispatch(registerFailure(error)) });
    }
}

export function registerSuccess(response) {
    return {
        type: types.REGISTER_SUCCESS,
        payload: null
    }
}

export function registerFailure(error) {
    return {
        type: types.REGISTER_FAILURE,
        payload: produceErrorData(error)
    }
}

// -------------------------------------------------------------------------------------
export function destroyGenericError() {
    return {
        type: types.DESTROY_GENERIC_ERR
    }
}

// -------------------------------------------------------------------------------------
export function reloadCaptcha() {
    return (dispatch) => {

        return UserApi.getCaptcha()
            .then(captcha => {
                dispatch(reloadCaptchaSuccess(captcha));
            })
            .catch(error => {
                dispatch(reloadCaptchaFailure(error))
            });
    }
}

export function reloadCaptchaSuccess(captcha) {

    return {
        type: types.RELOAD_CAPTCHA_SUCCESS,
        payload: { captcha }
    }
}

export function reloadCaptchaFailure(error) {
    return {
        type: types.RELOAD_CAPTCHA_SUCCESS,
        payload: produceErrorData(error)
    }
}

// -------------------------------------------------------------------------------------
export function loadPersonalInfo() {
    return (dispatch) => {

        return UserApi.getPersonalInfo()
            .then(personalInfo => {
                dispatch(loadPersonalInfoSuccess(personalInfo));
            })
            .catch(error => {
                dispatch(loadPersonalInfoFailure(error))
            });
    }
}

export function loadPersonalInfoSuccess(personalInfo) {

    return {
        type: types.LOAD_PERSONAL_INFO_SUCCESS,
        payload: { personalInfo }
    }
}

export function loadPersonalInfoFailure(error) {
    return {
        type: types.LOAD_PERSONAL_INFO_FAILURE,
        payload: produceErrorData(error)
    }
}

// -------------------------------------------------------------------------------------
export function loadUserSurveyHistory() {
    return (dispatch) => {

        return UserApi.getUserSurveysHistories()
            .then(history => {
                dispatch(loadUserSurveyHistorySuccess(history));
            })
            .catch(error => {
                dispatch(loadUserSurveyHistoryFailure(error))
            });
    }
}

export function loadUserSurveyHistorySuccess(history) {
    return {
        type: types.LOAD_USER_SURVEY_HISTORY_SUCCESS,
        payload: { history }
    }
}

export function loadUserSurveyHistoryFailure(error) {
    return {
        type: types.LOAD_USER_SURVEY_HISTORY_FAILURE,
        payload: produceErrorData(error)
    }
}