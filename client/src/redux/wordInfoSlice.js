import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users_id: null,
  word: null,
  summary: null,
  content: null,
  pub: null,
  type: null,
};
/*
const wordInfoSlice = createSlice({
  name: "wordInfo",
  initialState,
  reducers: {
    setWordInfo: (state, action) => {
      const res = action.payload;
      const result = {
        users_id: res.users_id,
        word: res.word,
        summary: res.summary,
        content: res.content,
        pub: res.pub,
        type: res.type,
      };
      return result;
    },
  },
});
*/
//export const { setWordInfo } = wordInfoSlice.actions;

//ㄴexport default wordInfoSlice.reducer;
