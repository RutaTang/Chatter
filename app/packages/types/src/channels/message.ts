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

// CompleteMessages Channel
export interface CompleteMessages {
    name: "complete-messages"
    args: { model: string, messages: Omit<Message, "id">[] }
    return: Message
}

// SwapTwoMessagesForAConversation Channel
export interface SwapTwoMessagesForAConversation {
    name: "swap-two-messages-for-a-conversation"
    args: { conversationId: Conversation["id"], firstMessageId: Message["id"], secondMessageId: Message["id"] }
    return: void
}
