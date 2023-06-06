import { addConversation, deleteConversation, listConversations, retitleConversation } from "../../store/operations/conversation";
import { serviceEngine, Service } from "../engine";
import type {
    ListConversations as ListConversationsChannel,
    AddConversation as AddConversationChannel,
    RetitleConversation as RetitleConversationChannel,
    DeleteConversation as DeleteConversationChannel,
} from 'types'

@serviceEngine.handle<ListConversationsChannel>("list-conversations")
export class ListConversations extends Service<ListConversationsChannel> {

    constructor() {
        super()
        this.process = async () => {
            const conversations = await listConversations()
            return conversations.map(conversation => ({
                id: conversation.id,
                title: conversation.title,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt,
            }))
        }
    }

}

@serviceEngine.handle<AddConversationChannel>("add-conversation")
export class AddConversation extends Service<AddConversationChannel> {
    constructor() {
        super()
        this.process = async (_e, args) => {
            return addConversation(args.title)
        }
    }
}

@serviceEngine.handle<RetitleConversationChannel>("retitle-conversation")
export class RetitleConversation extends Service<RetitleConversationChannel>{

    constructor() {
        super()
        this.process = async (_e, { title, id }) => {
            await retitleConversation(id, title)
        }
    }

}

@serviceEngine.handle<DeleteConversationChannel>("delete-conversation")
export class DeleteConversation extends Service<DeleteConversationChannel> {

    constructor() {
        super()
        this.process = async (_e, { id }) => {
            await deleteConversation(id)
        }
    }

}
