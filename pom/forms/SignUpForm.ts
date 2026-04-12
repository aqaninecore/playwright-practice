import { Locator, Page } from '@playwright/test'

class SignUpForm {
  readonly page: Page

  // Form fields
  readonly nameField: Locator
  readonly lastNameField: Locator
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly repeatPasswordField: Locator

  // Buttons
  readonly registerButton: Locator

  // Validation
  readonly invalidFeedback: Locator

  constructor(page: Page) {
    this.page = page
    this.nameField = page.locator('#signupName')
    this.lastNameField = page.locator('#signupLastName')
    this.emailField = page.locator('#signupEmail')
    this.passwordField = page.locator('#signupPassword')
    this.repeatPasswordField = page.locator('#signupRepeatPassword')
    this.registerButton = page.locator('app-signup-modal .modal-footer button')
    this.invalidFeedback = page.locator('.invalid-feedback')
  }

  /**
   * Navigate to homepage and open the Sign Up modal
   */
  async openModal(): Promise<void> {
    await this.page.goto('/')
    await this.page.locator('.hero-descriptor_btn.btn.btn-primary').click()
  }
}

export default SignUpForm
