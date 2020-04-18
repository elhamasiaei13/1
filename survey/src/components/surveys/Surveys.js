import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Col } from 'react-bootstrap';
import SurveyCard from './SurveyCard';
import Tree from '../common/Tree';


const Surveys = props => {
	const {
		items,
		tags,
		selectedTag,
		selectedTagHandler
	} = props;

	const ids = Object.keys(items);
	// const rnd = 1;
	return (
		<div>
			<PageHeader>
				{/* <span class="page-header-title-label"> */}
					آزمون‌ها
                {/* </span> */}
			</PageHeader>
			<Col lg={3} md={3}>
				<Tree
					branches={tags}
					selectedId={selectedTag}
					selectLeafHandler={selectedTagHandler} />
			</Col>
			<Col id="surveys" lg={9} md={9}>
				{ids.map((surveyId, index) =>
					<SurveyCard key={surveyId} survey={items[surveyId]} rnd={index} />
				)}
			</Col>
		</div>
	);
};

Surveys.propTypes = {
	items: PropTypes.object.isRequired,
	tags: PropTypes.array.isRequired,
	selectedTagHandler: PropTypes.func.isRequired
};

export default Surveys;
