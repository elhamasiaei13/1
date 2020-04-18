import {combineReducers} from 'redux';
import Assignment from 'routes/Home/Requests/Pattern/Assignment/Module';
import RulePack from 'routes/Home/Requests/Pattern/RulePack/Module';

const reducers = combineReducers({
  Assignment,
  RulePack,
});

export default reducers;
