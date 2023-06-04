import { createAsyncThunk } from "@reduxjs/toolkit"
import { NAME } from "./constants"
import { Conversation, Conversations, Message } from "../../types"
import { integrateBackendConditionally } from "../../utils/integrate"
import { RootState } from ".."
import { AddConversationChannel, AddConversationChannelArgs, AddConversationChannelReturn, AddMessageChannel, AddMessageChannelArgs, CompleteMessagesChannel, CompleteMessagesChannelArgs, CompleteMessagesChannelReturn, DeleteConversationChannel, DeleteConversationChannelArgs, GetModelForConversationChannel, GetModelForConversationChannelArgs, GetModelForConversationChannelReturn, ListAllModelsChannel, ListAllModelsChannelArgs, ListAllModelsChannelReturn, ListConversationsChannel, ListConversationsChannelArgs, ListConversationsChannelReturn, ListMessagesChannel, ListMessagesChannelArgs, RetitleConversationChannel, RetitleConversationChannelArgs, UpdateModelForConversationChannel, UpdateModelForConversationChannelArgs } from "types"
import { invock } from "../../utils/service"
import { Omit } from "@react-spring/web"

export const loadConversations = createAsyncThunk<Conversations>(
    `${NAME}/loadConversations`,
    async () => {
        return await integrateBackendConditionally({
            none: () => {
                let conversations = [
                    {
                        id: "1",
                        title: "Chat 1",
                        updatedAt: new Date().getTime(),
                        createdAt: new Date().getTime(),
                    },
                    {
                        id: "2",
                        title: "Chat 2",
                        updatedAt: new Date().getTime(),
                        createdAt: new Date().getTime(),
                    }
                ]
                return conversations
            },
            electron: async () => {
                let conversations: ListConversationsChannelReturn = await invock<ListConversationsChannel, ListConversationsChannelArgs>("list-conversations", undefined)
                return conversations
            }
        })
    }
)

export const addConversation = createAsyncThunk(
    `${NAME}/addConversation`,
    async (conversation: Omit<Conversation, 'id'>) => {
        return await integrateBackendConditionally<Conversation>({
            none: () => {
                return {
                    ...conversation,
                    id: "1"
                }
            },
            electron: async () => {
                const returned: AddConversationChannelReturn = await invock<AddConversationChannel, AddConversationChannelArgs>("add-conversation", conversation)
                return returned
            }
        })
    }
)

export const deleteConversation = createAsyncThunk<Conversation['id'], Conversation['id']>(
    `${NAME}/deleteConversation`,
    async (chatId: Conversation['id']) => {
        return await integrateBackendConditionally<Conversation['id']>({
            none: () => {
                return chatId
            },
            electron: async () => {
                await invock<DeleteConversationChannel, DeleteConversationChannelArgs>("delete-conversation", {
                    id: chatId
                })
                return chatId
            }
        })
    }
)

export const updateConversationTitle = createAsyncThunk(
    `${NAME}/updateConversationTitle`,
    async ({
        chatId, newTitle
    }: {
        chatId: Conversation['id'],
        newTitle: Conversation['title']
    },
    ) => {
        return await integrateBackendConditionally({
            none: () => {
                return {
                    id: chatId,
                    title: newTitle,
                }
            },
            electron: async () => {
                await invock<RetitleConversationChannel, RetitleConversationChannelArgs>("retitle-conversation", {
                    id: chatId,
                    title: newTitle,
                })
                return {
                    id: chatId,
                    title: newTitle,
                }
            }
        })
    }
)

export const completeMessages = createAsyncThunk(
    `${NAME}/completeChat`,
    async ({
        conversationId,
        messages,
        model
    }: {
        conversationId: Conversation['id'],
        messages: Message[],
        model: string
    }) => {
        return await integrateBackendConditionally<{ id: Conversation['id'], message: Message }>({
            none: () => {
                return {
                    id: conversationId,
                    message: {
                        role: "assistant",
                        content: "This is a test message",
                    }
                }
            },
            electron: async () => {
                const message: CompleteMessagesChannelReturn = await invock<CompleteMessagesChannel, CompleteMessagesChannelArgs>("complete-messages", {
                    model: model,
                    messages: messages
                })
                await invock<AddMessageChannel, AddMessageChannelArgs>("add-message", {
                    ...message,
                    conversationId: conversationId,
                })
                return {
                    id: conversationId,
                    message: message
                }
            }
        })
    }
)

export const listMessages = createAsyncThunk(
    `${NAME}/listMessages`,
    async (conversationId: Conversation['id']) => {
        return await integrateBackendConditionally<{ conversationId: Conversation['id'], messages: Message[] }>({
            none: () => {
                let messages: Message[] = [
                    {
                        role: "user",
                        content: "This is a test message",
                    },
                    {
                        role: "assistant",
                        content: "This is a test message",
                    }
                ]
                return {
                    conversationId: conversationId,
                    messages: messages
                }
            },
            electron: async () => {
                let messages = await invock<ListMessagesChannel, ListMessagesChannelArgs>("list-messages", { conversationId: conversationId }) || []
                return {
                    conversationId: conversationId,
                    messages: messages
                }
            }
        })
    }
)

export const addMessage = createAsyncThunk(
    `${NAME}/addMessage`,
    async ({
        conversationId, message
    }: {
        conversationId: Conversation['id'],
        message: Message
    }) => {
        return await integrateBackendConditionally<{ conversationId: Conversation['id'], message: Message }>({
            none: () => {
                return {
                    conversationId: conversationId,
                    message,
                }
            },
            electron: async () => {
                await invock<AddMessageChannel, AddMessageChannelArgs>("add-message", {
                    conversationId: conversationId,
                    role: message.role,
                    content: message.content,
                })
                return {
                    conversationId: conversationId,
                    message,
                }
            }
        })
    }
)

export const addMessageAndCompleteChat = createAsyncThunk<
    void,
    {
        conversationId: Conversation['id'],
        message: Message,
        model: string
    },
    {
        state: RootState
    }
>(
    `${NAME}/addMessageAndCompleteChat`,
    async ({
        conversationId, message, model
    }, thunkAPI) => {
        await thunkAPI.dispatch(addMessage({ conversationId, message }))
        const messages = await integrateBackendConditionally({
            none: () => {
                const messages = thunkAPI.getState().chat.currentChatMessages
                messages?.push(message)
                return messages || []
            },
            electron: async () => {
                const messages = await invock<ListMessagesChannel, ListMessagesChannelArgs>("list-messages", { conversationId })
                messages?.push(message)
                return messages || []
            }
        })
        await thunkAPI.dispatch(completeMessages({ model, conversationId, messages }))
    }
)


export const loadAllModels = createAsyncThunk<string[]>(
    `${NAME}/loadAllModels`,
    async () => {
        const models: ListAllModelsChannelReturn = await invock<ListAllModelsChannel, ListAllModelsChannelArgs>("list-all-models", undefined)
        return models
    }
)

export const getModelForCurrentConversation = createAsyncThunk(
    `${NAME}/getModelForCurrentConversation`,
    async (conversationId: Conversation['id']) => {
        const model: GetModelForConversationChannelReturn = await invock<GetModelForConversationChannel, GetModelForConversationChannelArgs>("get-model-for-conversation", { conversationId })
        return {
            conversationId,
            model
        }
    }
)

export const updateModelForCurrentConversation = createAsyncThunk(
    `${NAME}/updateModelForCurrentConversation`,
    async ({
        conversationId, model
    }: {
        conversationId: Conversation['id'],
        model: string
    }) => {
        await invock<UpdateModelForConversationChannel, UpdateModelForConversationChannelArgs>("update-model-for-conversation", {
            conversationId,
            model
        })
        return {
            conversationId,
            model
        }
    }
)
