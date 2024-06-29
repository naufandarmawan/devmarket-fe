import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../configs/api';
import { toast } from 'react-toastify';

export const uploadFile = createAsyncThunk('asset/uploadFile', async (file, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await api.post('/upload', formData);
    const { file_url } = response.data.data;
    return file_url;
  } catch (err) {
    const error = err.response.data;
    toast.error(`Gagal mengunggah file - ${error.message}`);
    return rejectWithValue(error);
  }
});

const assetSlice = createSlice({
  name: 'asset',
  initialState: {
    image: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    clearImage(state) {
      state.image = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.image = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearImage } = assetSlice.actions;

export default assetSlice.reducer;