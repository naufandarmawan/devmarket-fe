import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const getPortfolio = createAsyncThunk('portfolio/getPortfolio', async () => {
    const response = await api.get('/portfolio/');
    return response.data.data;
});

export const addPortfolio = createAsyncThunk('portfolio/addPortfolio', async (portfolio) => {
    const { id, created_at, updated_at, ...postData } = portfolio;
    const response = await api.post('/portfolio', postData);
    return response.data.data;
});

export const updatePortfolio = createAsyncThunk('portfolio/updatePortfolio', async (portfolio) => {
    const { id, created_at, updated_at, ...postData } = portfolio;
    const response = await api.put(`/portfolio/${portfolio.id}`, postData);
    return response.data.data;
});

export const deletePortfolio = createAsyncThunk('portfolio/deletePortfolio', async (id) => {
    await api.delete(`/portfolio/${id}`);
    return id;
});

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        portfolio: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPortfolio.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPortfolio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.portfolio = action.payload;
            })
            .addCase(getPortfolio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPortfolio.fulfilled, (state, action) => {
                state.portfolio.push(action.payload);
            })
            .addCase(updatePortfolio.fulfilled, (state, action) => {
                const index = state.portfolio.findIndex((portfolio) => portfolio.id === action.payload.id);
                state.portfolio[index] = action.payload;
            })
            .addCase(deletePortfolio.fulfilled, (state, action) => {
                state.portfolio = state.portfolio.filter((portfolio) => portfolio.id !== action.payload);
            });
    },
});

export default portfolioSlice.reducer;
