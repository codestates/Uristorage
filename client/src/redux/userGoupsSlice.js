import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userGroupsSlice = createSlice({
  name: "userGroups",
  initialState,
  reducers: {
    setUpdateUserGroups: (state, action) => {
      const res = action.payload;
      const result = res.userGroups.map((el) => {
        return { name: el.name, image: el.image, group_id: el.user_group.groups_id };
      });
      return result;
    },
  },
});

export const { setUpdateUserInfo } = userGroupsSlice.actions;

export default userGroupsSlice.reducer;
