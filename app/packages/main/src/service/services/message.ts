import { addMessage, deleteMessage, listMessages, swapMessagesOrder, updateMessasgeRole as updateMesssageRole } from "../../store/operations/message";
import { getManifest } from "../../store/operations/settings";
import { BUILT_IN_ACTORS_PLUGINS_PATH, BUILT_IN_MODELS_PLUGINS_PATH } from "../../utils";
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
    ActionsRequest,
    ActionsResponse,
} from 'types'
import fs from 'fs'
import { parse } from "yaml";
import path from "path";
import { getActors } from "../../store/operations/conversation";
import { FOLLOW_EACH_USER_MESSAGE_NOT_CHOOSE_ACTOR_PLUGIN_PROMPT_MESSAGE, FOLLOW_EACH_USER_MESSAGE_PROMPT_MESSAGE, INFORM_ACTIOS_RESPONSE_PROMPT_MESSAGE, INFORM_ACTORS_LIST_FORMAT_PROMPT_MESSAGE, INFORM_ACTORS_LIST_PROMPT_MESSAGE, INFORM_ACTORS_RESPONSE_FORMAT_PROMPT_MESSAGE } from "../../constants";
import { getChildrenDirectories } from "../../utils/fs";
import { ActorAction, ActorMetaData } from "../../types";

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
            const actors = await getActors(conversationId)
            const enabledActors = actors.filter(actor => actor.enabled)
            const messages = await listMessages(conversationId)
            // If has enabled actors and no messages, add system prompts
            if (enabledActors.length > 0 && messages.length == 0) {
                // map actor name to actions
                const map = new Map<string, { actions: ActorAction[] }>()
                const folders = await getChildrenDirectories(BUILT_IN_ACTORS_PLUGINS_PATH)
                for (const folder of folders) {
                    // get manifest
                    const manifest: Manifest = parse((fs.readFileSync(`${folder}/manifest.yaml`, 'utf-8')).toString())
                    // get actions
                    const actions: ActorAction[] = parse((fs.readFileSync(`${folder}/actions.yaml`, 'utf-8')).toString())
                    map.set(manifest.name, { actions })
                }
                // get actors metadata
                const actorsMetaData: ActorMetaData[] = []
                for (const actor of enabledActors) {
                    const info = map.get(actor.name)
                    if (!info) { continue }
                    const { actions } = info
                    actorsMetaData.push({
                        name: actor.name,
                        actions,
                    })
                }
                const ROLE = "system"
                await addMessage(conversationId, ROLE, INFORM_ACTORS_LIST_FORMAT_PROMPT_MESSAGE, true)
                await addMessage(conversationId, ROLE, INFORM_ACTORS_RESPONSE_FORMAT_PROMPT_MESSAGE, true)
                await addMessage(conversationId, ROLE, INFORM_ACTORS_LIST_PROMPT_MESSAGE(actorsMetaData), true)
            }
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

    async callActions(actions: ActionsRequest): Promise<ActionsResponse> {
        // map actor name to folder and manifest
        const map = new Map<string, { folder: string, manifest: Manifest }>()
        const folders = await getChildrenDirectories(BUILT_IN_ACTORS_PLUGINS_PATH)
        for (const folder of folders) {
            // parse manifest
            const manifestString = (fs.readFileSync(`${folder}/manifest.yaml`, 'utf-8')).toString()
            const manifest: Manifest = parse(manifestString)
            map.set(manifest.name, {
                folder: folder,
                manifest: manifest
            })
        }
        // collect responses
        const actionsResponse: ActionsResponse = []
        for (const action of actions) {
            const info = map.get(action.actor_name)
            if (!info) {
                continue
            }
            const c = require(`${info.folder}`).default
            const instanse = new c()
            try {
                const response = await instanse.callAction(action.parameters, info.manifest)
                actionsResponse.push({
                    actor_name: action.actor_name,
                    action_name: action.action_name,
                    response: response
                })
            } catch (e) {
                console.error(e)
                continue
            }
        }
        console.log(actionsResponse)
        return actionsResponse
    }

    constructor() {
        super()
        this.process = async (_e, { conversationId, model }) => {

            // Complete messages
            const completMessages = async (messages: {
                role: string,
                content: string
            }[]) => {
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
                const modelPackagePath = await getModelPackagePath()
                // get model class
                const c = require(modelPackagePath).default
                // create model instance
                const chatApi: ChatAPI = new c()
                // call model complete method
                const message = await chatApi.complete({
                    messages: messages,
                    manifest: await getManifest(model)
                })
                return message
            }

            // get messages of the conversation
            const messages = await listMessages(conversationId)

            // convert messages to the format expected by the model
            let formatedMessages = messages.map(message => {
                return {
                    role: message.role,
                    content: message.content
                }
            })
            let clonedFormatedMessages = [...formatedMessages]

            const actors = await getActors(conversationId)
            const enabledActors = actors.filter(actor => actor.enabled)
            // For messages with enabled actors, and last message is in "user" role
            if (
                enabledActors.length > 0
                && formatedMessages.length > 0
                && formatedMessages[formatedMessages.length - 1].role === "user"
            ) {
                const content = formatedMessages[formatedMessages.length - 1].content
                formatedMessages[formatedMessages.length - 1].content = `{{${content}}} \n\n ${FOLLOW_EACH_USER_MESSAGE_PROMPT_MESSAGE}`

                // complete messages to get the model chosed action to be executed
                const actionRequestMessage = await completMessages(formatedMessages)
                formatedMessages.push(actionRequestMessage)

                // extract json from the message and call the actions
                const regex = /```json([\s\S]*?)```/g;
                const match = regex.exec(actionRequestMessage.content)
                if (match && match.length > 1) {
                    const json = match[1]
                    const actions = JSON.parse(json) as ActionsRequest
                    try {
                        const responses = await this.callActions(actions)
                        if (responses.length === 0) throw new Error("No actions executed")
                        const content = INFORM_ACTIOS_RESPONSE_PROMPT_MESSAGE(responses)
                        formatedMessages.push({
                            role: "user",
                            content: content
                        })
                        const restult = await completMessages(formatedMessages)
                        await addMessage(conversationId, restult.role, restult.content)
                    } catch (error) {
                        // chage the last message to inform not chose any action    
                        const content = clonedFormatedMessages[clonedFormatedMessages.length - 1].content
                        // attach prompt to not 
                        clonedFormatedMessages[clonedFormatedMessages.length - 1].content = `${content} \n\n ${FOLLOW_EACH_USER_MESSAGE_NOT_CHOOSE_ACTOR_PLUGIN_PROMPT_MESSAGE}`
                        // complete messages
                        const restult = await completMessages(formatedMessages)
                        await addMessage(conversationId, restult.role, restult.content)
                    }
                } else {
                    // chage the last message to inform not chose any action    
                    const content = clonedFormatedMessages[clonedFormatedMessages.length - 1].content
                    // attach prompt to not 
                    clonedFormatedMessages[clonedFormatedMessages.length - 1].content = `${content} \n\n ${FOLLOW_EACH_USER_MESSAGE_NOT_CHOOSE_ACTOR_PLUGIN_PROMPT_MESSAGE}`
                    // complete messages
                    const restult = await completMessages(formatedMessages)
                    await addMessage(conversationId, restult.role, restult.content)
                }
            }
            // For any other messages, just complete them
            else {
                const restult = await completMessages(clonedFormatedMessages)
                await addMessage(conversationId, restult.role, restult.content)
            }
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
