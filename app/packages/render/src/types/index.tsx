export enum Role {
    System = "system",
    Assistant = "assistant",
    User = "user",
}

export type Conversation = {
    id: number
    title: string
    updatedAt: number
    createdAt: number
    isInCompleting?: boolean
}

export type Conversations = Conversation[]

export type Message = {
    id: number
    role: string
    content: string
}

export interface SettingsSidebarSectionData {
    title: string
    items?: {
        title: string
    }[]
}

export interface SettingsContentSectionData {
    title: string
    items?: {
        id: number
        title: string
        description?: string
        value?: any
    }[]
}

