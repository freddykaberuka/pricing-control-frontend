import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commoditySlice';
import complaintReducer from './complaintSlice';
import userReducer from './userSlice';
import locationReducer from './locationSlice'

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
    complaint: complaintReducer,
    user : userReducer,
    location: locationReducer
  },
});

export default store;
