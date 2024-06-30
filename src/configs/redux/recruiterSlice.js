import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { toast } from 'react-toastify';

export const getProfile = createAsyncThunk('recruiter/fetchProfile', async () => {
    const response = await api.get('/recruiters/profile');
    return response.data.data[0];
});

export const updateProfile = createAsyncThunk('recruiter/updateProfile', async (form) => {
    const response = await api.put('/recruiters/profile', form);
    toast.success(response.data.message)
    return response.data;
});

export const register = createAsyncThunk('recruiter/register', async (form, { rejectWithValue }) => {
    try {
      const response = await api.post('/recruiters/register', form);
      toast.success(response.data.message)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });

const recruiterSlice = createSlice({
    name: 'recruiter',
    initialState: {
        profile: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default recruiterSlice.reducer;
