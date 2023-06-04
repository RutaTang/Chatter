import type { ChatAPI, Message, Messages, Manifest } from 'types'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

export default class ChatGPT3API implements ChatAPI {

    constructor() { }

    async complete({ messages, manifest }: {
        messages: Messages;
        manifest: Manifest;
    }
    ): Promise<Message> {
        // Params
        const apiKey = manifest.sections.find(s => s.title === 'Authentication')?.items.find(i => i.title === 'API Key')?.value || ""
        const maxTokens = Number(manifest.sections.find(s => s.title === 'Parameters')?.items.find(i => i.title === 'Max Tokens')?.value) || 300
        const temperature = Number(manifest.sections.find(s => s.title === 'Parameters')?.items.find(i => i.title === 'Temperature')?.value) || 0.9

        // Model 
        const configuration = new Configuration({
            apiKey,
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages as ChatCompletionRequestMessage[],
            max_tokens: maxTokens,
            temperature: temperature,
        })
        return completion.data.choices[0].message as Message
    }

}


