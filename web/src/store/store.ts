import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice.ts';
import playersSlice from './slices/playersSlice.ts';

///@ts-ignore
const store = configureStore({
  reducer: {
    app: appSlice,
    players: playersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;