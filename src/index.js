import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, Switch } from "react-router-dom";
import thunk from 'redux-thunk';

import reducers from "./reducers";
import history from "./history";
import App from "./components/App";
import FeedForm from "./components/feed/FeedForm";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, 
  {}, 
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/" exact component={() => <div>Homepage</div>} />
          <Route path="/post" exact component={FeedForm} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.querySelector('#root')
);