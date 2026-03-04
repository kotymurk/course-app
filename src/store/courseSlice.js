import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';

export const fetchCourses = createAsyncThunk('courses/fetchAll', async () => {
  const response = await api.getCourses();
  return response.data;
});

export const addCourse = createAsyncThunk('courses/add', async (data) => {
  const response = await api.createCourse(data);
  return response.data;
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default courseSlice.reducer;
