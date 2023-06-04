import type { Conversation, Conversations } from "../general"


// ListConversations Channel
export type ListConversationsChannel = "list-conversations"
export type ListConversationsChannelArgs = void
export type ListConversationsChannelReturn = Conversations


// AddConversation Channel
export type AddConversationChannel = "add-conversation"
export type AddConversationChannelArgs = Pick<Conversation, "title" | "description">
export type AddConversationChannelReturn = Conversation

// RetitleConversation Channel
export type RetitleConversationChannel = "retitle-conversation"
export type RetitleConversationChannelArgs = Pick<Conversation, "id" | "title">
export type RetitleConversationChannelReturn = void

// DeleteConversation Channel
export type DeleteConversationChannel = "delete-conversation"
export type DeleteConversationChannelArgs = Pick<Conversation, "id">
export type DeleteConversationChannelReturn = void
