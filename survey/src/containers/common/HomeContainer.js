import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../../components/common/Home';
import {
	loadTopSurveys,	
} from '../../actions/surveyActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import GenericError from '../../components/common/GenericError';
import Loading from '../../components/common/Loading';

class HomeContainer extends Component {

	
	render() {

		const {
			actions,
			error,
			loading,
			topSurveys,			
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
			<Home topSurveys={topSurveys} />
		);
	}

	componentDidMount() {
		const { actions } = this.props;
		actions.loadTopSurveys();		
	}

}

HomeContainer.propTypes = {	
	topSurveys: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	actions: PropTypes.shape({
		loadTopSurveys: PropTypes.func.isRequired,		
	}).isRequired,
};

const mapStateToProps = (state) => {
	const { home } = state.ui.survey;
	const {
		error,
		loading,
		topSurveys
	} = home;

	return {
		error,
		loading,
		topSurveys
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			loadTopSurveys,			
		}, dispatch)
	};

}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeContainer));
