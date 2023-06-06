import type {
    ListConversations,
    AddConversation,
    RetitleConversation,
    DeleteConversation
} from "./conversation"
export * from './conversation'
import type {
    ListMessages,
    AddMessage,
    CompleteMessages,
    SwapTwoMessagesForAConversation
} from './message'
export * from './message'
import type {
    GetModelForConversation,
    ListAllModels,
    UpdateModelForConversation
} from "./models"
export * from './models'
import type {
    LoadSideSectionsAndItems,
    GetContentSectionsAndItems,
    UpdateContentItemValue,
    GetContentItemValue
} from "./setting"
export * from './setting'

export type Channel =
    // Conversation channels
    ListConversations |
    AddConversation |
    RetitleConversation |
    DeleteConversation |
    // Message channels
    ListMessages |
    AddMessage |
    CompleteMessages |
    SwapTwoMessagesForAConversation |
    // Settings channels
    LoadSideSectionsAndItems |
    GetContentSectionsAndItems |
    UpdateContentItemValue |
    GetContentItemValue |
    // Models channels
    UpdateModelForConversation |
    GetModelForConversation |
    ListAllModels
