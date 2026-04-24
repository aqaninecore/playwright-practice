import { test as base, BrowserContext, Page } from '@playwright/test'
import GaragePage from '../../pom/pages/GaragePage'
import AddCarForm from '../../pom/forms/AddCarForm'

type MyFixtures = {
  authenticatedContext: { context: BrowserContext; page: Page }
  userGaragePage: GaragePage
  addCarForm: AddCarForm
}

export const test = base.extend<MyFixtures>({
  storageState: './test-data/states/validUser1StorageState.json',
  authenticatedContext: async ({ context, page }, use) => {
    await use({ context, page })
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
