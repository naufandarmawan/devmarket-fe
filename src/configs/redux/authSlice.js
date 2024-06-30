import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { toast } from 'react-toastify';

export const login = createAsyncThunk('auth/login', async ({ form, navigate }, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', form);
    const { token, refreshToken } = response.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    toast.success(`Login berhasil. Selamat datang!`);
    navigate('/');
    return response.data.data;
  } catch (err) {
    const error = err.response.data;
    toast.error(`Anda gagal login - ${error.message}`);
    return rejectWithValue(error);
  }
});

export const checkRole = createAsyncThunk('auth/checkRole', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/auth/checkrole');
    return response.data.data[0].role;
  } catch (err) {
    const error = err.response.data;
    toast.error(`${error}`);
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('auth/logout', async ({ navigate }, { rejectWithValue }) => {
  try {
    const response = await api.get('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    toast.success(response.data.message);
    navigate('/login')
    return response.data.data
  } catch (err) {
    const error = err.response.data;
    toast.error(error.message);
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(checkRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload
      })
      .addCase(checkRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.refreshToken = null;
        state.role = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default authSlice.reducer;