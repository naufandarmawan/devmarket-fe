import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const getSkill = createAsyncThunk('skills/getSkill', async () => {
  const response = await api.get('/skills');
  return response.data.data;
});

export const addSkill = createAsyncThunk('skills/addSkill', async (skill) => {
  const response = await api.post('/skills', { skill_name: skill });
  return response.data.data;
});

export const deleteSkill = createAsyncThunk('skills/deleteSkill', async (id) => {
  await api.delete(`/skills/${id}`);
  return id;
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = action.payload;
      })
      .addCase(getSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((skill) => skill.id !== action.payload);
      });
  },
});

export default skillsSlice.reducer;