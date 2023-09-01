// userReducer.js

import {
  CREATE_USER_SUCCESS,
  LOGIN_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  FETCH_USERS_SUCCESS,
} from './userActions';

const initialState = {
  token: null,
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
    case LOGIN_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
