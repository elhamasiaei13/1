import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	destroySurveyForRun,
	draft,
	end,
	clean,
	selectAnswer,
	loadSurveyForRun
} from '../../actions/surveyActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import SurveysRunner from '../../components/surveys/SurveysRunner'
import Redirect from 'react-router-dom/Redirect';
import GenericError from '../../components/common/GenericError';
import Loading from '../../components/common/Loading';


class SurveysRunnerContainer extends Component {

	constructor(props) {
		super(props);
		this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
	}

	handleChangeAnswer(qId, ansId) {
		const { actions, selectedSurveyId } = this.props;
		actions.selectAnswer(selectedSurveyId, qId, ansId);
	}

	render() {

		const {
			error,
			loading,
			survey,
			questions,
			answerOptions,
			// location,
			actions,
		} = this.props;

		const { draft, end, clean } = actions;

		if (error && error.status && error.status!=418) {
			return (
				<GenericError err={error} />
			)
		}


		if (loading) {
			return (
				<Loading />
			);
		}

		if (survey.state === 'END') {
			// alert('success');
			return (
				<Redirect to={`/surveys/${survey.id}/${survey.surveyParticipantDataId}/result`} />
			);
		}

		return (
			<SurveysRunner
				answerOnChange={this.handleChangeAnswer}
				survey={survey}
				questions={questions}
				options={answerOptions}
				draftOnClickHandler={draft}
				endOnClickHandler={end} 
				cleanOnClickHandler={clean}
				error={error? error: null}/>
		);
	}

	componentDidMount() {		
		const { actions, selectedSurveyId } = this.props;
		actions.loadSurveyForRun(selectedSurveyId);
	}

	componentWillUnmount() {		
		const { actions } = this.props;
		actions.destroySurveyForRun();
	}
}

SurveysRunnerContainer.PropTypes = {
	selectedSurveyId: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	survey: PropTypes.object.isRequired,
	questions: PropTypes.object.isRequired,
	answerOptions: PropTypes.object.isRequired,
	actions: PropTypes.shape({
		loadSurveyForRun: PropTypes.func.isRequired,
		selectAnswer: PropTypes.func.isRequired,
		destroySurveyForRun: PropTypes.func.isRequired,
		draft: PropTypes.func.isRequired,
		end: PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			destroySurveyForRun,
			loadSurveyForRun,
			selectAnswer,
			draft,
			end,
			clean
		}, dispatch)
	};
};

const mapStateToProps = (state, ownProps) => {
	const { id: selectedSurveyId } = ownProps.match.params;
	const { surveyRunner } = state.ui.survey;

	return {
		selectedSurveyId,
		survey: surveyRunner.survey,
		questions: surveyRunner.questions,
		answerOptions: surveyRunner.answerOptions,
		error: surveyRunner.error,
		loading: surveyRunner.loading,
	};
};


export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveysRunnerContainer));
