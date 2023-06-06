import { AppDataSource } from "../data-source";
import { Conversation } from "../entities/conversation";
import { Message } from "../entities/message";

export async function listMessages(conversationId: number) {
    const conversation = await AppDataSource.manager.findOneOrFail(Conversation, {
        where: {
            id: conversationId
        },
        relations: {
            messages: true
        }
    })
    // sort messages by order: if order is -1, means it should be in its original place, otherwise, sort by order 
    const sort = (messages: Message[]) => {
        const positiveOrders = messages.filter(item => item.order > -1).sort((a, b) => a.order - b.order);
        let j = 0;
        const result = messages.map(item => {
            if (item.order > -1) {
                return positiveOrders[j++];
            } else {
                return item;
            }
        });
        return result
    }
    return sort(conversation.messages || [])
}

export async function addMessage(conversationId: number, role: string, content: string) {
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

export async function swapMessagesOrder(conversationId: number, firstMessageId: number, secondMessageId: number) {
    const conversation = await AppDataSource.getRepository(Conversation).findOneOrFail({
        where: {
            id: conversationId
        },
        relations: {
            messages: true
        }
    })
    const firstMessage = conversation.messages?.find(item => item.id == firstMessageId)
    const secondMessage = conversation.messages?.find(item => item.id == secondMessageId)
    if (firstMessage && secondMessage) {
        // If any one's order is -1, assign their id to the other one's order 
        if (firstMessage.order === -1 || secondMessage.order === -1) {
            [firstMessage.order, secondMessage.order] = [secondMessage.id, firstMessage.id]
        } else {
            [firstMessage.order, secondMessage.order] = [secondMessage.order, firstMessage.order]
        }
        await AppDataSource.getRepository(Message).save(firstMessage)
        await AppDataSource.getRepository(Message).save(secondMessage)
    }
}
