import {combineReducers} from 'redux';
import Evaluation from './Evaluation/Module';
import Report from './Report/Module';
import Period from './Period/Module';
import Question from './Question/reducers';
import Settings from './Settings/reducers';
const reducers = combineReducers({
  Evaluation,
  Report,
  Period,
  Question,
  Settings,
});

export default reducers;
