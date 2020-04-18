import {combineReducers} from 'redux';
import Writ from './WritKey/Module';
import SelectWrit from './SelectWrit/Module';
import FamiliesNameModule from './FamiliesName/Module';

const reducers = combineReducers({
  SelectWrit,
  Writ,
  FamiliesNameModule,
});

export default reducers;
