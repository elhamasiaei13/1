import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Col,
	PageHeader,
	Media,
	ButtonToolbar,
	Collapse,
	Well,
	Table,
	ListGroup,
	ListGroupItem,
	Panel,
	Popover,
	OverlayTrigger,
	Tooltip

} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SurveysDetail = props => {
	const {
		survey,
		histories,
		showHistoryButton
	} = props;

	return (
		<div>
			<PageHeader>
				<span class="page-header-title-label">
					آزمون:&nbsp;
				</span>
				{survey.title}
			</PageHeader>

			<ButtonToolbar>
				{showHistoryButton &&
					<LinkContainer to={`/surveys/${survey.id}/histories`}>
						<Button >
							<i className="fa fa-history" >&nbsp;</i>
							سوابق آزمون
						</Button>
					</LinkContainer>
				}
				<LinkContainer to={`/surveys/${survey.id}/run`}>
					<Button bsStyle="primary">
						<i className="fa fa-hand-o-left" >&nbsp;</i>
						شروع آزمون
					</Button>
				</LinkContainer>
			</ButtonToolbar>


			<Col md={12} xs={12} sm={12} lg={12}>
				<Media componentClass="article">

					<Media.Body>
						{/* <Media.Heading>{survey.title}</Media.Heading> */}
						<p dangerouslySetInnerHTML={{ __html: survey.description }} />
					</Media.Body>
				</Media>
			</Col>
			{/* </Row> */}


		</div>
	);
};

SurveysDetail.propTypes = {
	survey: PropTypes.object.isRequired,
	histories: PropTypes.array,
	showHistoryButton: PropTypes.bool.isRequired,
};

export default SurveysDetail;
