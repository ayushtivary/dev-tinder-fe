import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name : "connection",
    initialState : null,
    reducers : {
        addConnections : (state, action) => {
            return action.payload
        },
        removeConnections : (state, action) => {
            return state
              ? state.filter((conn) => conn.id !== action.payload.id)
              : null;
        }
    }
})

export const {addConnections, removeConnections} = connectionSlice.actions

export default connectionSlice.reducer