import { test as base, BrowserContext, Page } from '@playwright/test'
import GaragePage from '../../pom/pages/GaragePage'
import AddCarForm from '../../pom/forms/AddCarForm'

type MyFixtures = {
  authenticatedContext: { context: BrowserContext; page: Page }
  userGaragePage: GaragePage
  addCarForm: AddCarForm
}

export const test = base.extend<MyFixtures>({
  authenticatedContext: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './test-data/states/validUser1StorageState.json',
    })
    const page = await context.newPage()
    await use({ context, page })
    await context.close()
  },
  userGaragePage: async ({ authenticatedContext }, use) => {
    const garagePage = new GaragePage(authenticatedContext.page)
    await garagePage.open()
    await use(garagePage)
  },
  addCarForm: async ({ authenticatedContext }, use) => {
    const addCarForm = new AddCarForm(authenticatedContext.page)
    await use(addCarForm)
  },
})
