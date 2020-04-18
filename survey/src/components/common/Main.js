import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SurveysContainer from '../../containers/surveys/SurveysContainer';
import SurveysRunnerContainer from '../../containers/surveys/SurveysRunnerContainer';
import SurveysDetailContainer from '../../containers/surveys/SurveysDetailContainer';
import LoginContainer from '../../containers/user/LoginContainer';
import RegisterContainer from '../../containers/user/RegisterContainer';
import { Col } from 'react-bootstrap';
import Redirect from 'react-router-dom/Redirect';
import SurveyResultContainer from '../../containers/surveys/SurveyResultContainer';
import HomeContainer from '../../containers/common/HomeContainer';
import ProfileContainer from '../../containers/user/ProfileContainer';
import SurveyHistoriesContainer from '../../containers/surveys/SurveyHistoriesContainer';
import AnswerSheetContainer from '../../containers/surveys/AnswerSheetContainer';

const Main = ({ authenticated }) => (
  <Col xs={12} md={12} lg={12} sm={12}>
    <Switch>
      <Route exact path='/' component={HomeContainer} />
      <Route exact path='/surveys' component={SurveysContainer} />
      <Route exact path="/surveys/:id" component={SurveysDetailContainer} />
      <AuthenticatedRoute
        path="/surveys/:id/run"
        component={SurveysRunnerContainer}
        authenticated={authenticated} />
      <AuthenticatedRoute
        path="/surveys/:surveyId/:surveyParticipantDataId/view"
        component={AnswerSheetContainer}
        authenticated={authenticated} />
      <AuthenticatedRoute
        path="/surveys/:surveyId/:surveyParticipantDataId/result"
        component={SurveyResultContainer}
        authenticated={authenticated} />
      <AuthenticatedRoute
        path="/surveys/:surveyId/histories"
        component={SurveyHistoriesContainer}
        authenticated={authenticated} />
      <AuthenticatedRoute
        path="/profile"
        component={ProfileContainer}
        authenticated={authenticated} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/register" component={RegisterContainer} />
    </Switch>
  </Col>
)


const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={props => (
    authenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location.pathname }
        }} />
      )
  )} />
)

export default Main;
