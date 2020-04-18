import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SurveyResult from '../../components/surveys/SurveyResult';
import { loadResult } from '../../actions/surveyActions';
import { bindActionCreators } from 'redux';
import GenericError from '../../components/common/GenericError';


class SurveyResultContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hide: true
        };
    }


    render() {

        const {
            error,
            loading,
            result,
            surveyId
        } = this.props;


        if (error) {
            return (
                <GenericError err={error} />
            )
        }


        if (loading) {
            return null;
        }


        return (
            <SurveyResult
                resultKeys={result.resultKeys}
                surveyTitle={result.title}
                startDate={result.startDate}
                endDate={result.endDate}
                summary={result.summary}
                surveyId={surveyId} />
        );
    }

    componentDidMount() {

        const {
            actions,
            surveyId,
            surveyParticipantDataId
        } = this.props;

        actions.loadResult(surveyId, surveyParticipantDataId);
    }


}

SurveyResultContainer.propTypes = {
    result: PropTypes.object.isRequired,
    surveyId: PropTypes.string.isRequired,
    surveyParticipantDataId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    actions: PropTypes.shape({
        loadResult: PropTypes.func.isRequired,
    }).isRequired,
};

function mapStateToProps(state, ownProps) {
    const { surveyResult } = state.ui.survey;
    const { surveyId, surveyParticipantDataId } = ownProps.match.params;
    return {
        error: surveyResult.error,
        loading: surveyResult.loading,
        result: surveyResult.result,
        surveyId: surveyId,
        surveyParticipantDataId: surveyParticipantDataId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ loadResult }, dispatch)
    };

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyResultContainer);