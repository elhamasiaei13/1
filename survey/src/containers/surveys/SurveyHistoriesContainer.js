import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericError from '../../components/common/GenericError';
import Loading from '../../components/common/Loading';
import SurveyHistories from '../../components/surveys/SurveyHistories';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadSurveyHistories } from '../../actions/surveyActions';
import { bindActionCreators } from 'redux';

class SurveyHistoriesContainer extends Component {

    render() {

        const {
            error,
            loading,
            survey,
            surveyId,
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
            <SurveyHistories
                title={survey.title}
                surveyId={surveyId}
                histories={survey.surveyHistory} />
        );
    }

    componentDidMount() {
        const { actions, surveyId } = this.props;
        actions.loadSurveyHistories(surveyId);
    }

}

SurveyHistoriesContainer.propTypes = {
    survey: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.shape({		
		loadSurveyHistories:PropTypes.func.isRequired,
	}).isRequired,
};

function mapStateToProps(state, ownProps) {
    const { surveyId } = ownProps.match.params;
    const {
        obj,
        error,
        loading
    } = state.ui.survey.surveyHistories

    return {
        surveyId,
        survey: obj,
        error,
        loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadSurveyHistories,
        }, dispatch)
    };
}
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SurveyHistoriesContainer));