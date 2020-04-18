import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

// Surveys-----------------------------------------------------------------------------------------------------------------------
function loadAllSurveys(state, action) {
	const { surveys } = action.payload.entities
	return surveys;
}

function updateSurveyDetails(state, action) {
	const { payload } = action;
	const { survey, surveyId } = payload;

	return {
		...state,
		[surveyId]: survey
	};
}

function surveyEntity(state = {}, action) {

	switch (action.type) {

		case types.LOAD_SURVEYS_SUCCESS:
			return loadAllSurveys(state, action);

		case types.LOAD_SURVEY_DETAILS_SUCCESS:
		case types.LOAD_SURVEY_FOR_RUN_SUCCESS:
		case types.CLEAN_SURVEY_SUCCESS:
			return updateSurveyDetails(state, action);

		default:
			return state;
	}
}

function loadAllSurveyIds(state, action) {

	const { surveys } = action.payload.result;
	return surveys;
}

function surveyResult(state = [], action) {

	switch (action.type) {

		case types.LOAD_SURVEYS_SUCCESS:
			return loadAllSurveyIds(state, action);

		//case types.LOAD_SURVEY_SUCCESS:			

		default:
			return state;
	}
}
// Results-----------------------------------------------------------------------------------------------------------------------
function resultEntity(state = {}, action) {

	switch (action.type) {

		case types.LOAD_RESULT_SUCCESS:
			return insertResult(state, action);

		default:
			return state;
	}
}

function insertResult(state, action) {
	const { payload } = action;
	const { result, surveyParticipantDataId } = payload;

	return {
		...state,
		[surveyParticipantDataId]: result
	};
}

// function resultResult(state = [], action) {

// 	switch (action.type) {

// 		case types.LOAD_RESULT_SUCCESS:
// 			return . . .

// 		default:
// 			return state;
// 	}
// }



// Users-----------------------------------------------------------------------------------------------------------------------
// function userEntity(state = {}, action) {
// 	switch (action.type) {

// 		case types.LOGIN_SUCCESS:
// 			return action.payload.entities.users;

// 		default:
// 			return state;
// 	}
// }


// function userResult(state = [], action) {
// 	switch (action.type) {

// 		case types.LOGIN_SUCCESS:
// 			return [action.payload.result];

// 		default:
// 			return state;
// 	}
// }


const entities = combineReducers({
	surveys: surveyEntity,
	results: resultEntity,
	//users: userEntity
	//Other place here. . .
});

const result = combineReducers({
	surveys: surveyResult,
	//users: userResult
	//Other place here. . .
});

const db = combineReducers({
	entities,
	result
});

export default db