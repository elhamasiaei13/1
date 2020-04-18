import SurveyApi from '../api/SurveyApi'
import * as types from './actionTypes';
import { produceErrorData } from './actionUtility';
import {
	resultNormalizer,
	surveyNormalizer,
	surveysNormalizer,
	surveyParticipantDataNormalizer
} from '../schema/schema';

export function loadSurveys(tagId) {

	return function (dispatch) {

		return SurveyApi.getAllSurveys(tagId)
			.then(surveys => { dispatch(loadSurveysSuccess(surveys)); })
			.catch(error => { dispatch(loadSurveysFailure(error)); });
	};
}

export function loadSurveysSuccess(surveys) {

	return {
		type: types.LOAD_SURVEYS_SUCCESS,
		payload: surveys.length > 0 ? surveysNormalizer(surveys).entities : { surveys: {} }
	};
}


export function loadSurveysFailure(error) {
	return {
		type: types.LOAD_SURVEYS_FAILURE,
		payload: produceErrorData(error)
	};
}

//-----------------------------------------------------------------------------------
export function loadTopSurveys() {

	return function (dispatch) {

		return SurveyApi.getTopSurveys()
			.then(topSurveys => { dispatch(loadTopSurveysSuccess(topSurveys)); })
			.catch(error => { dispatch(loadTopSurveysFailure(error)); });
	};
}

export function loadTopSurveysSuccess(topSurveys) {

	return {
		type: types.LOAD_TOP_SURVEYS_SUCCESS,
		payload: {topSurveys}
	};
}


export function loadTopSurveysFailure(error) {
	return {
		type: types.LOAD_TOP_SURVEYS_FAILURE,
		payload: produceErrorData(error)
	};
}

//-----------------------------------------------------------------------------------
export function onSelectTag(tagId) {
	return function (dispatch) {
		dispatch(selectTag(tagId));
		dispatch(loadSurveys(tagId));
	}
}

export function selectTag(tagId) {
	return {
		type: types.SELECT_TAG,
		payload: { selectedTag: tagId }

	}
}
//-----------------------------------------------------------------------------------
export function loadTags() {

	return function (dispatch) {

		return SurveyApi.getAllTags()
			.then(tags => { dispatch(loadTagsSuccess(tags)); })
			.catch(error => { dispatch(loadTagsFailure(error)); });
	};
}

export function loadTagsSuccess(tags) {
	return {
		type: types.LOAD_TAGS_SUCCESS,
		payload: { tags }
	};
}



export function loadTagsFailure(error) {
	return {
		type: types.LOAD_TAGS_FAILURE,
		// payload: produceErrorData(error)
	};
}

//-----------------------------------------------------------------------------------
export function loadSurvey(surveyId) {

	return function (dispatch, getState) {
		//-------TODO: when HATEAOS implmented:---------//
		// const state = getState();				    //
		// state.db.entities.surveys._links[]			//
		// ...											//
		//----------------------------------------------//

		return SurveyApi.getSurvey("/surveys/" + surveyId)
			.then(survey => { dispatch(loadSurveySuccess(surveyId, survey)); })
			.catch(error => { dispatch(loadSurveyFailure(error)); });
	};
}

export function loadSurveySuccess(surveyId, survey) {

	const { surveys } = surveyNormalizer(survey).entities;
	return {
		type: types.LOAD_SURVEY_DETAILS_SUCCESS,
		payload: {
			surveyId,
			survey: surveys[surveyId]
		}
	}
}

export function loadSurveyFailure(error) {
	return {
		type: types.LOAD_SURVEY_DETAILS_FAILURE,
		payload: produceErrorData(error)
	};
}

export function destroySurvey(){
	return {
		type: types.DESTROY_SURVEY_DETAIL
	}
}

//-----------------------------------------------------------------------------------
export function loadSurveyParticipantDataHistory(surveyId) {

	return function (dispatch) {

		return SurveyApi.getHistories(surveyId)
			.then(spd => { dispatch(loadSurveyParticipantDataHistorySuccess(surveyId, spd)); })
			.catch(error => { dispatch(loadSurveyParticipantDataHistoryFailure(error)); });
	};
}

export function loadSurveyParticipantDataHistorySuccess(surveyId, spd) {

	return {
		type: types.LOAD_SURVEY_PARTICIPANT_DATA_HISTORY_SUCCESS,
		payload: {
			surveyId,
			spd
			// spd: surveyParticipantDataNormalizer(spd)
		}
	}
}

export function loadSurveyParticipantDataHistoryFailure(error) {
	return {
		type: types.LOAD_SURVEY_PARTICIPANT_DATA_HISTORY_FAILURE,
		payload: produceErrorData(error)
	};
}


//-----------------------------------------------------------------------------------
export function loadSurveyForRun(surveyId) {
	return function (dispatch) {
		//-------TODO: when HATEAOS implmented:---------//
		// const state = getState();				    //
		// state.db.entities.surveys._links[]			//
		// ...											//
		//----------------------------------------------//
		return SurveyApi.getSurveysForRun("/surveys/" + surveyId + "/run")
			.then(survey => { dispatch(loadSurveyForRunSuccess(surveyId, survey)); })
			.catch(error => { dispatch(loadSurveyForRunFailure(error)); })
	}
}

export function loadSurveyForRunSuccess(surveyId, survey) {

	const { surveys, answerOptions, questions } = surveyNormalizer(survey).entities;
	return {
		type: types.LOAD_SURVEY_FOR_RUN_SUCCESS,
		payload: {
			surveyId,
			survey: surveys[surveyId],
			answerOptions,
			questions
		}
	}
}

export function loadSurveyForRunFailure(error) {
	return {
		type: types.LOAD_SURVEY_FOR_RUN_FAILURE,
		payload: produceErrorData(error)
	}

}

//-----------------------------------------------------------------------------------
export function destroySurveyForRun() {
	return {
		type: types.DESTROY_SURVEY_FOR_RUN
	}
}

//-----------------------------------------------------------------------------------
export function selectAnswer(surveyId, qId, ansId) {
	return (dispatch, getState) => {

		//TODO: if not equal with answer in state.ui.surveyRunner... then :	
		dispatch({
			type: types.SELECT_ANSWER,
			payload: {
				questionId: qId,
				answerId: ansId
			}
		});

		const { unpersistAnswers } = getState().ui.survey.surveyRunner;
		if (Object.keys(unpersistAnswers).length >= 2) {
			dispatch(postAnswers(surveyId));
		}
	}
}

//-----------------------------------------------------------------------------------
export function clean(surveyId) {
	return (dispatch) => {

		return SurveyApi.getClean(surveyId)
			.then(resetedSurvey => {
				dispatch(cleanSuccess(surveyId, resetedSurvey));
			})
			.catch(error => {
				dispatch(cleanFailure(error));
			})
	}
}

export function cleanSuccess(surveyId, survey) {

	const { surveys, answerOptions, questions } = surveyNormalizer(survey).entities;
	return {
		type: types.CLEAN_SURVEY_SUCCESS,
		payload: {
			surveyId,
			survey: surveys[surveyId],
			answerOptions,
			questions
		}
	}

}

export function cleanFailure(error) {
	return {
		type: types.LOAD_SURVEY_FOR_RUN_FAILURE,
		payload: produceErrorData(error)
	}

}


//-----------------------------------------------------------------------------------
export function draft(surveyId) {
	return (dispatch, getState) => {

		// dispatch({
		// 	type: types.DRAFT_ANSWERS,			
		// });

		const { unpersistAnswers } = getState().ui.survey.surveyRunner;
		if (Object.keys(unpersistAnswers).length > 0) {
			dispatch(postAnswers(surveyId));
		}
	}
}

//-----------------------------------------------------------------------------------
export function postAnswers(surveyId) {

	return (dispatch, getState) => {
		const { unpersistAnswers } = getState().ui.survey.surveyRunner;
		const unpersistAnswerUuids = convertAnswerIdsToUuids(getState, unpersistAnswers);

		return SurveyApi.postAnswers("/surveys/" + surveyId + "/run", unpersistAnswerUuids)
			.then(response => {
				dispatch(postAnswersSuccess());
			})
			.catch(error => {
				dispatch(postAnswersFailure(error));
			})
	}
}

function convertAnswerIdsToUuids(getState, questionAnswerIdPairs) {

	const { questions, answerOptions } = getState().ui.survey.surveyRunner;

	const qstAndAnsArr = Object.values(questionAnswerIdPairs).map(idPair => {
		const questionId = Object.keys(idPair)[0];
		const answerId = Object.values(idPair)[0];
		const questionUuid = questions[questionId].uuid;
		const answerUuid = answerOptions[answerId].uuid;
		return { [questionUuid]: answerUuid };
	});

	return qstAndAnsArr.reduce((qst, ans) => Object.assign(qst, ans), {});
}

export function postAnswersSuccess() {
	return {
		type: types.POST_ANSWERS_SUCCESS,
		//payload: perhaps response codes. . .
	}
}

export function postAnswersFailure(error) {
	return {
		type: types.POST_ANSWERS_FAILURE,
		payload: produceErrorData(error)
	}

}

//-----------------------------------------------------------------------------------
export function end(surveyId) {

	return (dispatch, getState) => {
		const { unpersistAnswers, questions } = getState().ui.survey.surveyRunner;
		const unpersistAnswerUuids = convertAnswerIdsToUuids(getState, unpersistAnswers);

		let questionsWithoutPersistedAnswer = {};
		for (var key in questions) {
			if (questions.hasOwnProperty(key) && !questions[key].persistedAnswerUuid) {
				questionsWithoutPersistedAnswer[questions[key].uuid] = key;
			}
		}

		let UnanswerQuestions = []
		Object.keys(questionsWithoutPersistedAnswer).forEach(qUuid => {
			if (!unpersistAnswerUuids[qUuid]) {
				UnanswerQuestions.push(questionsWithoutPersistedAnswer[qUuid]);
			}
		})


		if (UnanswerQuestions.length > 0) {
			return dispatch(endWithUnansweredQuestions(UnanswerQuestions));
		}


		return SurveyApi.end(surveyId, unpersistAnswerUuids)
			.then(response => {
				//TODO: If response was 200 then:
				dispatch(endSuccess());
			})
			.catch(error => {
				dispatch(endFailure(error));
			})
	}
}

export function endWithUnansweredQuestions(UnanswerQuestions) {
	return {
		type: types.END_SURVEY_WITH_UNANSWER_QUESTIONS,
		payload: {
			err: {
				error: types.END_SURVEY_WITH_UNANSWER_QUESTIONS,
				message: 'برای دیدن نتیجه آزمون می بایست ابتدا به تمام سوالات آن پاسخ دهید.',
				UnanswerQuestions
			}
		}
	}
}
export function endSuccess() {
	return {
		type: types.END_SURVEY_SUCCESS,
		//payload: perhaps response codes. . .
	}
}

export function endFailure(error) {
	return {
		type: types.END_SURVEY_FAILURE,
		payload: produceErrorData(error)
	}

}

//-----------------------------------------------------------------------------------
export function loadResult(surveyId, surveyParticipantDataId) {
	return function (dispatch) {

		return SurveyApi.getResult(surveyId, surveyParticipantDataId)
			.then(result => { dispatch(loadResultSuccess(surveyParticipantDataId, result)); })
			.catch(error => { dispatch(loadResultFailure(error)); });
	};
}

export function loadResultSuccess(surveyParticipantDataId, result) {

	const { results } = resultNormalizer(result).entities;
	return {
		type: types.LOAD_RESULT_SUCCESS,
		payload: {
			surveyParticipantDataId,
			result: results[surveyParticipantDataId]
		}
	}
}

export function loadResultFailure(error) {
	return {
		type: types.LOAD_RESULT_FAILURE,
		payload: produceErrorData(error)
	};
}

//-----------------------------------------------------------------------------------
export function loadSurveyHistories(surveyId) {
	return function (dispatch) {

		return SurveyApi.getSurveyHistories(surveyId)
			.then(surveyHistories => { dispatch(loadSurveyHistoriesSuccess(surveyHistories)); })
			.catch(error => { dispatch(loadSurveyHistoriesFailure(error)); });
	};
}

export function loadSurveyHistoriesSuccess(surveyHistories) {
	
	return {
		type: types.LOAD_SURVEY_HISTORIES_SUCCESS,
		payload: {			
			surveyHistories
		}
	}
}

export function loadSurveyHistoriesFailure(error) {
	return {
		type: types.LOAD_SURVEY_HISTORIES_FAILURE,
		payload: produceErrorData(error)
	};
}

//-----------------------------------------------------------------------------------
export function loadAnswerSheet(surveyId, surveyParticipantDataId) {
	return function (dispatch) {

		return SurveyApi.getAnswerSheet(surveyId,surveyParticipantDataId)
			.then(answerSheet => { dispatch(loadAnswerSheetSuccess(answerSheet)); })
			.catch(error => { dispatch(loadAnswerSheetFailure(error)); });
	};
}

export function loadAnswerSheetSuccess(answerSheet) {
	
	return {
		type: types.LOAD_SURVEY_ANSWER_SHEET_SUCCESS,
		payload: {			
			answerSheet
		}
	}
}

export function loadAnswerSheetFailure(error) {
	return {
		type: types.LOAD_SURVEY_ANSWER_SHEET_FAILURE,
		payload: produceErrorData(error)
	};
}
