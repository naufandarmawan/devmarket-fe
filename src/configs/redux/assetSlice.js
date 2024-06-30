import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../configs/api';
import { toast } from 'react-toastify';

export const uploadFile = createAsyncThunk('asset/uploadFile', async (file) => {
  const response = await api.post('/assets/upload', file);
  toast.success(response.data.message)
  return response.data.data.file;
});

const assetSlice = createSlice({
  name: 'asset',
  initialState: {
    file:'',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.file = action.payload
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default assetSlice.reducer;