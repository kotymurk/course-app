import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseSlice';
import moduleReducer from './moduleSlice';

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    modules: moduleReducer,
  },
});
