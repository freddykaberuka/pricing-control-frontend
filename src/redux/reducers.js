import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commoditySlice';

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
  },
});

export default store;
