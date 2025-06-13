import { Action, configureStore } from '@reduxjs/toolkit';

import rootReducer from '@/src/redux/reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IAction<P> extends Action<string> {
  payload: P;
}
