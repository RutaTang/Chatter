import type { Conversation, Message, Messages } from "../general"



// ListMessages Channel
export interface ListMessages {
    name: "list-messages"
    args: { conversationId: Conversation["id"] }
    return: Messages
}

// AddMessage Channel
export interface AddMessage {
    name: "add-message"
    args: Pick<Message, "role" | "content"> & { conversationId: Conversation["id"] }
    return: void
}

// DeleteMessage Channel
export interface DeleteMessage {
    name: "delete-message"
    args: { messageId: Message["id"] }
    return: void
}

// CompleteMessages Channel
export interface CompleteMessages {
    name: "complete-messages"
    args: { model: string, messages: Omit<Message, "id">[] }
    return: Omit<Message, "id">
}

// SwapTwoMessagesForAConversation Channel
export interface SwapTwoMessagesForAConversation {
    name: "swap-two-messages-for-a-conversation"
    args: { conversationId: Conversation["id"], firstMessageId: Message["id"], secondMessageId: Message["id"] }
    return: void
}

// UpdateMessageRole Channel
export interface UpdateMessageRole {
    name: "update-message-role"
    args: { messageId: Message["id"], role: Message["role"] }
    return: void
}
