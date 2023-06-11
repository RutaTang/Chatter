import type { Conversation, Conversations } from "../general"


// ListConversations Channel
export interface ListConversations {
    name: "list-conversations"
    args: void
    return: Conversations
}

// AddConversation Channel
export interface AddConversation {
    name: "add-conversation"
    args: Pick<Conversation, "title" | "description">
    return: Conversation
}

// RetitleConversation Channel
export interface RetitleConversation {
    name: "retitle-conversation"
    args: Pick<Conversation, "id" | "title">
    return: void
}

// DeleteConversation Channel
export interface DeleteConversation {
    name: "delete-conversation"
    args: Pick<Conversation, "id">
    return: void
}


// GetActors Channel
export interface GetActors {
    name: "get-actors"
    args: { conversationId: Conversation["id"] }
    return: {
        name: string
        enabled: boolean
    }[]
}

// EnableActors Channel
export interface ToggleActors {
    name: "toggle-actors"
    args: { conversationId: Conversation["id"], actors: string[] }
    return: void
}
