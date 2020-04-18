import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import persistRootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { apiAuthErrorMiddleware } from '../middlewares/middleware'
import { persistStore } from 'redux-persist';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//	1) Connect our store to the rootReducer
//	2) Utilize the Thunk middleware, which will allow us to construct our action creators in a very special way.
export const store = createStore(
  persistRootReducer,
  composeEnhancers(applyMiddleware(
    apiAuthErrorMiddleware,
    // apiGenericErrorMiddleware,
    thunk))
);

export const persistor = persistStore(store);


