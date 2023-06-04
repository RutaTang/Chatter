export interface ConversationData {
    id: string;
    messages: MessageData[];
}

export interface MessageData {
    role: string;
    content: string;
}
