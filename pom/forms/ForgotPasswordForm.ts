import { Locator, Page } from '@playwright/test'

class ForgotPasswordForm {
  readonly page: Page
  readonly emailField: Locator
  readonly sendButton: Locator

  constructor(page: Page) {
    this.page = page
    this.emailField = page.locator('#emailForgotPassword')
    this.sendButton = page.locator('button', { hasText: 'Send' })
  }
}

export default ForgotPasswordForm
