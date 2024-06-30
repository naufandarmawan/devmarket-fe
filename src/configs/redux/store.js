import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import portfolioReducer from './portfolioSlice';
import experienceReducer from './experienceSlice';
import authReducer from './authSlice';
import assetSlice from './assetSlice';
import hireSlice from './hireSlice';
import recruiterSlice from './recruiterSlice';
import workerSlice from './workerSlice';

export const store = configureStore({
  reducer: {
    recruiter: recruiterSlice,
    worker: workerSlice,
    hire: hireSlice,
    auth: authReducer,
    asset: assetSlice,
    skills: skillsReducer,
    portfolio: portfolioReducer,
    experience: experienceReducer,
  },
});
