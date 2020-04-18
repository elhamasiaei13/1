import {combineReducers} from 'redux';
import Inbox from 'routes/Home/Requests/Box/Inbox/Module';
import Outbox from 'routes/Home/Requests/Box/Outbox/Module';

const reducers = combineReducers({
  Inbox,
  Outbox,
});

export default reducers;
