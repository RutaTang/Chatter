import { createSlice, } from "@reduxjs/toolkit"

import { NAME } from "./constants"
import { addConversation, deleteConversation, loadConversations, updateConversationTitle, completeMessages, listMessages, loadAllModels, getModelForCurrentConversation, updateModelForCurrentConversation } from "./thunks"
import { sortChats } from "./utils"
import { Conversation, Message, Conversations } from "../../types"

interface ConversationState {
    // All chats
    chats: Conversations

    // Current chat
    currentChat?: Conversation

    // Current chat messages
    currentChatMessages?: Message[]

    // Does the model is completing a request
    isCompleting: boolean

    // All available models 
    models: string[]

    // Current model for current conversation 
    currentModel?: string
}

const initialState: ConversationState = {
    chats: [],
    currentChatMessages: [],
    isCompleting: false,
    models: []
}

export const conversationSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.currentChat = state.chats.find((chat) => {
                return chat.id === action.payload
            })
        }
    },
    extraReducers: (builder) => {
        builder
            // ChatItems
            .addCase(loadConversations.fulfilled, (state, action) => {
                state.chats = sortChats(action.payload)
            })
            .addCase(addConversation.fulfilled, (state, action) => {
                state.chats.unshift(action.payload)
                state.currentChat = action.payload
            })
            .addCase(deleteConversation.fulfilled, (state, action) => {
                state.chats = state.chats.filter((chat) => {
                    return chat.id !== action.payload
                })
                state.currentChat = undefined
            })
            .addCase(updateConversationTitle.fulfilled, (state, action) => {
                state.chats.forEach(element => {
                    if (element.id === action.payload.id) {
                        element.title = action.payload.title
                    }
                });
                if (state.currentChat?.id === action.payload.id) {
                    state.currentChat.title = action.payload.title
                }
            })
            .addCase(completeMessages.pending, (state) => {
                state.isCompleting = true
            })
            .addCase(completeMessages.fulfilled, (state, action) => {
                if (state.currentChat && state.currentChat.id === action.payload.id) {
                    state.currentChatMessages?.push(action.payload.message)
                }
                state.isCompleting = false
            })
            .addCase(completeMessages.rejected, (state) => {
                state.isCompleting = false
            })
            // Chat Messages
            .addCase(listMessages.fulfilled, (state, action) => {
                state.currentChatMessages = action.payload.messages
            })
            // Models
            .addCase(loadAllModels.fulfilled, (state, action) => {
                state.models = action.payload
            })
            .addCase(getModelForCurrentConversation.fulfilled, (state, action) => {
                if (state.currentChat && state.currentChat.id === action.payload.conversationId) {
                    state.currentModel = action.payload.model
                }
            })
            .addCase(updateModelForCurrentConversation.fulfilled, (state, action) => {
                if (state.currentChat && state.currentChat.id === action.payload.conversationId) {
                    state.currentModel = action.payload.model
                }
            })
    }
})

export default conversationSlice.reducer
export const { selectChat } = conversationSlice.actions
