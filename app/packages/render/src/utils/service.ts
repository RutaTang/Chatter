// T should be channel name
export async function invock<T extends string, A>(channel: T, agr: A) {
    return await (window as any).electron.invock(channel, agr)
}
