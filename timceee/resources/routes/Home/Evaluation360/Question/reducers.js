import {combineReducers} from 'redux';
import QuestionCategory from 'routes/Home/Evaluation360/Question/QuestionCategory/Module';
import Questionnaire from 'routes/Home/Evaluation360/Question/Questionnaire/Module';
import Assignment from 'routes/Home/Evaluation360/Question/Assignment/Module';

const reducers = combineReducers({
  Questionnaire,
  QuestionCategory,
  Assignment,
});

export default reducers;
