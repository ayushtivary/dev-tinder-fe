import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedSlice from "./feedSlice";
import conntionReducer from "./connectionSlice"
const AppStore = configureStore({
    reducer : {
        user: userReducer,
        feed : feedSlice,
        connection : conntionReducer
    }
})

export default AppStore