import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { toast } from 'react-toastify';

export const register = createAsyncThunk('worker/register', async ({ form, navigate }, { rejectWithValue }) => {
    try {
        const response = await api.post('/workers/register', form);
        toast.success(response.data.message)
        navigate('/login')
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getWorkers = createAsyncThunk('worker/getWorkers', async (params) => {
    const response = await api.get('/workers', { params });
    return response.data.data;
});

export const getMyProfile = createAsyncThunk('worker/getMyProfile', async () => {
    const response = await api.get('/workers/profile');
    return response.data.data;
});

export const updateProfile = createAsyncThunk('worker/updateProfile', async ({form, navigate}) => {
    const response = await api.put('/workers/profile', form);
    toast.success(response.data.message)
    navigate('/talent/profile')
    return response.data.data;
});
 
export const updatePhoto = createAsyncThunk('worker/updatePhoto', async (file) => {
    const response = await api.put('/workers/profile/photo', file);
    toast.success(response.data.message)
    return response.data.data;
});

export const getProfile = createAsyncThunk('worker/getProfile', async (id) => {
    const response = await api.get(`/workers/profile/${id}`);
    return response.data.data[0];
});

const workerSlice = createSlice({
    name: 'worker',
    initialState: {
        workers: [],
        profile: {},
        myProfile: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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

            .addCase(getWorkers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWorkers.fulfilled, (state, action) => {
                state.loading = false;
                state.workers = action.payload;
            })
            .addCase(getWorkers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getMyProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.myProfile = action.payload;
            })
            .addCase(getMyProfile.rejected, (state, action) => {
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

            .addCase(updatePhoto.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePhoto.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

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
    },
});

export default workerSlice.reducer;