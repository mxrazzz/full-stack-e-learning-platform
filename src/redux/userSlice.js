//managing user authentication state
import { createSlice } from "@reduxjs/toolkit";

//handling when a user logs in or logs out
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userData: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
