import React from 'react';
import PropTypes from 'prop-types';
import {
    Thumbnail,
    ListGroup,
    ListGroupItem,
    Badge,
    Button,
    ButtonToolbar
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SurveyHistoryCard = ({
    startDate,
    endDate,
    resultKeys,
    surveyId,
    surveyParticipantDataId,
}) => {
    return (
        <Thumbnail className="survey-history-card">
            <h5>
                تاریخ شروع:&nbsp;
                <span dir="ltr" className="persian-date">
                    {startDate}
                </span>
            </h5>
            <h5>
                تاریخ پایان:&nbsp;
                <span dir="ltr" className="persian-date">
                    {endDate}
                </span>
            </h5>
            <ListGroup>
                {resultKeys&& resultKeys.map(resultKey =>
                    <ListGroupItem key={resultKey.id}>
                        <strong>{resultKey.title}: </strong>
                        {resultKey.matchedRule.shortResult}
                        <Badge>امتیاز: {resultKey.matchedRule.value}</Badge>
                    </ListGroupItem>
                )}
            </ListGroup>
            <ButtonToolbar>
                <LinkContainer to={`/surveys/${surveyId}/${surveyParticipantDataId}/result`}>
                    <Button bsStyle="link">نمایش جزئیات</Button>
                </LinkContainer>
                {/* &nbsp; */}
                <LinkContainer to={`/surveys/${surveyId}/${surveyParticipantDataId}/view`}>
                    <Button bsStyle="link">نمایش سوالات</Button>
                </LinkContainer>
            </ButtonToolbar>
        </Thumbnail>
    );
};

SurveyHistoryCard.PropTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    resultKeys: PropTypes.array.isRequired,
    surveyId: PropTypes.number.isRequired,
    surveyParticipantDataId: PropTypes.number.isRequired,
};

export default SurveyHistoryCard;