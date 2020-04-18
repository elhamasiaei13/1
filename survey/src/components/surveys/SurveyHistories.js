import React from 'react';
import PropTypes from 'prop-types';
import SurveyHistoryCard from './SurveyHistoryCard';
import {
    PageHeader,
    Media,
    Col,
    Alert,
    Button, ButtonToolbar
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SurveyHistories = ({
    title,
    histories,
    surveyId
}) => {

    return (
        <div>
            <PageHeader>
                <span class="page-header-title-label">
                    سوابق آزمون:&nbsp;
                </span>
                {title}
            </PageHeader>

            {histories.length > 0 ?
                histories.map(history =>
                    <Col md={4} key={history.surveyParticipantDataId}>
                        <SurveyHistoryCard
                            startDate={history.startDate}
                            endDate={history.endDate}
                            resultKeys={history.resultKeys}
                            surveyId={surveyId}
                            surveyParticipantDataId={history.surveyParticipantDataId} />
                    </Col>
                )
                :
                <Col md={12}>
                    <Alert bsStyle="info">
                        شما سابقه‌ی به اتمام رسیده‌ای در این آزمون ندارید، در صورت تمایل به شروع و یا ادامه آزمون ناتمام قبلی روی
                        <LinkContainer to={`/surveys/${surveyId}/run`}>
                            <Button bsStyle="link">
                                اینجا
    					    </Button>
                        </LinkContainer>
                        کلیک کنید.
                    </Alert>
                </Col>
            }
        </div>
    );
};

SurveyHistories.propTypes = {
    title: PropTypes.string.isRequired,
    histories: PropTypes.array,
    surveyId: PropTypes.number.isRequired,
};

export default SurveyHistories;