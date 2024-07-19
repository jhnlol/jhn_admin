import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice.ts';
import playersSlice from './slices/playersSlice.ts';
import adminSlice from './slices/adminSlice.ts';
///@ts-ignore
const store = configureStore({
  reducer: {
    app: appSlice,
    players: playersSlice,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;