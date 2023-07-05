import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commoditySlice';
import complaintReducer from './complaintSlice';

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
    complaint: complaintReducer,
  },
});

export default store;
