import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './baseUrl';

// Define the initial state
const initialState = {
  userList: [],
  user: null,
  userId: null,
  loading: false,
  error: null,
};

// Create Async Thunks for API requests
export const getUserList = createAsyncThunk(
  'user/getUserList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('user/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('user/login', { email, password });
      return response.data; // Assuming the response contains the user data including the 'id' property
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const signup = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('user/signup', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Registration failed' });
    }
  }
);


// Create the user Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userList = action.payload;
        state.loading = false;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login Fulfilled:', action.payload);
        state.user = action.payload; // Set the user state upon successful login
        state.userId = action.payload.id; // Set the userId state upon successful login
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('Login Rejected:', action.error); // Check the error data
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        // Handle signup success if necessary
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
