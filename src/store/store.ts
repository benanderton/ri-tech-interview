import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    // other slices can be added later
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;