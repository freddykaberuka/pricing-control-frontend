import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // optional middleware for async actions
import rootReducer from './reducers'; // create the rootReducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
