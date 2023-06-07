import { createSlice } from "@reduxjs/toolkit"
import { NAME } from "./constants"
import { completeMessages } from "../conversationSlice/thunks"

interface ErrorState {
    messages: string[]
}


const initialState: ErrorState = {
    messages: []
}

export const errorSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        removeOldestMessage: (state) => {
            state.messages.shift()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(completeMessages.rejected, (state, action) => {
            if (action.error.message) {
                state.messages.push(action.error.message)
            }
        })
    }
})

export default errorSlice.reducer

export const { removeOldestMessage } = errorSlice.actions
