'use-client';
import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from './slices/roleSlice';
export const store = configureStore({
  reducer: {
    roles: rolesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
