import { Locator, Page } from "@playwright/test"

class HomePage {
    private readonly page: Page
    public readonly signInButton: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = this.page.locator('.header_signin')
    }

    async open() {
        await this.page.goto('/')
    }
}

export default HomePage