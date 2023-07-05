import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import store from './redux/reducers';
import { Provider } from 'react-redux';

// const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
