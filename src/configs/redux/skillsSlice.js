import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { toast } from 'react-toastify';

export const getMySkill = createAsyncThunk('skills/getMySkill', async () => {
  const response = await api.get('/skill');
  return response.data.data;
});

export const addSkill = createAsyncThunk('skills/addSkill', async (skill) => {
  const response = await api.post('/skill', { skill_name: skill });
  toast.success(response.data.message)
  return response.data.data;
});

export const deleteSkill = createAsyncThunk('skills/deleteSkill', async (id) => {
  const response = await api.delete(`/skill/${id}`);
  toast.success(response.data.message)
  return id
});

export const getSkill = createAsyncThunk('skills/getSkill', async (id) => {
  const response = await api.get(`/skill/${id}`);
  return response.data.data;
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    mySkills: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getMySkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMySkill.fulfilled, (state, action) => {
        state.loading = false;
        state.mySkills = action.payload;
      })
      .addCase(getMySkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.mySkills.push(action.payload);
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.mySkills = state.mySkills.filter((skill) => skill.id !== action.payload);
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(getSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

export default skillsSlice.reducer;