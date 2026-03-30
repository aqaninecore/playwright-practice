import {test as base, expect, Page} from '@playwright/test';

type ScreenSize = {
    pageSmall: Page,
    pageMedium: Page,
    pageLarge: Page,
}

export const test = base.extend<ScreenSize>({
    pageSmall: async ({page}, use) => {
        await page.setViewportSize({width: 500, height: 700})
        await use(page)
    },

    pageMedium: async ({page}, use) => {
        await page.setViewportSize({width: 1000, height: 700})
        await use(page)
    },

    pageLarge: async ({page}, use) => {
        await page.setViewportSize({width: 1500, height: 700})
        await use(page)
    }
})