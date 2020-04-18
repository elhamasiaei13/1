import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerSheet from '../../components/surveys/AnswerSheet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadAnswerSheet } from '../../actions/surveyActions';
import { bindActionCreators } from 'redux';
import GenericError from '../../components/common/GenericError';
import Loading from '../../components/common/Loading';

class AnswerSheetContainer extends Component {
    render() {
        const {
            error,
            loading,
            survey,
            surveyId,
            surveyParticipantDataId,
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
            <AnswerSheet title={survey.title} questions={survey.questions} />
        );
    }

    componentDidMount() {
        const { 
            actions, 
            surveyId,
            surveyParticipantDataId 
        } = this.props;

        actions.loadAnswerSheet(surveyId,surveyParticipantDataId);
    }

}

AnswerSheetContainer.propTypes = {
    survey: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
        loadAnswerSheet: PropTypes.func.isRequired,
    }).isRequired,
};

function mapStateToProps(state, ownProps) {
    const {
        surveyId,
        surveyParticipantDataId
    } = ownProps.match.params;

    const {
        obj,
        error,
        loading
    } = state.ui.survey.answerSheet

    return {
        surveyId,
        surveyParticipantDataId,
        survey: obj,
        error,
        loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadAnswerSheet,
        }, dispatch)
    };
}
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AnswerSheetContainer));