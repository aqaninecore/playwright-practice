import { Locator, Page } from "@playwright/test";
import BasePage from "../pages/BasePage";

class SignInForm extends BasePage {
    private readonly emailField: Locator
    private readonly passwordField: Locator
    private readonly loginButton: Locator
    private readonly validationError: Locator
    private readonly wrongDataError: Locator

    constructor(page: Page) {
        this.page = page
        this.emailField = this.page.locator('signinEmail')
        this.passwordField = this.page.locator('signinPassword')
        this.loginButton = this.page.getByRole('button', {name: 'Login'})
        this.validationError = this.page.locator('div.invalid-feedback p')
        this.wrongDataError = this.page.locator('div.invalid-feedback p')
    }

    async login(email: )
}

export default SignInForm