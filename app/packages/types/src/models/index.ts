import type { Manifest, Message } from "../general";

export interface ChatAPI {
    complete({
        messages,
        manifest
    }: {
        messages: Omit<Message, "id">[],
        manifest?: Manifest
    }): Promise<Message>;
}

