// rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import complaintsReducer from './reducer/complaintsReducer'

const rootReducer = combineReducers({
  user: userReducer,
  complaints: complaintsReducer,
  // Add other reducers here if needed
});

export default rootReducer;
