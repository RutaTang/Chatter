import path from 'path'
import LLM from './index'
import { config } from 'dotenv'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

describe('index', () => {

    const API_KEY = config({ path: path.join(process.cwd(), '.env.test.local') }).parsed?.API_KEY

    const messages = [
        {
            role: 'user',
            content: 'hi',
        }
    ]
    const manifest = {

        name: 'GPT-3 Chat',
        sections: [
            {
                title: 'Authentication',
                items: [
                    {
                        title: 'API Key',
                        value: API_KEY,
                    }
                ]
            },
            {
                title: 'Parameters',
                items: [
                    {
                        title: 'Max Tokens',
                        value: '300',
                    },
                    {
                        title: 'Temperature',
                        value: '0.9',
                    }
                ]
            }
        ]
    }

    it('should complete', async () => {
        const llm = new LLM()
        const message = await llm.complete({
            messages,
            manifest,
        })
        expect(message).toBeDefined()
    })

})
