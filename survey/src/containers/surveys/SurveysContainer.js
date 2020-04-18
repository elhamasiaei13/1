import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Surveys from '../../components/surveys/Surveys';
import {
	loadSurveys,
	loadTags,
	onSelectTag
} from '../../actions/surveyActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import GenericError from '../../components/common/GenericError';
import Loading from '../../components/common/Loading';

class SurveysContainer extends Component {

	// constructor(props) {
	// 	console.log('SurveysContainer constructor');
	// 	super(props);
	// }

	render() {

		const {
			actions,
			error,
			loading,
			surveyItems,
			tags,
			selectedTag
		} = this.props;

		if (error) {
			return (
				<GenericError err={error} />
			)
		}

		if (loading) {
			return (
				<Loading />
			);
		}

		return (
			<Surveys
				items={surveyItems}
				tags={tags}
				selectedTag={selectedTag}
				selectedTagHandler={actions.onSelectTag} />
		);
	}

	componentDidMount() {

		const { actions } = this.props;
		actions.loadSurveys();
		actions.loadTags();
	}

}

SurveysContainer.propTypes = {
	tags: PropTypes.array.isRequired,
	surveyItems: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	actions: PropTypes.shape({
		loadSurveys: PropTypes.func.isRequired,
		loadTags: PropTypes.func.isRequired,
		onSelectTag: PropTypes.func.isRequired,
	}).isRequired,
};

const mapStateToProps = (state) => {
	const { surveys } = state.ui.survey;
	const {
		error,
		loading,
		map,
		tags,
		selectedTag
	} = surveys;

	return {
		error,
		loading,
		surveyItems: map,
		tags,
		selectedTag
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			loadSurveys,
			loadTags,
			onSelectTag
		}, dispatch)
	};

}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(SurveysContainer));
