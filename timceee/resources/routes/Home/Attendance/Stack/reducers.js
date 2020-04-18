import {combineReducers} from 'redux';
import Packs from 'routes/Home/Attendance/Stack/Packs/Module';
import Assignment from 'routes/Home/Attendance/Stack/Assignment/Module';
import Rules from 'routes/Home/Attendance/Stack/Rules/Module';
import History from 'routes/Home/Attendance/Stack/History/Module';

const reducers = combineReducers({
  Packs,
  Assignment,
  History,
  Rules,
});

export default reducers;
