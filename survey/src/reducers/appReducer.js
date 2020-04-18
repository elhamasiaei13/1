import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const GENERIC_ERROR_INITIAL_STATE = null

function genericError(state = GENERIC_ERROR_INITIAL_STATE, action) {
    
    const {payload, type} = action;

    switch (type) {

		case types.API_GENERIC_ERR_OCCURRED:
            
            return payload;
        
        case types.DESTROY_GENERIC_ERR:
            return GENERIC_ERROR_INITIAL_STATE;

		default:
			return state;

	}
}

const AUTH_INITIAL_STATE={
    authenticated: false,    
}
function auth(state = AUTH_INITIAL_STATE, action) {
    
    const {payload, type} = action;

    switch (type) {

		case types.API_UNAUTHENTICATED_ERR_OCCURRED:
        case types.LOGOUT_SUCCESS:
            return {
                authenticated:false,                
            };
        
        case types.LOGIN_SUCCESS:
            return {
                authenticated:true,
                user: payload.user
            }                     
        
        default:
			return state;

	}
}

const appReducer = combineReducers({
    genericError,
    auth
});

export default appReducer;
