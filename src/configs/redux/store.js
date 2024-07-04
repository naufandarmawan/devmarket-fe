import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './skillsSlice';
import portfolioReducer from './portfolioSlice';
import experienceReducer from './experienceSlice';
import authReducer from './authSlice';
import assetReducer from './assetSlice';
import hireReducer from './hireSlice';
import recruiterReducer from './recruiterSlice';
import workerReducer from './workerSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import workerPersistConfig  from './persistConfig';

const persistedWorkerReducer = persistReducer(workerPersistConfig, workerReducer);

export const store = configureStore({
  reducer: {
    recruiter: recruiterReducer,
    worker: persistedWorkerReducer,
    hire: hireReducer,
    auth: authReducer,
    asset: assetReducer,
    skills: skillsReducer,
    portfolio: portfolioReducer,
    experience: experienceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);