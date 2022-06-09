import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import userInfo from "./userInfoSlice";
import userGroups from "./userGoupsSlice";
import groupfilter from "./groupIdFilterSlice";

export const store = configureStore({
  reducer: {
    auth,
    userInfo,
    userGroups,
    groupfilter,
  },
});
