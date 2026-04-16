import { test as base, Page } from '@playwright/test'
import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'
import GaragePage from '../../pom/pages/GaragePage'
import SignUpForm from '../../pom/forms/SignUpForm'
import AddCarForm from '../../pom/forms/AddCarForm'

type App = {
  app: {
    page: Page
    signInForm: SignInForm
    homePage: HomePage
    garagePage: GaragePage
    signUpForm: SignUpForm
    addCarForm: AddCarForm
  }
}

export const test = base.extend<App>({
  app: async ({ page }, use) => {
    const app = {
      page,
      signInForm: new SignInForm(page),
      homePage: new HomePage(page),
      garagePage: new GaragePage(page),
      signUpForm: new SignUpForm(page),
      addCarForm: new AddCarForm(page),
    }
    await use(app)
  },
})
