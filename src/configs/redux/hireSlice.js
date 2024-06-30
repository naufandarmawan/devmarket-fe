import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { toast } from 'react-toastify';

export const hireWorker = createAsyncThunk('hire/hireWorker', async (form) => {
  const response = await api.post('/hire', form);
  toast.success(response.data.message)
  return response.data;
});

export const recruiterHiringHistory = createAsyncThunk('hire/recruiterHiringHistory', async () => {
  const response = await api.get('/hire/recruiters');
  return response.data.data;
});

export const workerHiringHistory = createAsyncThunk('hire/workerHiringHistory', async () => {
  const response = await api.get('/hire/workers');
  return response.data.data;
});

const hireSlice = createSlice({
  name: 'hire',
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(hireWorker.pending, (state) => {
        state.loading = true;
      })
      .addCase(hireWorker.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(hireWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(recruiterHiringHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(recruiterHiringHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(recruiterHiringHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(workerHiringHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(workerHiringHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(workerHiringHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default hireSlice.reducer;
