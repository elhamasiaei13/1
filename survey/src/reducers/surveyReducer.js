import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const HOME_INITIAL_STATE = {	
	error: null,
	loading: true,
	topSurveys: [],	
}

function home(state = HOME_INITIAL_STATE, action) {

	const { type, payload } = action;
	switch (type) {

		case types.LOAD_TOP_SURVEYS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				topSurveys: payload.topSurveys,
			};

		case types.LOAD_TOP_SURVEYS_FAILURE:
			return {
				...state,
				loading: false,
				error: payload.err
			};

		default:
			return state;
	}
}

const SURVEYS_INITIAL_STATE = {
	map: {},
	error: null,
	loading: true,
	tags: [],
	selectedTag: null,
}

function surveys(state = SURVEYS_INITIAL_STATE, action) {
	switch (action.type) {

		case types.LOAD_SURVEYS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				map: action.payload.surveys,
			};

		case types.LOAD_SURVEYS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.err
			};

		case types.LOAD_TAGS_SUCCESS:
			return {
				...state,
				tags: action.payload.tags
			}

		case types.SELECT_TAG:
			return {
				...state,
				selectedTag: action.payload.selectedTag
			};

		
		default:
			return state;

	}
}

const SURVEY_DETAIL_INITIAL_STATE = {
	obj: {},
	spdHistories: null,
	error: null,
	loading: true
}

function surveyDetail(state = SURVEY_DETAIL_INITIAL_STATE, action) {

	const { type, payload } = action;
	switch (type) {

		case types.LOAD_SURVEY_DETAILS_SUCCESS:
			return {
				loading: false,
				error: null,
				spdHistories: null,
				obj: payload.survey,
			};

		case types.LOAD_SURVEY_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: payload.err
			};

		case types.LOAD_SURVEY_PARTICIPANT_DATA_HISTORY_SUCCESS:
			return {
				...state,
				spdHistories: payload.spd
			}
		
		case types.DESTROY_SURVEY_DETAIL:
			return SURVEY_DETAIL_INITIAL_STATE;
			
		default:
			return state;

	}
}

const SURVEY_RUNNER_INITIAL_STATE = {
	error: null,
	loading: true,
	survey: {},
	questions: {},
	answerOptions: {},
	unpersistAnswers: []
}

function surveyRunner(state = SURVEY_RUNNER_INITIAL_STATE, action) {

	const { type, payload } = action;
	switch (type) {

		case types.LOAD_SURVEY_FOR_RUN_SUCCESS:
		case types.CLEAN_SURVEY_SUCCESS:
			const
				{
					survey,
					questions,
					answerOptions
				} = payload;

			return {
				loading: false,
				error: null,
				survey,
				questions,
				answerOptions,
				unpersistAnswers: {}
			};

		case types.LOAD_SURVEY_FOR_RUN_FAILURE:
		case types.CLEAN_SURVEY_FAILURE:
		case types.END_SURVEY_FAILURE:
			return {
				...state,
				loading: false,
				error: payload.err
			};

		case types.SELECT_ANSWER:
			const { questionId, answerId } = payload;

			const newAnswers = state.unpersistAnswers;
			newAnswers[questionId] = { [questionId]: answerId };

			return {
				...state,
				questions: {
					...state.questions,
					[questionId]: {
						...state.questions[questionId],
						unansweredErr: false
					}
				},
				loading: false,
				error: null,
				unpersistAnswers: newAnswers
			};

		case types.POST_ANSWERS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				unpersistAnswers: {},
				questions: updatePersistedAnswersOfQuestions(state, action)
			};

		case types.END_SURVEY_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				unpersistAnswers: {},
				questions: updatePersistedAnswersOfQuestions(state, action),
				survey: { ...state.survey, state: 'END' }
			};
		case types.END_SURVEY_WITH_UNANSWER_QUESTIONS:
			return {
				...state,
				questions: updateUnansweredErrorOfQuestions(state, payload.err.UnanswerQuestions),
				loading: false,
				error: payload.err
			};
		case types.DESTROY_SURVEY_FOR_RUN:
			return SURVEY_RUNNER_INITIAL_STATE;

		default:
			return state;

	}
}

function updateUnansweredErrorOfQuestions(state, actionUnanswerQestions) {
	const { questions } = state;
	actionUnanswerQestions.forEach(qId => {
		questions[qId] = {
			...questions[qId],
			unansweredErr: true
		}
	})
	return questions;
}

function updatePersistedAnswersOfQuestions(state, action) {
	const { unpersistAnswers, questions, answerOptions } = state;
	const questionIds = Object.keys(unpersistAnswers);

	questionIds.forEach(qId => {
		const answerId = Object.values(unpersistAnswers[questionIds[0]])[0];
		const persistAnswerUuid = answerOptions[answerId].uuid;
		questions[qId].unansweredErr = false;
		questions[qId].persistedAnswerUuid = persistAnswerUuid;
	})

	return questions;
}

const SURVEY_RESULT_INITIAL_STATE = {
	error: null,
	loading: true,
	result: {},
}

function surveyResult(state = SURVEY_RESULT_INITIAL_STATE, action) {
	const { type, payload } = action;
	switch (type) {
		case types.LOAD_RESULT_SUCCESS:
			return {
				error: null,
				loading: false,
				result: payload.result
			};
		case types.LOAD_RESULT_FAILURE:
			return {
				...state,
				error: payload.err,
				loading: false,
			};

		default:
			return state;
	}
}

const SURVEY_HISTORIES_INITIAL_STATE = {
	error: null,
	loading: true,
	obj: {},
}

function surveyHistories(state = SURVEY_HISTORIES_INITIAL_STATE, action) {
	const { type, payload } = action;
	switch (type) {
		case types.LOAD_SURVEY_HISTORIES_SUCCESS:
			return {
				error: null,
				loading: false,
				obj: payload.surveyHistories
			};
		case types.LOAD_SURVEY_HISTORIES_FAILURE:
			return {
				obj:{},
				error: payload.err,
				loading: false,
			};

		default:
			return state;
	}
}

const  ANSWER_SHEET_INITIAL_STATE = {
	error: null,
	loading: true,
	obj: {},
}

function answerSheet(state = ANSWER_SHEET_INITIAL_STATE, action) {
	const { type, payload } = action;
	switch (type) {
		case types.LOAD_SURVEY_ANSWER_SHEET_SUCCESS:
			return {
				error: null,
				loading: false,
				obj: payload.answerSheet
			};
		case types.LOAD_SURVEY_ANSWER_SHEET_FAILURE:
			return {
				obj:{},
				error: payload.err,
				loading: false,
			};

		default:
			return state;
	}
}


const surveyReducer = combineReducers({
	home,
	surveys,
	surveyDetail,
	surveyRunner,
	surveyResult,
	surveyHistories,
	answerSheet
});

export default surveyReducer;

