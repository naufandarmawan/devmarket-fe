import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../configs/api';

// Async thunk for hire action
export const hireWorker = createAsyncThunk(
  'hire/hireWorker',
  async (hireData, { rejectWithValue }) => {
    try {
      const response = await api.post('/hire', hireData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const hireSlice = createSlice({
  name: 'hire',
  initialState: {
    hireDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Define any synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(hireWorker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hireWorker.fulfilled, (state, action) => {
        state.loading = false;
        state.hireDetails = action.payload;
      })
      .addCase(hireWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hireSlice.reducer;