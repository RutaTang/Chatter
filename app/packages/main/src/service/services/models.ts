import { getConversation, updateConversation } from "../../store/operations/conversation";
import { listAllModels } from "../../store/operations/settings";
import { Service, serviceEngine } from "../engine";
import type { GetModelForConversationChannel, GetModelForConversationChannelArgs, GetModelForConversationChannelReturn, ListAllModelsChannel, ListAllModelsChannelReturn, UpdateModelForConversationChannel, UpdateModelForConversationChannelArgs, UpdateModelForConversationChannelReturn } from 'types'


@serviceEngine.handle<ListAllModelsChannel>("list-all-models")
export class ListAllModels extends Service {

    async process(): Promise<ListAllModelsChannelReturn> {
        return await listAllModels()
    }

}

@serviceEngine.handle<GetModelForConversationChannel>("get-model-for-conversation")
export class GetModelForConversation extends Service {

    async process(_: any, { conversationId }: GetModelForConversationChannelArgs): Promise<GetModelForConversationChannelReturn> {
        return (await getConversation(conversationId)).model
    }
}

@serviceEngine.handle<UpdateModelForConversationChannel>("update-model-for-conversation")
export class UpdateModelForConversation extends Service {

    async process(_: any, { conversationId, model }: UpdateModelForConversationChannelArgs): Promise<UpdateModelForConversationChannelReturn> {
        const conversation = await getConversation(conversationId)
        conversation.model = model
        updateConversation(conversation)
    }

}
