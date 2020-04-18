import {combineReducers} from 'redux';
import Category from './Category/Module';
import Post from './Post/Module';
const reducers = combineReducers({
  Category,
  Post,
});

export default reducers;
