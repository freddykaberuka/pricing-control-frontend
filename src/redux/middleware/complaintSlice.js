import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  complaints: [],
  loading: false,
  error: null,
};

const complaintSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    fetchComplaintsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchComplaintsSuccess(state, action) {
      state.loading = false;
      state.complaints = action.payload;
    },
    fetchComplaintsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteComplaintSuccess(state, action) {
      state.complaints = state.complaints.filter(
        (complaint) => complaint.id !== action.payload
      );
    },
    deleteComplaintFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  fetchComplaintsStart,
  fetchComplaintsSuccess,
  fetchComplaintsFailure,
  deleteComplaintSuccess,
  deleteComplaintFailure,
} = complaintSlice.actions;

export const fetchComplaints = () => async (dispatch) => {
  dispatch(fetchComplaintsStart());
  try {
    const response = await axios.get('http://localhost:5000/complaint/'); // Adjust the endpoint URL if needed
    dispatch(fetchComplaintsSuccess(response.data));
  } catch (error) {
    dispatch(fetchComplaintsFailure(error.message));
  }
};

export const deleteComplaint = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/complaint/${id}`); // Adjust the endpoint URL if needed
    dispatch(deleteComplaintSuccess(id));
  } catch (error) {
    dispatch(deleteComplaintFailure(error.message));
  }
};

export default complaintSlice.reducer;
