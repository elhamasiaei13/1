import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Profile from '../../components/user/Profile';
import {
    loadPersonalInfo,
    loadUserSurveyHistory
} from '../../actions/userActions';
import { withRouter } from 'react-router-dom';


const orderedAttributesRows = {
    "row1": [
        "name",
        "username",
        "email",
    ],
    "row2": [
        "gender",
        "age",
    ],
    "row3": [
        "maritalStatus",
        "numberOfChildren",
    ],
    "row4": [
        "cityBirth",
        "cityResidence",
        "motherTongue",
    ],
    "row5": [
        "edu",
        "schoolDiscipline",
        "univDiscipline",
    ],
    "row6": [
        "willingnessToParticipate",
    ]
}

class ProfileContainer extends Component {
    render() {
        const {
            personalInfo,
            mySurveys
        } = this.props;
        return (
            <Profile
                orderedAttributesRows={orderedAttributesRows}
                personalInfo={personalInfo.obj}
                // personalInfoError={personalInfo.error}
                // personalInfoLoading={personalInfo.loading}
                mySurveys={mySurveys.arr}
                // mySurveysError={mySurveys.error}
                // mySurveysLoading={mySurveys.loading}
            />
        );
    }

    componentDidMount() {
        const { actions } = this.props;
        actions.loadPersonalInfo();
        actions.loadUserSurveyHistory();
    }

}

ProfileContainer.PropTypes = {
    personalInfo: PropTypes.object.isRequired,
    mySurveys: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const {
        personalInfo,
        mySurveys
    } = state.ui.user.profile

    return {
        personalInfo,
        mySurveys
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadPersonalInfo,
            loadUserSurveyHistory
        }, dispatch)
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProfileContainer));