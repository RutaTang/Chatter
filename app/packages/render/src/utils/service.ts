import { Channel } from "types"

export async function invock<T extends Channel>(channel: T['name'], agr: T['args']): Promise<T['return']> {
    try {
        return await (window as any).electron.invock(channel, agr)
    } catch (e: any) {
        // WARN: this is a hacky/dirty way to get the error message
        // Approach: find second ":" and get the string after it
        const message: string = e.message
        let error = message.slice(message.indexOf(':') + 1)
        error = error.slice(error.indexOf(':') + 1)
        // remove duplicate spaces
        error = error.replace(/\s+/g, ' ')
        throw new Error(error)
    }
}
