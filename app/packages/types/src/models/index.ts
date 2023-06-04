import type { Manifest, Message, Messages } from "../general";

export interface ChatAPI {
    complete({
        messages,
        manifest
    }: {
        messages: Messages,
        manifest?: Manifest
    }): Promise<Message>;
}

