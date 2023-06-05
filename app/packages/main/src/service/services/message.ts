import { addMessage, listMessages, swapMessagesOrder } from "../../store/operations/message";
import { getManifest } from "../../store/operations/settings";
import { BUILT_IN_MODELS_PLUGINS_PATH } from "../../utils";
import { Service, serviceEngine } from "../engine";
import type { AddMessageChannel, AddMessageChannelArgs, AddMessageChannelReturn, ChatAPI, CompleteMessagesChannel, CompleteMessagesChannelArgs, CompleteMessagesChannelReturn, ListMessagesChannel, ListMessagesChannelArgs, ListMessagesChannelReturn, Manifest, SwapTwoMessagesForAConversationChannel, SwapTwoMessagesForAConversationChannelArgs, SwapTwoMessagesForAConversationChannelReturn } from 'types'
import fs from 'fs'
import { parse } from "yaml";
import path from "path";
@serviceEngine.handle<ListMessagesChannel>("list-messages")
export class ListMessages extends Service {

    async process(_: any, { conversationId }: ListMessagesChannelArgs): Promise<ListMessagesChannelReturn> {
        return await listMessages(conversationId)
    }

}

@serviceEngine.handle<AddMessageChannel>("add-message")
export class AddMessage extends Service {

    async process(_: any, { conversationId, role, content }: AddMessageChannelArgs): Promise<AddMessageChannelReturn> {
        await addMessage(conversationId, role, content)
    }

}

@serviceEngine.handle<CompleteMessagesChannel>("complete-messages")
export class CompleteMessages extends Service {

    async process(_: any, {
        messages,
        model
    }: CompleteMessagesChannelArgs): Promise<CompleteMessagesChannelReturn> {

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
        return message
    }

}


@serviceEngine.handle<SwapTwoMessagesForAConversationChannel>("swap-two-messages-for-a-conversation")
export class SwapTwoMessagesForAConversation extends Service {

    async process(_: any, { conversationId, firstMessageId, secondMessageId }: SwapTwoMessagesForAConversationChannelArgs): Promise<SwapTwoMessagesForAConversationChannelReturn> {
        console.log(conversationId, firstMessageId, secondMessageId)
        await swapMessagesOrder(conversationId, firstMessageId, secondMessageId)
    }

}
