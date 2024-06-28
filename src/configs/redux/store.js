import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import portfolioReducer from './portfolioSlice';
import experienceReducer from './experienceSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    portfolio: portfolioReducer,
    experience: experienceReducer,
    auth: authReducer,
  },
});
