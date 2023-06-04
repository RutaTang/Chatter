import type { Conversation, Message, Messages } from "../general"



// ListMessages Channel
export type ListMessagesChannel = "list-messages"
export type ListMessagesChannelArgs = { conversationId: Conversation["id"] }
export type ListMessagesChannelReturn = Messages

// AddMessage Channel
export type AddMessageChannel = "add-message"
export type AddMessageChannelArgs = Pick<Message, "role" | "content"> & { conversationId: string }
export type AddMessageChannelReturn = void

// CompleteMessages Channel
export type CompleteMessagesChannel = "complete-messages"
export type CompleteMessagesChannelArgs = { model: string, messages: Messages }
export type CompleteMessagesChannelReturn = Message 
