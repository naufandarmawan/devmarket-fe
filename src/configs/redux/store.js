import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import portfolioReducer from './portfolioSlice';
import experienceReducer from './experienceSlice';

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    portfolio: portfolioReducer,
    experience: experienceReducer,
  },
});
