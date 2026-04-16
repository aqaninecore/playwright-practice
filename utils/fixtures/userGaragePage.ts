import { test as base, type Page } from '@playwright/test'
import GaragePage from '../../pom/pages/GaragePage'
import AddCarForm from '../../pom/forms/AddCarForm'

type MyFixtures = {
  garagePagePage: Page
  userGaragePage: GaragePage
  addCarForm: AddCarForm
}

export const test = base.extend<MyFixtures>({
  garagePagePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './test-data/states/validUser1StorageState.json',
    })
    const page = await context.newPage()
    await use(page)
    await context.close()
  },
  userGaragePage: async ({ garagePagePage }, use) => {
    const garagePage = new GaragePage(garagePagePage)
    await garagePage.open()
    await use(garagePage)
  },
  addCarForm: async ({ garagePagePage }, use) => {
    const addCarForm = new AddCarForm(garagePagePage)
    await use(addCarForm)
  },
})
