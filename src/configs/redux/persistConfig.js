import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const workerPersistConfig = {
    key: 'worker',
    storage,
    whitelist: ['myProfile'],
};

export default workerPersistConfig;
