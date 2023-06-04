// ListAllModels Channel
export type ListAllModelsChannel = "list-all-models"
export type ListAllModelsChannelArgs = void
export type ListAllModelsChannelReturn = string[]

// UpdateModelForConversation Channel
export type UpdateModelForConversationChannel = "update-model-for-conversation"
export type UpdateModelForConversationChannelArgs = {
    conversationId: string
    model: string
}
export type UpdateModelForConversationChannelReturn = void

// GetModelForConversation Channel
export type GetModelForConversationChannel = "get-model-for-conversation"
export type GetModelForConversationChannelArgs = {
    conversationId: string
}
export type GetModelForConversationChannelReturn = string


