import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const getExperience = createAsyncThunk('experience/getExperience', async () => {
    const response = await api.get('/experience/');
    return response.data.data;
});

export const addExperience = createAsyncThunk('experience/addExperience', async (experience) => {
    const { id, created_at, updated_at, ...postData } = experience;
    const response = await api.post('/experience', postData);
    return response.data.data;
});

export const updateExperience = createAsyncThunk('experience/updateExperience', async (experience) => {
    const { id, created_at, updated_at, ...postData } = experience;
    const response = await api.put(`/experience/${experience.id}`, postData);
    return response.data.data;
});

export const deleteExperience = createAsyncThunk('experience/deleteExperience', async (id) => {
    await api.delete(`/experience/${id}`);
    return id;
});

const experienceSlice = createSlice({
    name: 'experience',
    initialState: {
        experience: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExperience.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getExperience.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.experience = action.payload;
            })
            .addCase(getExperience.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addExperience.fulfilled, (state, action) => {
                state.experience.push(action.payload);
            })
            .addCase(updateExperience.fulfilled, (state, action) => {
                const index = state.experience.findIndex((experience) => experience.id === action.payload.id);
                state.experience[index] = action.payload;
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.experience = state.experience.filter((experience) => experience.id !== action.payload);
            });
    },
});

export default experienceSlice.reducer;
