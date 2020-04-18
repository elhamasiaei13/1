import axios from 'axios';
import { HOST_URL } from './constants';

// const CONSTANTS = process.env.PUBLIC_URL+ '/constants.js'
// const HOST_URL = CONSTANTS.HOST_URL;

class SurveyApi {


	static get(uri) {
		return axios.get(HOST_URL + uri,
			{
				withCredentials: true,
				headers: { 'X-Requested-With': 'XMLHttpRequest' }
			}
		)
			.then(response => { return response.data; })
			.catch(error => { throw (error); });
	}

	static getAllSurveys(tagId) {

		const PATH = HOST_URL + '/surveys';
		let params = null;

		if (tagId) {
			params = {
				params: {
					tagId: tagId
				}
			};
		}

		return axios.get(PATH, params)
			.then(response => {
				return response.data;
			})
			.catch(error => { throw (error); });
	}

	static getAllTags() {
		const PATH = `/tags/tree`;
		return this.get(PATH);
	}

	static getSurvey(surveyUri) {
		return this.get(surveyUri);
	}

	static getSurveysForRun(runUri) {
		return this.get(runUri);
	}

	static postAnswers(uri, answers) {
		const URL = HOST_URL + uri;
		return axios.post(URL, answers, { withCredentials: true })
			.then(response => { return response })
			.catch(error => { throw (error) });
	}

	static end(surveyId, answers) {
		const URL = `${HOST_URL}/surveys/${surveyId}/end`;
		return axios.post(URL, answers, { withCredentials: true })
			.then(response => { return response })
			.catch(error => { throw (error) });
	}

	static getResult(surveyId, surveyParticipantDataId) {
		const PATH = `/surveys/${surveyId}/surveyparticipantdata/${surveyParticipantDataId}/result`;
		return this.get(PATH);
	}

	static getClean(surveyId) {
		const PATH = `/surveys/${surveyId}/clean`;
		return this.get(PATH);
	}

	static getHistories(surveyId) {
		const PATH = `/surveys/${surveyId}/surveyparticipantdata/history`;
		return this.get(PATH);
	}

	static getTopSurveys() {
		const PATH = `/surveys/top`;
		return this.get(PATH);
	}

	static getSurveyHistories(surveyId) {
		const PATH = `/surveys/${surveyId}/surveyparticipantdata/history`;
		return this.get(PATH);
	}

	static getAnswerSheet(surveyId, surveyParticipantDataId) {
		const PATH = `/surveys/${surveyId}/surveyparticipantdata/${surveyParticipantDataId}/view`;
		return this.get(PATH);
	}

}

export default SurveyApi;
