import { AppDataSource } from "../data-source";
import { Conversation } from "../entities/conversation";
import { listAllActors } from "./settings";

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

export async function getEnabledActors(id: number) {
    const conversation = await AppDataSource.getRepository(Conversation).findOneOrFail({
        where: {
            id: id
        }
    });
    return conversation.actors;
}

export async function getActors(id: number) {
    const conversation = await AppDataSource.getRepository(Conversation).findOneOrFail({
        where: {
            id: id
        }
    });
    const enabledActors = conversation.actors;
    const allActors = await listAllActors();
    const actors = allActors.map(actor => {
        return {
            name: actor,
            enabled: enabledActors.includes(actor)
        }
    })
    return actors;
}

export async function toggleActors(id: number, actors: string[]) {
    const conversation = await AppDataSource.getRepository(Conversation).findOneOrFail({
        where: {
            id: id
        }
    });
    const enabledActors = conversation.actors;
    actors.forEach(actor => {
        if (enabledActors.includes(actor)) {
            enabledActors.splice(enabledActors.indexOf(actor), 1);
        } else {
            enabledActors.push(actor);
        }
    })
    conversation.actors = enabledActors;
    await AppDataSource.getRepository(Conversation).save(conversation);
}
