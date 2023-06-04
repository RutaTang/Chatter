export enum Role {
    System = "system",
    Assistant = "assistant",
    User = "user",
}

export type Conversation = {
    id: string
    title: string
    updatedAt: number
    createdAt: number
}

export type Conversations = Conversation[]

export type Message = {
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
        id: string
        title: string
        description?: string
        value?: any
    }[]
}

