import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Thumbnail, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const SurveyCard = ({ survey, onClickHandler, rnd }) => {
	
	return (
		<Col  xs={12} sm={6} md={4} lg={4} >
			<LinkContainer to={`/surveys/${survey.id}`}>
				{/* <Thumbnail src={test} alt="242x200"> */}
				<Thumbnail className={`card-view rnd-color-${rnd}`}>					
					<h3>{survey.title}</h3>
					<p dangerouslySetInnerHTML={{ __html: survey.summary }}></p>
					{/* <ButtonToolbar>
						<Button >نمایش</Button>
					</ButtonToolbar> */}
				</Thumbnail>
			</LinkContainer>
		</Col>
	);
};


SurveyCard.propTypes = {
	survey: PropTypes.object.isRequired,
	rnd: PropTypes.number,
};

export default SurveyCard;