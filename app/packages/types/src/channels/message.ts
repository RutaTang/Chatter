import type { Conversation, Message, Messages } from "../general"



// ListMessages Channel
export type ListMessagesChannel = "list-messages"
export type ListMessagesChannelArgs = { conversationId: Conversation["id"] }
export type ListMessagesChannelReturn = Messages

// AddMessage Channel
export type AddMessageChannel = "add-message"
export type AddMessageChannelArgs = Pick<Message, "role" | "content"> & { conversationId: number }
export type AddMessageChannelReturn = void

// CompleteMessages Channel
export type CompleteMessagesChannel = "complete-messages"
export type CompleteMessagesChannelArgs = { model: string, messages: Omit<Message, "id">[] }
export type CompleteMessagesChannelReturn = Message

// SwapTwoMessagesForAConversation Channel
export type SwapTwoMessagesForAConversationChannel = "swap-two-messages-for-a-conversation"
export type SwapTwoMessagesForAConversationChannelArgs = { conversationId: number, firstMessageId: number, secondMessageId: number }
export type SwapTwoMessagesForAConversationChannelReturn = void
