import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Col,
    Nav,
    NavItem,
    PageHeader,
    Row,
    Alert

} from 'react-bootstrap';
import { StaticFieldGroup } from '../common/Commons';
import { FormattedMessage } from 'react-intl';
import { LinkContainer } from 'react-router-bootstrap';
import SurveyHistoryCard from '../surveys/SurveyHistoryCard';


class Profile extends Component {

    render() {

        const {
            orderedAttributesRows,
            personalInfo,
            mySurveys
        } = this.props;

        return (
            <div>
                <PageHeader>
                    <FormattedMessage
                        id="myProfile"
                        defaultMessage="پروفایل من" />
                </PageHeader>
                <Col lg={12}>
                    <Tabs defaultActiveKey={1} id="id">
                        <Tab eventKey={1} title="مشخصات من">
                            {Object.keys(orderedAttributesRows).map(rowKey =>
                                <Row key={rowKey}>
                                    <Col lg={12} md={12} xs={12} sm={12}><br />
                                        {orderedAttributesRows[rowKey].map(attr =>
                                            <Col key={attr} lg={4}>
                                                <StaticFieldGroup
                                                    key={attr}
                                                    componentClass="span"
                                                    children={
                                                        personalInfo[attr] ?
                                                            <FormattedMessage
                                                                id={`${attr}.${personalInfo[attr]}`}
                                                                defaultMessage={personalInfo[attr]} />
                                                            :
                                                            null
                                                    }
                                                    colonSign={':'}
                                                    label={
                                                        <FormattedMessage
                                                            id={attr}
                                                            defaultMessage={attr} />
                                                    }
                                                />
                                            </Col>
                                        )}
                                    </Col>
                                </Row>
                            )}
                        </Tab>
                        <Tab eventKey={2} title="آزمون‌های من" >
                            <br />
                            {mySurveys[0] ?
                                <Tab.Container id="survey-history" defaultActiveKey={mySurveys[0].id}>

                                    <Row className="clearfix">
                                        <Col sm={4} >
                                            <Nav bsStyle="pills" stacked>
                                                {
                                                    mySurveys.map(survey =>
                                                        <NavItem key={survey.id} eventKey={survey.id}>
                                                            {survey.title}
                                                        </NavItem>
                                                    )
                                                }
                                            </Nav>
                                        </Col>
                                        <Col sm={8}>
                                            <Tab.Content animation>
                                                {mySurveys.map(survey =>
                                                    <Tab.Pane key={survey.id} eventKey={survey.id}>
                                                        <br />

                                                        {survey.surveyHistory.map(history =>
                                                            <SurveyHistoryCard
                                                                key={history.surveyParticipantDataId}
                                                                startDate={history.startDate}
                                                                endDate={history.endDate}
                                                                resultKeys={history.resultKeys}
                                                                surveyId={survey.id}
                                                                surveyParticipantDataId={history.surveyParticipantDataId} />
                                                        )}

                                                    </Tab.Pane>
                                                )}

                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                                :
                                <Col sm={12}>
                                    <Alert bsStyle="info">
                                        سابقه ای وجود ندارد.
                                    </Alert>
                                </Col>
                            }
                        </Tab>
                    </Tabs>
                </Col>
            </div >
        );
    }
}

Profile.PropTypes = {
    orderedAttributesRows: PropTypes.object.isRequired,
    personalInfo: PropTypes.object.isRequired,
    mySurveys: PropTypes.object.isRequired
};

export default Profile;