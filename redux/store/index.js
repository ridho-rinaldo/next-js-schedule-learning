import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import teacherReducer from '../slice/teacherSlice';
import subjectReducer from '../slice/subjectSlice';
import classReducer from '../slice/classSlice';
import classScheduleReducer from '../slice/classScheduleSlice';

const persistConfig = {
    key: "my-key-redux",
    storage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    teacher: teacherReducer,
    subject: subjectReducer,
    class: classReducer,
    classSchedule: classScheduleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);
export { store, persistor };