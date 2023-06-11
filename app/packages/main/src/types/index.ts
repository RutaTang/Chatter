export interface ConversationData {
    id: string;
    messages: MessageData[];
}

export interface MessageData {
    role: string;
    content: string;
}

export interface ActorMetaData {
    name: string;
    actions: ActorAction[]
}

export interface ActorAction {
    name: string;
    description: string;
    parameters?: {
        name: string;
        description: string;
    }[]
}
