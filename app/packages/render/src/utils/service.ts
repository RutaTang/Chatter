import { Channel } from "types"

export async function invock<T extends Channel>(channel: T['name'], agr: T['args']): Promise<T['return']> {
    return await (window as any).electron.invock(channel, agr)
}
