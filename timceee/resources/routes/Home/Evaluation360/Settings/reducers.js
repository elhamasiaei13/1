import {combineReducers} from 'redux';
import Contact from 'routes/Home/Evaluation360/Settings/Contact/Module';
import Common from 'routes/Home/Evaluation360/Settings/Common/Module';
import Setting360 from 'routes/Home/Evaluation360/Settings/Setting360/Module';

const reducers = combineReducers({
  Contact,
  Common,
  Setting360,
});

export default reducers;
