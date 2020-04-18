import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import Api from 'services/api';

const api = new Api();

const reducers = require('reducers');

const store = (
  (process.env.NODE_ENV === 'development') ?
    createStore(reducers, composeWithDevTools(applyMiddleware(
      thunkMiddleware.withExtraArgument(api))))
    :
    createStore(reducers, applyMiddleware(
      thunkMiddleware.withExtraArgument(api)))
);

export default store;
