import { addMessage, deleteMessage, listMessages, swapMessagesOrder, updateMessasgeRole as updateMesssageRole } from "../../store/operations/message";
import { getManifest } from "../../store/operations/settings";
import { BUILT_IN_MODELS_PLUGINS_PATH } from "../../utils";
import { Service, serviceEngine } from "../engine";
import type {
    ListMessages as ListMessagesChannel,
    AddMessage as AddMessageChannel,
    CompleteMessages as CompleteMessagesChannel,
    SwapTwoMessagesForAConversation as SwapTwoMessagesForAConversationChannel,
    UpdateMessageRole as UpdateMessageRoleChannel,
    DeleteMessage as DeleteMessageChannel,
    ChatAPI,
    Manifest,
} from 'types'
import fs from 'fs'
import { parse } from "yaml";
import path from "path";

@serviceEngine.handle<ListMessagesChannel>("list-messages")
export class ListMessages extends Service<ListMessagesChannel> {

    constructor() {
        super()
        this.process = async (_e, { conversationId }) => {
            const messages = await listMessages(conversationId)
            return messages
        }
    }

}

@serviceEngine.handle<AddMessageChannel>("add-message")
export class AddMessage extends Service<AddMessageChannel> {

    constructor() {
        super()
        this.process = async (_e, { conversationId, role, content }) => {
            await addMessage(conversationId, role, content)
        }
    }
}

@serviceEngine.handle<DeleteMessageChannel>("delete-message")
export class DeleteMessage extends Service<DeleteMessageChannel> {

    constructor() {
        super()
        this.process = async (_e, { messageId }) => {
            await deleteMessage(messageId)
        }
    }

}

@serviceEngine.handle<CompleteMessagesChannel>("complete-messages")
export class CompleteMessages extends Service<CompleteMessagesChannel> {

    constructor() {
        super()
        this.process = async (_e, { messages, model }) => {

            // Get model package path
            const getModelPackagePath = async () => {
                // loop models folder
                let files = fs.readdirSync(BUILT_IN_MODELS_PLUGINS_PATH)
                files = files.filter(file => {
                    // check if file is a folder
                    const stat = fs.statSync(`${BUILT_IN_MODELS_PLUGINS_PATH}/${file}`)
                    return stat.isDirectory()
                })
                // check if model exists by comparing the name fron manifest with ${model}
                const file = files.find(file => {
                    const manifestString = (fs.readFileSync(`${BUILT_IN_MODELS_PLUGINS_PATH}/${file}/manifest.yaml`, 'utf-8')).toString()
                    const manifest: Manifest = parse(manifestString)
                    return manifest.name === model
                })
                if (!file) throw new Error(`Model ${model} not found`)
                return path.join(BUILT_IN_MODELS_PLUGINS_PATH, file)
            }

            // convert messages to the format expected by the model
            messages = messages.map(message => {
                return {
                    role: message.role,
                    content: message.content
                }
            })

            const modelPackagePath = await getModelPackagePath()
            const c = require(modelPackagePath).default
            const chatApi: ChatAPI = new c()
            const message = await chatApi.complete({
                messages,
                manifest: await getManifest(model)
            })
            return [message]
        }
    }

}


@serviceEngine.handle<SwapTwoMessagesForAConversationChannel>("swap-two-messages-for-a-conversation")
export class SwapTwoMessagesForAConversation extends Service<SwapTwoMessagesForAConversationChannel> {

    constructor() {
        super()
        this.process = async (_e, { conversationId, firstMessageId, secondMessageId }) => {
            await swapMessagesOrder(conversationId, firstMessageId, secondMessageId)
        }
    }


}


@serviceEngine.handle<UpdateMessageRoleChannel>("update-message-role")
export class UpdateMessageRole extends Service<UpdateMessageRoleChannel> {

    constructor() {
        super()
        this.process = async (_e, { messageId, role }) => {
            await updateMesssageRole(messageId, role)
        }
    }
}
