import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import userInfo from "./userInfoSlice";

export const store = configureStore({
  reducer: {
    auth,
    userInfo,
  },
});
