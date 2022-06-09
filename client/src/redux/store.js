import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import userInfo from "./userInfoSlice";
import wordInfo from "./wordInfoSlice"

export const store = configureStore({
  reducer: {
    auth,
    userInfo,
    //wordInfo,
  },
});
