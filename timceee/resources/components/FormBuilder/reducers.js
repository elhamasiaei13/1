import {combineReducers} from 'redux';
import Common from './common/reducers';
import Main from './Module';

const reducers = combineReducers({
  Common,
  Main,
});

export default reducers;
