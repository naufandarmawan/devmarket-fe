import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { toast } from 'react-toastify';

export const getMyPortfolio = createAsyncThunk('portfolio/getMyPortfolio', async () => {
    const response = await api.get('/portfolio');
    return response.data.data;
});

export const addPortfolio = createAsyncThunk('portfolio/addPortfolio', async (form) => {
    const { id, created_at, updated_at, ...postData } = form;
    const response = await api.post('/portfolio', postData);
    toast.success(response.data.message)
    return response.data.data;
});

export const updatePortfolio = createAsyncThunk('portfolio/updatePortfolio', async (form) => {
    const { id, created_at, updated_at, ...postData } = form;
    const response = await api.put(`/portfolio/${id}`, postData);
    toast.success(response.data.message)
    return response.data.data;
});

export const deletePortfolio = createAsyncThunk('portfolio/deletePortfolio', async (id) => {
    const response = await api.delete(`/portfolio/${id}`);
    toast.success(response.data.message)
    return id;
});

export const getPortfolio = createAsyncThunk('portfolio/getPortfolio', async (id) => {
    const response = await api.get(`/portfolio/${id}`);
    return response.data.data;
});

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        portfolio: [],
        myPortfolio: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getMyPortfolio.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.myPortfolio = action.payload;
            })
            .addCase(getMyPortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(addPortfolio.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.myPortfolio.push(action.payload);
            })
            .addCase(addPortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updatePortfolio.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePortfolio.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.myPortfolio.findIndex((portfolio) => portfolio.id === action.payload.id);
                state.myPortfolio[index] = action.payload;
            })
            .addCase(updatePortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deletePortfolio.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.myPortfolio = state.myPortfolio.filter((portfolio) => portfolio.id !== action.payload);
            })
            .addCase(deletePortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getPortfolio.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolio = action.payload;
            })
            .addCase(getPortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default portfolioSlice.reducer;
