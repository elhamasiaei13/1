import {combineReducers} from 'redux';
import Definition from 'routes/Home/Attendance/Shift/Definition/Module';
import Assignment from 'routes/Home/Attendance/Shift/Assignment/Module';
import View from 'routes/Home/Attendance/Shift/View/Module';

const reducers = combineReducers({
  Definition,
  Assignment,
  View,
});

export default reducers;
