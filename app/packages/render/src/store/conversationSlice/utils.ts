import { Conversation } from "../../types";

export function sortChats(chats: Conversation[], ascending: boolean = false) {
    return chats.sort(function(a, b) {
        if (ascending) {
            return a.createdAt - b.createdAt;
        } else {
            return b.createdAt - a.createdAt;
        }
    });
}
