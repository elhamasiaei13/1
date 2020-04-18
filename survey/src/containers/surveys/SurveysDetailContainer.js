import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {	
	loadSurvey,
	destroySurvey
} from '../../actions/surveyActions';
import { bindActionCreators } from 'redux';
import SurveysDetail from '../../components/surveys/SurveysDetail';
import { withRouter } from 'react-router'
import GenericError from '../../components/common/GenericError';
import Loading from '../../components/common/Loading';


class SurveysDetailContainer extends Component {

	render() {

		const {
			error,
			loading,
			survey,
			histories,
			actions,
			authenticated
		} = this.props;		

		if (error) {
			return <GenericError err={error} />
		}

		if (loading) {
			return (
				<Loading />
			);
		}
		return (
			<SurveysDetail
				survey={survey}
				histories={histories}				
				showHistoryButton={authenticated} />
		);
	}

	componentDidMount() {
		const { loadSurvey } = this.props.actions;
		loadSurvey(this.props.selectedSurveyId);
	}
	
	componentWillUnmount() {
		const {destroySurvey} = this.props.actions;
		destroySurvey();
	}
	
}

SurveysDetailContainer.propTypes = {
	selectedSurveyId: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	survey: PropTypes.object.isRequired,
	histories: PropTypes.array,
	actions: PropTypes.shape({
		loadSurvey: PropTypes.func.isRequired,		
		destroySurvey:PropTypes.func.isRequired,
	}).isRequired,
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const { id: selectedSurveyId } = ownProps.match.params;
	const { surveyDetail } = state.ui.survey;
	const { authenticated } = state.app.auth;

	return {
		selectedSurveyId,
		survey: surveyDetail.obj,
		histories: surveyDetail.spdHistories,
		error: surveyDetail.error,
		loading: surveyDetail.loading,
		authenticated
	};

}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			loadSurvey,			
			destroySurvey
		}, dispatch)
	};

}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveysDetailContainer));
