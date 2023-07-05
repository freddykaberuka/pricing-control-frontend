import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './baseUrl'

// Define the initial state
const initialState = {
  complaintList: [],
  complaint: null,
  loading: false,
  error: null,
};

// Create Async Thunks for API requests
export const addComplaint = createAsyncThunk(
  'complaint/addComplaint',
  async (complaintData, { rejectWithValue }) => {
    try {
      const response = await api.post('complaint/add', complaintData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComplaintList = createAsyncThunk(
  'complaint/getComplaintList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('complaint');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComplaintById = createAsyncThunk(
  'complaint/getComplaintById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`complaint/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComplaint = createAsyncThunk(
  'complaint/updateComplaint',
  async (complaintData, { rejectWithValue }) => {
    try {
      const response = await api.put(`complaint/${complaintData.id}`, complaintData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComplaint = createAsyncThunk(
  'complaint/deleteComplaint',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`complaint/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Complaint Slice
const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComplaint.fulfilled, (state, action) => {
        state.complaint = action.payload;
        state.loading = false;
      })
      .addCase(addComplaint.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getComplaintList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintList.fulfilled, (state, action) => {
        state.complaintList = action.payload;
        state.loading = false;
      })
      .addCase(getComplaintList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getComplaintById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintById.fulfilled, (state, action) => {
        state.complaint = action.payload;
        state.loading = false;
      })
      .addCase(getComplaintById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComplaint.fulfilled, (state, action) => {
        state.complaint = action.payload;
        state.loading = false;
      })
      .addCase(updateComplaint.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComplaint.fulfilled, (state) => {
        state.loading = false;
        // Perform any necessary cleanup or update after deletion
      })
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default complaintSlice.reducer;
