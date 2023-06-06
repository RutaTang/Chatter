import { getConversation, updateConversation } from "../../store/operations/conversation";
import { listAllModels } from "../../store/operations/settings";
import { Service, serviceEngine } from "../engine";
import type {
    ListAllModels as ListAllModelsChannel,
    GetModelForConversation as GetModelForConversationChannel,
    UpdateModelForConversation as UpdateModelForConversationChannel,
} from 'types'


@serviceEngine.handle<ListAllModelsChannel>("list-all-models")
export class ListAllModels extends Service<ListAllModelsChannel> {

    constructor() {
        super()
        this.process = async () => {
            const models = await listAllModels()
            return models
        }
    }
}

@serviceEngine.handle<GetModelForConversationChannel>("get-model-for-conversation")
export class GetModelForConversation extends Service<GetModelForConversationChannel> {

    constructor() {
        super()
        this.process = async (_: any, { conversationId }) => {
            return (await getConversation(conversationId)).model
        }
    }

}

@serviceEngine.handle<UpdateModelForConversationChannel>("update-model-for-conversation")
export class UpdateModelForConversation extends Service<UpdateModelForConversationChannel> {

    constructor() {
        super()
        this.process = async (_: any, { conversationId, model }) => {
            const conversation = await getConversation(conversationId)
            conversation.model = model
            updateConversation(conversation)
        }
    }

}
