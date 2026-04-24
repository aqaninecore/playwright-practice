import { Locator, Page } from '@playwright/test'

class RegistrationForm {
  readonly page: Page
  readonly nameField: Locator
  readonly lastNameField: Locator
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly repeatPasswordField: Locator
  readonly registerButton: Locator

  constructor(page: Page) {
    this.page = page
    this.nameField = page.locator('#signupName')
    this.lastNameField = page.locator('#signupLastName')
    this.emailField = page.locator('#signupEmail')
    this.passwordField = page.locator('#signupPassword')
    this.repeatPasswordField = page.locator('#signupRepeatPassword')
    this.registerButton = page.locator('app-signup-modal .modal-footer button')
  }
}

export default RegistrationForm
