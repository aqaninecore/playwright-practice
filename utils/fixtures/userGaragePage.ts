import { test as base } from '@playwright/test'
import GaragePage from '../../pom/pages/GaragePage'
import AddCarForm from '../../pom/forms/AddCarForm'

type MyFixtures = {
  userGaragePage: GaragePage
  addCarForm: AddCarForm
}

export const test = base.extend<MyFixtures>({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './test-data/states/validUser1StorageState.json',
    })
    const page = await context.newPage()
    const garagePage = new GaragePage(page)
    await garagePage.open()
    await use(garagePage)
    await context.close()
  },
  addCarForm: async ({ page }, use) => {
    const addCarForm = new AddCarForm(page)
    await use(addCarForm)
  },
})
