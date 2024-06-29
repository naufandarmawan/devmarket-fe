import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import portfolioReducer from './portfolioSlice';
import experienceReducer from './experienceSlice';
import authReducer from './authSlice';
import assetSlice from './assetSlice';
import hireSlice from './hireSlice';

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    portfolio: portfolioReducer,
    experience: experienceReducer,
    auth: authReducer,
    asset: assetSlice,
    hire: hireSlice,
  },
});
