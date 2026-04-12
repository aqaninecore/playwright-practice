import { test as base, expect, Page } from '@playwright/test'
import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'
import GaragePage from '../../pom/pages/GaragePage'
import ForgotPasswordForm from '../../pom/forms/ForgotPasswordForm'

type Pages = {
  signInPage: SignInForm
  homePage: HomePage
  garagePage: GaragePage
  forgotPasswordForm: ForgotPasswordForm
}

export const test = base.extend<Pages>({
  signInPage: async ({ page }, use) => {
    const signInForm = new SignInForm(page)
    await use(signInForm)
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage)
  },

  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page)
    await use(garagePage)
  },

  forgotPasswordForm: async ({ page }, use) => {
    const forgotPasswordForm = new ForgotPasswordForm(page)
    await use(forgotPasswordForm)
  },

  openSignInForm: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await homePage.open()
    await homePage.signInButton.click()
    const signInForm = new SignInForm(page)
    await use(signInForm)
  },
})
