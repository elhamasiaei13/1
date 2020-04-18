import 'bootstrap';
import React from 'react';
import store from 'store';
import Authorize from 'services/Authorize';
import Routes from 'routes/Routes';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import LogRocket from 'logrocket';

app.authorize = new Authorize(store);
app.subscribe = store.subscribe;
app.dispatch = store.dispatch;
Object.defineProperty(app, 'state', {
  get: () => store.getState(),
});

// LogRocket.init('6kjrsb/raden');

render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('root'),
);
