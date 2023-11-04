import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice'; // Import auth reducer
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import teacherReducer from '../slice/teacherSlice'; // Import teacher reducer
import subjectReducer from '../slice/subjectSlice'; // Import subject reducer
import classReducer from '../slice/classSlice'; // Import class reducer
import classScheduleReducer from '../slice/classScheduleSlice'; // Import class schedule reducer

const persistConfig = {
    key: "my-key-redux", // Configuration for redux-persist, specifying storage key
    storage,
    whitelist: ['auth'], // Whitelist 'auth' state for persisting
};

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    teacher: teacherReducer,
    subject: subjectReducer,
    class: classReducer,
    classSchedule: classScheduleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a persisted reducer
const store = configureStore({
    reducer: persistedReducer, // Create Redux store with the persisted reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore specific actions during serialization check
            },
        }),
});

const persistor = persistStore(store); // Create a persistor for the store
export { store, persistor }; // Export the Redux store and persistor
