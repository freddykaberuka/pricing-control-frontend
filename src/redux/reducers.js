import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commoditySlice';
import complaintReducer from './complaintSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
    complaint: complaintReducer,
    user : userReducer,
  },
});

export default store;
