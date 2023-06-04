import { addConversation, deleteConversation, listConversations, retitleConversation } from "../../store/operations/conversation";
import { serviceEngine, Service } from "../engine";

import type { ListConversationsChannel, ListConversationsChannelReturn, AddConversationChannel, AddConversationChannelArgs, AddConversationChannelReturn, RetitleConversationChannel, RetitleConversationChannelReturn, RetitleConversationChannelArgs, DeleteConversationChannel, DeleteConversationChannelReturn, DeleteConversationChannelArgs } from 'types'

@serviceEngine.handle<ListConversationsChannel>("list-conversations")
export class ListConversations extends Service {

    async process(): Promise<ListConversationsChannelReturn> {
        const conversations = await listConversations()
        return conversations.map(conversation => ({
            id: conversation.id,
            title: conversation.title,
            createdAt: conversation.createdAt,
            updatedAt: conversation.updatedAt,
        }))
    }

}

@serviceEngine.handle<AddConversationChannel>("add-conversation")
export class AddConversation extends Service {

    async process(_: any, { title, description }: AddConversationChannelArgs): Promise<AddConversationChannelReturn> {
        return await addConversation(title, description)
    }

}

@serviceEngine.handle<RetitleConversationChannel>("retitle-conversation")
export class RetitleConversation extends Service {

    async process(_: any, { id, title }: RetitleConversationChannelArgs): Promise<RetitleConversationChannelReturn> {
        await retitleConversation(id, title)
    }

}

@serviceEngine.handle<DeleteConversationChannel>("delete-conversation")
export class DeleteConversation extends Service {

    async process(_: any, { id }: DeleteConversationChannelArgs): Promise<DeleteConversationChannelReturn> {
        await deleteConversation(id)
    }

}
