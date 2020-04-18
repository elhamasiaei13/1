import {combineReducers} from 'redux';  
// import db from './dbReducer';
import survey from './surveyReducer';
import user from './userReducer';
import appReducer from './appReducer';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const rootPersistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['ui']
};

const appPersistConfig = {
  key: 'app',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['genericError']
}


const uiReducer = combineReducers({
  survey,
  user
})

const rootReducer = combineReducers({  
  // short hand property names
  // db:db,
  app: persistReducer(appPersistConfig, appReducer),
  ui: uiReducer
})

const persistRootReducer = persistReducer(rootPersistConfig, rootReducer);

//export default rootReducer;  
export default persistRootReducer;  