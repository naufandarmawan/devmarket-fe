import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import portfolioReducer from './portfolioSlice';

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    portfolio: portfolioReducer,
  },
});
