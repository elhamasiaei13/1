import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const LOGIN_INITIAL_STATE = {
	error: null,
	submitting: false
}

function login(state = LOGIN_INITIAL_STATE, action) {
	const { payload } = action;

	switch (action.type) {

		case types.LOGIN_WAITING:
			return {
				submitting: true,
				error: null
			};

		case types.LOGIN_SUCCESS:
			return {
				submitting: false,
				error: null
			};

		case types.LOGIN_FAILURE:
			return {
				submitting: false,
				error: payload.err
			};

		default:
			return state;

	}
}


const REGISTER_INITIAL_STATE = {
	error: null,
	submitting: false,
	captcha: null
}


function register(state = REGISTER_INITIAL_STATE, action) {
	const { payload } = action;

	switch (action.type) {

		case types.LOGIN_SUCCESS:
			return {
				...state,
				submitting: false,
				error: null
			};

		case types.REGISTER_FAILURE:
			return {
				...state,
				submitting: false,
				error: payload.err
			};

		case types.RELOAD_CAPTCHA_SUCCESS:
			return {
				...state,
				captcha: payload.captcha,
			}
		default:
			return state;

	}
}

const PROFILE_INITIAL_STATE = {
	personalInfo: {
		error: null,
		loading: false,
		obj: {},
	},
	mySurveys: {
		error: null,
		loading: false,
		arr: []
	}
}


function profile(state = PROFILE_INITIAL_STATE, action) {
	const { payload } = action;

	switch (action.type) {

		case types.LOAD_PERSONAL_INFO_SUCCESS:
			return {
				...state,
				personalInfo: {
					obj: payload.personalInfo,
					loading: false,
					error: null
				}
			};

		case types.LOAD_PERSONAL_INFO_FAILURE:
			return {
				...state,
				personalInfo: {
					obj: {},
					loading: false,
					error: payload.err
				}
			};

		case types.LOAD_USER_SURVEY_HISTORY_SUCCESS:
			return {
				...state,
				mySurveys: {
					arr: payload.history,
					loading: false,
					error: null
				}
			};

		case types.LOAD_USER_SURVEY_HISTORY_FAILURE:
			return {
				...state,
				mySurveys: {
					arr: [],
					loading: false,
					error: payload.err
				}
			};

		default:
			return state;

	}
}

const userReducer = combineReducers({
	login,
	register,
	profile
});

export default userReducer;
