import { createSlice } from "@reduxjs/toolkit";

const counterSilce = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increment: (state) => {
            state.count = state.count + 1
        },
        decrement: (state) => {
            state.count = state.count - 1
        },
        
    }
})

export const {  } = counterSilce.actions
//or
// export const counterActions = counterSilce.actions

export default counterSilce.reducer