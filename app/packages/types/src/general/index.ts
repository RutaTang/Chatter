export type Message = {
    id: number;
    role: string;
    content: string;
}

export type Messages = Message[]

export type Conversation = {
    id: number;
    title: string;
    description?: string;
    createdAt: number;
    updatedAt: number;
}

export type Conversations = Conversation[]

export type SettingSide = {
    title: string
    items: {
        id: number
        title: string
    }[]
}[]

export type SettingContent = {
    title: string
    items: {
        id: number,
        title: string
        description?: string
        value?: string
    }[]
}[]

export interface Manifest {
    // The name of the model
    name: string;
    // The settings sections for the model
    sections: {
        title: string;
        items: {
            title: string;
            description?: string;
            value?: string;
        }[]
    }[]
}
