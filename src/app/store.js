import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { coinApi } from "../api/coinApi";

export const store = configureStore({
  reducer: {
    [coinApi.reducerPath]: coinApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinApi.middleware),
});
setupListeners(store.dispatch);
