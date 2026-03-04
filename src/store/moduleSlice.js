import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';

export const fetchModules = createAsyncThunk('modules/fetchAll', async () => {
  const response = await api.getModules();
  return response.data;
});

export const addModule = createAsyncThunk('modules/add', async (data) => {
  const response = await api.createModule(data);
  return response.data;
});

const moduleSlice = createSlice({
  name: 'modules',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default moduleSlice.reducer;