import React from 'react';
import PropTypes from 'prop-types';
import {
    PageHeader,
} from 'react-bootstrap'
import Question from './Question';
const AnswerSheet = ({
    title,
    questions
}) => {

    return (
        <div>
            <PageHeader>
                <span class="page-header-title-label">
                    پاسخ‌نامه آزمون:&nbsp;
                </span>
                {title}
            </PageHeader>

            {questions.map((question, index) =>
                <Question
                    key={question}
                    index={index}
                    question={question}
                    options={question.answerOptions}
                    readOnly={true} />

            )}
        </div>
    );
};

AnswerSheet.propTypes = {
    title: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
};

export default AnswerSheet;