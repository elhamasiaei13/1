import {combineReducers} from 'redux';
import Definition from 'routes/Home/Attendance/Policy/Definition/Module';
import Assignment from 'routes/Home/Attendance/Policy/Assignment/Module';

const reducers = combineReducers({
  Definition,
  Assignment,
});

export default reducers;
