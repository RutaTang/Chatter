import { createSlice, } from "@reduxjs/toolkit"

import { NAME } from "./constants"
import { addConversation, deleteConversation, loadConversations, updateConversationTitle, completeMessages, listMessages, loadAllModels, getModelForCurrentConversation, updateModelForCurrentConversation } from "./thunks"
import { sortChats } from "./utils"
import { Conversation, Message, Conversations } from "../../types"

interface ConversationState {
    // All chats
    chats: Conversations

    // Current chat
    currentChatId?: Conversation['id']

    // Current chat messages
    currentChatMessages?: Message[]

    // All available models 
    models: string[]

    // Current model for current conversation 
    currentModel?: string
}

const initialState: ConversationState = {
    chats: [],
    currentChatMessages: [],
    models: []
}

export const conversationSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        selectChat: (state, action: { payload: number }) => {
            state.currentChatId = action.payload
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
                state.currentChatId = action.payload.id
            })
            .addCase(deleteConversation.fulfilled, (state, action) => {
                state.chats = state.chats.filter((chat) => {
                    return chat.id !== action.payload
                })
                state.currentChatId = undefined
            })
            .addCase(updateConversationTitle.fulfilled, (state, action) => {
                state.chats.forEach(element => {
                    if (element.id === action.payload.id) {
                        element.title = action.payload.title
                    }
                });
                if (state.currentChatId && state.currentChatId === action.payload.id) {
                    state.chats[state.currentChatId].title = action.payload.title
                }
            })
            .addCase(completeMessages.pending, (state, action) => {
                const conversation = state.chats.find((chat) => {
                    return chat.id === action.meta.arg.conversationId
                })
                if (conversation) {
                    conversation.isInCompleting = true
                }
            })
            .addCase(completeMessages.fulfilled, (state, action) => {
                const conversation = state.chats.find((chat) => {
                    return chat.id === action.meta.arg.conversationId
                })
                if (conversation) {
                    conversation.isInCompleting = false
                }
            })
            .addCase(completeMessages.rejected, (state, action) => {
                const conversation = state.chats.find((chat) => {
                    return chat.id === action.meta.arg.conversationId
                })
                if (conversation) {
                    conversation.isInCompleting = false
                }
            })
            // Chat Messages
            .addCase(listMessages.fulfilled, (state, action) => {
                if (state.currentChatId && state.currentChatId === action.meta.arg) {
                    state.currentChatMessages = action.payload.messages
                }
            })
            // Models
            .addCase(loadAllModels.fulfilled, (state, action) => {
                state.models = action.payload
            })
            .addCase(getModelForCurrentConversation.fulfilled, (state, action) => {
                if (state.currentChatId && state.currentChatId === action.payload.conversationId) {
                    state.currentModel = action.payload.model
                }
            })
            .addCase(updateModelForCurrentConversation.fulfilled, (state, action) => {
                if (state.currentChatId && state.currentChatId === action.payload.conversationId) {
                    state.currentModel = action.payload.model
                }
            })
    }
})

export default conversationSlice.reducer
export const { selectChat } = conversationSlice.actions
