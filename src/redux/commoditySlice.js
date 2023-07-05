import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from './baseUrl'

// Define the initial state
const initialState = {
  commodityList: [],
  commodity: null,
  loading: false,
  error: null,
};

// Create Async Thunks for API requests
export const addCommodity = createAsyncThunk(
  'commodity/addCommodity',
  async (commodityData, { rejectWithValue }) => {
    try {
      const response = await api.post('commodity/add', commodityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommodityList = createAsyncThunk(
  'commodity/getCommodityList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('commodity');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommodityById = createAsyncThunk(
  'commodity/getCommodityById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`commodity/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCommodity = createAsyncThunk(
  'commodity/updateCommodity',
  async (commodityData, { rejectWithValue }) => {
    try {
      const response = await api.put(`commodity/${commodityData.id}`, commodityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCommodity = createAsyncThunk(
  'commodity/deleteCommodity',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`commodity/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Commodity Slice
const commoditySlice = createSlice({
  name: 'commodity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCommodity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommodity.fulfilled, (state, action) => {
        state.commodity = action.payload;
        state.loading = false;
      })
      .addCase(addCommodity.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getCommodityList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommodityList.fulfilled, (state, action) => {
        state.commodityList = action.payload;
        state.loading = false;
      })
      .addCase(getCommodityList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getCommodityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommodityById.fulfilled, (state, action) => {
        state.commodity = action.payload;
        state.loading = false;
      })
      .addCase(getCommodityById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateCommodity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCommodity.fulfilled, (state, action) => {
        state.commodity = action.payload;
        state.loading = false;
      })
      .addCase(updateCommodity.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteCommodity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommodity.fulfilled, (state) => {
        state.loading = false;
        // Perform any necessary cleanup or update after deletion
      })
      .addCase(deleteCommodity.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default commoditySlice.reducer;
