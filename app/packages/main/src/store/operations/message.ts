import { AppDataSource } from "../data-source";
import { Conversation } from "../entities/conversation";
import { Message } from "../entities/message";

export async function listMessages(conversationId: string) {
    const conversation = await AppDataSource.manager.findOneOrFail(Conversation, {
        where: {
            id: conversationId
        },
        relations: {
            messages: true
        }
    })
    return conversation.messages || []
}

export async function addMessage(conversationId: string, role: string, content: string) {
    const conversation = await AppDataSource.getRepository(Conversation).findOneOrFail({
        where: {
            id: conversationId
        },
        relations: {
            messages: true
        }
    })
    const message = new Message()
    message.role = role
    message.content = content
    message.conversation = conversation
    await AppDataSource.getRepository(Message).save(message)
}
