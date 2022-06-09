import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const groupIdFilter = createSlice({
  name: "groupfilter",
  initialState,
  reducers: {
    setgroupIdFilter: (state, action) => {
      const res = Number(action.payload);
      return res;
    },
  },
});

export const { setgroupIdFilter } = groupIdFilter.actions;

export default groupIdFilter.reducer;
