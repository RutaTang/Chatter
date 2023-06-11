import wiki from "wikipedia"

describe('index', () => {
    it('should pass', async () => {
        const page = await wiki.page('Mathematics')
        console.log(page)
        console.log(await page.content())
    })
})
