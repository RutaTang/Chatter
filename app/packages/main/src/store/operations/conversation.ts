import { AppDataSource } from "../data-source";
import { Conversation } from "../entities/conversation";

export async function listConversations() {
    return await AppDataSource.getRepository(Conversation).find();
}

export async function addConversation(title: string, description?: string) {
    const conversation = new Conversation();
    conversation.title = title;
    conversation.description = description || "";
    conversation.createdAt = new Date().getTime();
    conversation.updatedAt = new Date().getTime();
    await AppDataSource.getRepository(Conversation).save(conversation);

    return conversation
}

export async function retitleConversation(id: number, title: string) {
    const conversation = await AppDataSource.getRepository(Conversation).findOneOrFail({
        where: {
            id: id
        }
    });
    conversation.title = title;
    await AppDataSource.getRepository(Conversation).save(conversation);
}

export async function deleteConversation(id: number) {
    const conversation = await AppDataSource.getRepository(Conversation).findOneOrFail({
        where: {
            id: id
        }
    });
    await AppDataSource.getRepository(Conversation).remove(conversation);
}

export async function getConversation(id: number) {
    return await AppDataSource.getRepository(Conversation).findOneOrFail({
        where: {
            id: id
        }
    });
}

export async function updateConversation(conversation: Conversation) {
    await AppDataSource.getRepository(Conversation).save(conversation);
}
