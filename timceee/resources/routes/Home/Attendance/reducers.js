import {combineReducers} from 'redux';
import Device from './Device/Module';
import Clocking from './Clocking/Module';
import WorkingHours from './WorkingHours/Module';
import Calendar from './Calendar/Module';
import Policy from './Policy/reducers';
import Writs from './Writs/Module';
import Rules from './Rules/Module';
import Reports from './Reports/Module';
import Stack from './Stack/reducers';
import Shift from './Shift/reducers';

const reducers = combineReducers({
  Device,
  Clocking,
  WorkingHours,
  Calendar,
  Policy,
  Writs,
  Rules,
  Reports,
  Stack,
  Shift,
});

export default reducers;
