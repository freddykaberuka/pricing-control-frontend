import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './baseUrl'

// Define the initial state
const initialState = {
  userList: [],
  user: null,
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
  },
});

export default userSlice.reducer;
