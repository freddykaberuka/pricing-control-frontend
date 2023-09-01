// userActions.js

import axios from 'axios';

// Action Types
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

// Action Creators
export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('user/signup', userData);
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data.token });
  } catch (error) {
    // Handle error case
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('user/login', credentials);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
  } catch (error) {
    // Handle error case
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    const response = await axios.post('/api/reset-password', { email });
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data.token });
  } catch (error) {
    // Handle error case
  }
};

export const updatePassword = (token, newPassword) => async (dispatch) => {
  try {
    await axios.post('/api/update-password', { token, newPassword });
    dispatch({ type: UPDATE_PASSWORD_SUCCESS });
  } catch (error) {
    // Handle error case
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('localhost:5000/user/users');
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    // Handle error case
  }
};
