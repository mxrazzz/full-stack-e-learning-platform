//configuring the redux store
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notificationReducer from "./notificationSlice";

//combines the other slice files using the reducer property
export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});
