import { configureStore } from "@reduxjs/toolkit";
import userSlice, { IUserSlice } from "./reducers/user";

export type IsStoreState = {
  userSlice: IUserSlice;
};

const store = configureStore({
  reducer: {
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(),
});

export default store;
