import { createAsyncThunk } from "@reduxjs/toolkit"
import { NAME } from "./constants"
import { Conversation, Conversations, Message } from "../../types"
import { integrateBackendConditionally } from "../../utils/integrate"
import { RootState } from ".."
import { UpdateMessageRole, type AddConversation, type AddMessage, type CompleteMessages, type DeleteConversation, type GetModelForConversation, type ListAllModels, type ListConversations, type ListMessages, type RetitleConversation, type SwapTwoMessagesForAConversation, type UpdateModelForConversation } from "types"
import { invock } from "../../utils/service"
import { Omit } from "@react-spring/web"

export const loadConversations = createAsyncThunk<Conversations>(
    `${NAME}/loadConversations`,
    async () => {
        return await integrateBackendConditionally({
            none: () => {
                let conversations = [
                    {
                        id: 1,
                        title: "Chat 1",
                        updatedAt: new Date().getTime(),
                        createdAt: new Date().getTime(),
                    },
                    {
                        id: 2,
                        title: "Chat 2",
                        updatedAt: new Date().getTime(),
                        createdAt: new Date().getTime(),
                    }
                ]
                return conversations
            },
            electron: async () => {
                let conversations = await invock<ListConversations>("list-conversations", undefined)
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
                    id: 1
                }
            },
            electron: async () => {
                const returned = await invock<AddConversation>("add-conversation", conversation)
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
                await invock<DeleteConversation>("delete-conversation", {
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
                await invock<RetitleConversation>("retitle-conversation", {
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

export const completeMessages = createAsyncThunk<
    void,
    {
        conversationId: Conversation['id'],
        messages: Message[],
        model: string
    },

    {
        state: RootState
    }
>(
    `${NAME}/completeChat`,
    async ({
        conversationId,
        messages,
        model
    }, thunkApi) => {
        return await integrateBackendConditionally({
            none: () => {
            },
            electron: async () => {
                const message = await invock<CompleteMessages>("complete-messages", {
                    model: model,
                    messages: messages
                })

                await thunkApi.dispatch(addMessage({
                    conversationId,
                    message
                }))
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
                        id: 1,
                        role: "user",
                        content: "This is a test message",
                    },
                    {
                        id: 2,
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
                let messages = await invock<ListMessages>("list-messages", { conversationId: conversationId }) || []
                return {
                    conversationId: conversationId,
                    messages: messages
                }
            }
        })
    }
)

export const addMessage = createAsyncThunk<
    void,
    {
        conversationId: Conversation['id'],
        message: Omit<Message, 'id'>,
    },
    {
        state: RootState
    }
>(
    `${NAME}/addMessage`,
    async (
        {
            conversationId, message
        },
        thunkApi
    ) => {
        await integrateBackendConditionally<void>({
            none: () => {
            },
            electron: async () => {
                await invock<AddMessage>("add-message", {
                    conversationId: conversationId,
                    role: message.role,
                    content: message.content,
                })
                await thunkApi.dispatch(listMessages(conversationId))
            }
        })
    }
)

export const addMessageAndCompleteChat = createAsyncThunk<
    void,
    {
        conversationId: Conversation['id'],
        message: Omit<Message, 'id'>,
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
                messages?.push({
                    id: 1,
                    ...message
                })
                return messages || []
            },
            electron: async () => {
                const messages = await invock<ListMessages>("list-messages", { conversationId })
                return messages || []
            }
        })
        await thunkAPI.dispatch(completeMessages({ model, conversationId, messages }))
    }
)


export const loadAllModels = createAsyncThunk<string[]>(
    `${NAME}/loadAllModels`,
    async () => {
        const models = await invock<ListAllModels>("list-all-models", undefined)
        return models
    }
)

export const getModelForCurrentConversation = createAsyncThunk(
    `${NAME}/getModelForCurrentConversation`,
    async (conversationId: Conversation['id']) => {
        const model = await invock<GetModelForConversation>("get-model-for-conversation", { conversationId })
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
        await invock<UpdateModelForConversation>("update-model-for-conversation", {
            conversationId,
            model
        })
        return {
            conversationId,
            model
        }
    }
)

export const swapTwoMessagesForCurrentConversation = createAsyncThunk<
    void,
    {
        conversationId: any,
        firstMessageId: any,
        secondMessageId: any,
    },
    {
        state: RootState
    }
>(
    `${NAME}/swapTwoMessagesForCurrentConversation`,
    async ({
        conversationId, firstMessageId, secondMessageId
    }, thunkApi) => {
        await invock<SwapTwoMessagesForAConversation>("swap-two-messages-for-a-conversation", {
            conversationId,
            firstMessageId,
            secondMessageId
        })
        await thunkApi.dispatch(listMessages(conversationId))
    }
)

export const moveMessageUpOrDown = createAsyncThunk<
    void,
    {
        conversationId: any,
        messageId: any,
        direction: "up" | "down"
    },
    {
        state: RootState
    }
>(
    `${NAME}/moveMessageUpForCurrentConversation`,
    async ({
        conversationId, messageId, direction
    }, thunkApi) => {
        const messages = thunkApi.getState().chat.currentChatMessages
        if (messages == undefined) return
        if (messages.length <= 1) return
        const messageIdx = thunkApi.getState().chat.currentChatMessages?.findIndex((message) => message.id === messageId)
        if (messageIdx == undefined) return
        let secondMessageId;
        if (direction === "up") {
            if (messageIdx === 0) return
            secondMessageId = thunkApi.getState().chat.currentChatMessages![messageIdx - 1].id
        } else {
            if (messageIdx === messages.length - 1) return
            secondMessageId = thunkApi.getState().chat.currentChatMessages![messageIdx + 1].id
        }
        await thunkApi.dispatch(swapTwoMessagesForCurrentConversation({
            conversationId,
            firstMessageId: messageId,
            secondMessageId: secondMessageId
        }))
    })

export const updateMessageRole = createAsyncThunk<
    void,
    {
        messageId: any,
        role: string
    },
    {
        state: RootState
    }
>(
    `${NAME}/updateMessageRole`,
    async ({ messageId, role }, thunkApi) => {
        await invock<UpdateMessageRole>("update-message-role", {
            messageId,
            role
        })
        const id = thunkApi.getState().chat.currentChatId
        if (id == undefined) return
        thunkApi.dispatch(listMessages(id))
    }
)
