import type { Actor, Manifest } from 'types'
import wiki from 'wikipedia';
import sanitizeHtml from 'sanitize-html';

export default class Wiki implements Actor {
    async callAction(parameters: { [key: string]: string; } | undefined, manifest?: Manifest): Promise<string> {
        if (!parameters) {
            throw new Error('No parameters provided')
        }
        console.log(parameters)
        const page = await wiki.page(parameters.title)
        const summary = await page.summary()
        console.log(summary.extract)
        return summary.extract
    }
}
