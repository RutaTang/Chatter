import { addConversation, deleteConversation, getActors, getEnabledActors, listConversations, retitleConversation, setEnabledActors } from "../../store/operations/conversation";
import { serviceEngine, Service } from "../engine";
import type {
    ListConversations as ListConversationsChannel,
    AddConversation as AddConversationChannel,
    RetitleConversation as RetitleConversationChannel,
    DeleteConversation as DeleteConversationChannel,
    GetActors as GetActorsChannel,
    EnableActors as EnableActorsChannel,
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

@serviceEngine.handle<GetActorsChannel>("get-actors")
export class GetEnabledActors extends Service<GetActorsChannel> {

    constructor() {
        super()
        this.process = async (_e, { conversationId }) => {
            const actors = await getActors(conversationId)
            return actors
        }
    }

}

@serviceEngine.handle<EnableActorsChannel>("enable-actors")
export class SetEnabledActors extends Service<EnableActorsChannel> {

    constructor() {
        super()
        this.process = async (_e, { conversationId, actors }) => {
            await setEnabledActors(conversationId, actors)
        }
    }
}
