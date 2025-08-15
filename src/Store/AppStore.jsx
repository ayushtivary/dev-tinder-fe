import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import conntionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import notificationReducer from "./notificationSlice"; // ✅ add this

const AppStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedSlice,
    connection: conntionReducer,
    request: requestReducer,
    notification: notificationReducer, // ✅ include in store
  },
});

export default AppStore;
