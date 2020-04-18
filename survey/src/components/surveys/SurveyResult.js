import React from 'react';
import {
    Button,
    ButtonToolbar,
    PageHeader,
    Media,
    Badge,
    Col,
    ListGroupItem,
    ListGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

const SurveyResult = ({
    resultKeys,
    surveyId,
    surveyTitle,
    startDate,
    endDate,
    summary }) => {
    return (
        <div>
            <PageHeader>
                <span class="page-header-title-label">
                    نتیجه آزمون:&nbsp;
                </span>                
                {surveyTitle}
            </PageHeader>

            <Col sm={12} xs={12} md={12}>
                <p>
                    {summary}
                    <br /><br />
                </p>
                <Col md={12}>
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
                </Col>
                <Col md={12}>
                    {resultKeys.map(resultKey =>
                        <div key={resultKey.id}>
                            <ListGroup >
                                <ListGroupItem >
                                    <strong>{resultKey.title}: </strong>
                                    <Badge>امتیاز: {resultKey.matchedRule.value}</Badge>
                                    {resultKey.matchedRule.shortResult}
                                </ListGroupItem>
                            </ListGroup>
                            <p>
                                {resultKey.matchedRule.fullResult}
                            </p>
                        </div>
                    )}
                </Col>
            </Col>
        </div>
    );
};

SurveyResult.propTypes = {
    resultKeys: PropTypes.array.isRequired,
    surveyId: PropTypes.string.isRequired,
    surveyTitle: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
};

export default SurveyResult;