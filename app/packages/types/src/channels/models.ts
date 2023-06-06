// ListAllModels Channel
export interface ListAllModels {
    name: "list-all-models"
    args: void
    return: string[]
}

// UpdateModelForConversation Channel
export interface UpdateModelForConversation {
    name: "update-model-for-conversation"
    args: { conversationId: number, model: string }
    return: void
}

// GetModelForConversation Channel
export interface GetModelForConversation {
    name: "get-model-for-conversation"
    args: { conversationId: number }
    return: string
}


