import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './baseUrl';

// Define the initial state
const initialState = {
  locationList: [],
  location: null,
  loading: false,
  error: null,
};

// Create Async Thunks for API requests
export const addLocation = createAsyncThunk(
  'location/addLocation',
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await api.post('location/add', locationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLocationList = createAsyncThunk(
  'location/getLocationList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('location');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLocationById = createAsyncThunk(
  'location/getLocationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`location/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await api.put(`location/${locationData.id}`, locationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  'location/deleteLocation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`location/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const selectLocationById = (state, locationId) => {
  return state.location.locationList.find((location) => location.id === locationId);
};

// Create the location Slice
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLocation.fulfilled, (state, action) => {
        state.location = action.payload;
        state.loading = false;
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getLocationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLocationList.fulfilled, (state, action) => {
        state.locationList = action.payload;
        state.loading = false;
      })
      .addCase(getLocationList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getLocationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLocationById.fulfilled, (state, action) => {
        state.location = action.payload;
        state.loading = false;
      })
      .addCase(getLocationById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.location = action.payload;
        state.loading = false;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLocation.fulfilled, (state) => {
        state.loading = false;
        // Perform any necessary cleanup or update after deletion
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default locationSlice.reducer;
