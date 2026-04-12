import { test as base, Page } from '@playwright/test'
import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'
import GaragePage from '../../pom/pages/GaragePage'
import ForgotPasswordForm from '../../pom/forms/ForgotPasswordForm'
import RegistrationForm from '../../pom/forms/RegistrationForm'
import AddCarForm from '../../pom/forms/AddCarForm'

type App = {
  page: Page
  signInPage: SignInForm
  homePage: HomePage
  garagePage: GaragePage
  forgotPasswordForm: ForgotPasswordForm
  registrationForm: RegistrationForm
  addCarForm: AddCarForm
}

export const test = base.extend<App>({})
