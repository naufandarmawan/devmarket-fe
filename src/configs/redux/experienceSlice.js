import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { toast } from 'react-toastify';

export const getMyExperience = createAsyncThunk('experience/getMyExperience', async () => {
    const response = await api.get('/experience');
    return response.data.data;
});

export const addExperience = createAsyncThunk('experience/addExperience', async (form) => {
    const { id, created_at, updated_at, ...postData } = form;
    const response = await api.post('/experience', postData);
    toast.success(response.data.message)
    return response.data.data;
});

export const updateExperience = createAsyncThunk('experience/updateExperience', async (form) => {
    const { id, created_at, updated_at, ...postData } = form;
    const response = await api.put(`/experience/${id}`, postData);
    toast.success(response.data.message)
    return response.data.data;
});

export const deleteExperience = createAsyncThunk('experience/deleteExperience', async (id) => {
    const response = await api.delete(`/experience/${id}`);
    toast.success(response.data.message)
    return id;
});

export const getExperience = createAsyncThunk('experience/getExperience', async (id) => {
    const response = await api.get(`/experience/${id}`);
    return response.data.data;
});

const experienceSlice = createSlice({
    name: 'experience',
    initialState: {
        experience: [],
        myExperience: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getMyExperience.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.myExperience = action.payload;
            })
            .addCase(getMyExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(addExperience.pending, (state) => {
                state.loading = true;
            })
            .addCase(addExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.myExperience.push(action.payload);
            })
            .addCase(addExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateExperience.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateExperience.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.myExperience.findIndex((experience) => experience.id === action.payload.id);
                state.myExperience[index] = action.payload;
            })
            .addCase(updateExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteExperience.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.myExperience = state.myExperience.filter((experience) => experience.id !== action.payload);
            })
            .addCase(deleteExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getExperience.pending, (state) => {
                state.loading = true;
            })
            .addCase(getExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.experience = action.payload;
            })
            .addCase(getExperience.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default experienceSlice.reducer;
