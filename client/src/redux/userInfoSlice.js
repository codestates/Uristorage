import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  userId: null,
  image: null,
  nickname: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUpdateUserInfo: (state, action) => {
      const res = action.payload;
      const result = {
        id: res.id,
        userId: res.userId,
        image: res.image,
        nickname: res.nickname,
        email: res.email,
      };
      return result;
    },
  },
});

export const { setUpdateUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
