import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedSlice from "./feedSlice";
import conntionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
const AppStore = configureStore({
    reducer : {
        user: userReducer,
        feed : feedSlice,
        connection : conntionReducer,
        request : requestReducer
    }
})

export default AppStore