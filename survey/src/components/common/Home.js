import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Clearfix, Col } from 'react-bootstrap';
import SurveyCard from '../surveys/SurveyCard';


const Home = props => {
    const {
        topSurveys,
    } = props;

    return (
        <div>
            <PageHeader>
                خانه
			</PageHeader>
            <Col id="topSurveys" lg={12}>
                {topSurveys.map(survey =>
                    <SurveyCard key={survey.id} survey={survey} />
                )}
            </Col>

        </div>
    );
};

Home.propTypes = {
    topSurveys: PropTypes.array.isRequired,
};

export default Home;
