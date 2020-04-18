import {combineReducers} from 'redux';
import Definition from 'routes/Home/Basic/Setting/Definition/Module';
import Assignment from 'routes/Home/Basic/Setting/Assignment/Module';

const reducers = combineReducers({
  Definition,
  Assignment,
});

export default reducers;
