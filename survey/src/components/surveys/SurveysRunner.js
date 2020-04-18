import PropTypes from 'prop-types';
import {
	PageHeader,
	ButtonToolbar,
	Button,
	Well,
	Col,
	Alert,
} from 'react-bootstrap';
import Question from './Question';
import React, { Component } from 'react';

class SurveysRunner extends Component {

	constructor(props) {
		super(props);
		this.answerOnChangeHandler = this.answerOnChangeHandler.bind(this);
		this.questionNodes = [];
	}



	answerOnChangeHandler(questionIndex, questionId, answerOptionId) {

		const { answerOnChange } = this.props;

		answerOnChange(questionId, answerOptionId);
		this.scrollIntoNextQuestion(questionIndex);
	}

	scrollIntoNextQuestion(currentQuestionIndex) {
		const nextQuestionIndex = currentQuestionIndex + 1;		
		const nextQuestion = this.questionNodes[nextQuestionIndex];
		
		if (nextQuestion) {			
			nextQuestion.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});			
		} 
	}

	render() {
		const {
			survey,
			questions,
			options,
			draftOnClickHandler,
			endOnClickHandler,
			cleanOnClickHandler,
			error
		} = this.props;

		return (
			<div>
				<PageHeader>
					<span className="page-header-title-label">
						آزمون:&nbsp;
					</span>
					{survey.title}
				</PageHeader>
				{error ?
					<Alert bsStyle="danger" >
						<p>{error.message}</p>
					</Alert>
					: null
				}
				<ButtonToolbar>
					<Button
						bsStyle="default"
						onClick={() => cleanOnClickHandler(survey.id)}>
						<i className="fa fa-refresh" >&nbsp;</i>
						پاک کردن
					</Button>
					<Button
						bsStyle="primary"
						onClick={() => draftOnClickHandler(survey.id)}>
						<i className="fa fa-floppy-o" >&nbsp;</i>
						ذخیره موقت
					</Button>
					<Button
						bsStyle="success"
						onClick={() => endOnClickHandler(survey.id)}>
						<i className="fa fa-flag-checkered" >&nbsp;</i>
						نتیجه آزمون
					</Button>
				</ButtonToolbar>
				{survey.showStartMessage &&
					<Col lg={12} xs={12} sm={12} md={12} >
						<Well>
							<div dangerouslySetInnerHTML={{ __html: survey.startMessage }} />
						</Well>
					</Col>
				}
				{survey.questions.map((qId, index) =>

					<Question
						key={qId}
						index={index}
						nodeRef={node => this.questionNodes[index] = node}
						question={questions[qId]}
						options={questions[qId].answerOptions.map(oId => options[oId])}
						answerOnChange={this.answerOnChangeHandler} />

				)}
				<ButtonToolbar>

					<Button
						bsStyle="success"
						onClick={() => endOnClickHandler(survey.id)}>
						<i className="fa fa-flag-checkered" >&nbsp;</i>
						نتیجه آزمون
					</Button>
				</ButtonToolbar>
				{error ?
					<Alert bsStyle="danger" >
						<p>{error.message}</p>
					</Alert>
					: null
				}
			</div>
		);
	}

}

SurveysRunner.PropTypes = {
	survey: PropTypes.object.isRequired,
	questions: PropTypes.object.isRequired,
	options: PropTypes.object.isRequired,
	answerOnChange: PropTypes.func.isRequired,
	draftOnClickHandler: PropTypes.func.isRequired,
	endOnClickHandler: PropTypes.func.isRequired,
	cleanOnClickHandler: PropTypes.func.isRequired,
	error: PropTypes.object,
};

export default SurveysRunner;