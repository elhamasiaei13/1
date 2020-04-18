import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	FormGroup,
	Radio,
	Col,
	Panel, Badge
} from 'react-bootstrap';

class Question extends Component {

	constructor(props) {
		super(props);
		const { persistedAnswerUuid } = this.props.question
		this.state = { selectedAnswer: persistedAnswerUuid };
	}

	answerOnChangeHandler(answerOptionUuid, answerOptionId) {

		const {
			index,
			answerOnChange,
			question,
			readOnly
		} = this.props;

		if (!readOnly) {
			this.setState({
				selectedAnswer: answerOptionUuid
			});
			answerOnChange(index, question.id, answerOptionId);
		}
	}

	render() {
		const {
			options,
			question,
			nodeRef,
			index,
			readOnly
		} = this.props;
		const questionNumber = index + 1;
		const optionBodyClassName = readOnly ?
			'question-option-body-readonly' : 'question-option-body';
		return (
			<Col lg={12} xs={12} sm={12} md={12} >
				<div ref={!readOnly ? nodeRef : null} className="question">
					<Panel className={question.unansweredErr ? 'question-unanswer-error' : null} >

						<h5>
							<span className="question-number">{questionNumber} </span>
							&nbsp;
						    <span dangerouslySetInnerHTML={{ __html: question.body }} />
						</h5>
						<FormGroup className="question-options">
							{options.map(option =>
								<Radio
									key={option.id}
									value={option.id}
									name={question.uuid}
									checked={option.uuid === this.state.selectedAnswer}
									disabled={readOnly}
									onChange={!readOnly ? () => this.answerOnChangeHandler(option.uuid, option.id) : null}>

									<span
										className={
											option.uuid === this.state.selectedAnswer ?
												`${optionBodyClassName} question-option-body-selected` :
												optionBodyClassName} >
										{option.body}
									</span>

								</Radio>
							)}
						</FormGroup>
					</Panel></div>
			</Col>
		);
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.question.persistedAnswerUuid !== nextProps.question.persistedAnswerUuid) {
			this.setState({ selectedAnswer: nextProps.question.persistedAnswerUuid });
		}
	}

}

Question.propTypes = {
	question: PropTypes.object.isRequired,
	options: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	answerOnChange: PropTypes.func,
	nodeRef: PropTypes.func,
	readOnly: PropTypes.bool.isRequired,
}

Question.defaultProps = {
	readOnly: false
};

export default Question;
