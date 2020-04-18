import {combineReducers} from 'redux';
import Box from './Box/reducers';
import Pattern from './Pattern/reducers';
import Dashboard from './Dashboard/Module';
import History from './History/Module';
import Procedure from './Procedure/Module';
import Status from './Status/Module';
import Rules from './Rules/Module';

const reducers = combineReducers({
  Box,
  Dashboard,
  History,
  Procedure,
  Status,
  Pattern,
  Rules,
});

export default reducers;
