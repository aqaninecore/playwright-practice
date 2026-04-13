import { test, expect } from '@playwright/test'
import SignUpForm from '../pom/forms/SignUpForm'

let signUpForm: SignUpForm

test.beforeEach(async ({ page }) => {
  signUpForm = new SignUpForm(page)
  await signUpForm.openModal()
  await expect(signUpForm.registerButton).toHaveText('Register')
  await expect(signUpForm.registerButton).toBeDisabled()
})

// Name field validation

test.describe('Sign Up Form. Name field validation', () => {
  test.describe('Positive cases', () => {
    test('Check valid input with 2 symbols', async () => {
      await signUpForm.nameField.fill('Go')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toBeHidden()
    })

    test('Check valid input with 10 symbols', async () => {
      await signUpForm.nameField.fill('LENGTHtest')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toBeHidden()
    })

    test('Check valid input with 20 symbols', async () => {
      await signUpForm.nameField.fill('LENGTHtestMOREsymbol')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toBeHidden()
    })
  })

  test.describe('Negative cases', () => {
    test('Check input validation with 1 symbol', async () => {
      await signUpForm.nameField.fill('G')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long')
    })

    test('Check input validation with 21 symbols', async () => {
      await signUpForm.nameField.fill('LENGTHtestMOREsymbols')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long')
    })

    test('Check input validation with special characters', async () => {
      await signUpForm.nameField.fill('!@#$%^')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Name is invalid')
    })

    test('Check input validation with Cyrillic characters', async () => {
      await signUpForm.nameField.fill('ТестЮзер')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Name is invalid')
    })

    test('Check input validation with digits', async () => {
      await signUpForm.nameField.fill('123456')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Name is invalid')
    })

    test('Check input validation with spaces', async () => {
      await signUpForm.nameField.fill('    ')
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Name is invalid')
    })

    test('Check empty input', async () => {
      await signUpForm.nameField.focus()
      await signUpForm.nameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Name is required')
    })
  })
})

// Last name field validation

test.describe('Sign Up Form. Last name field validation', () => {
  test.describe('Positive cases', () => {
    test('Check valid input with 2 symbols', async () => {
      await signUpForm.lastNameField.fill('Go')
    })

    test('Check valid input with 10 symbols', async () => {
      await signUpForm.lastNameField.fill('LENGTHtest')
    })

    test('Check valid input with 20 symbols', async () => {
      await signUpForm.lastNameField.fill('LENGTHtestMOREsymbol')
    })
  })

  test.describe('Negative cases', () => {
    test('Check input validation with 1 symbol', async () => {
      await signUpForm.lastNameField.fill('G')
      await signUpForm.lastNameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long')
    })

    test('Check input validation with 21 symbols', async () => {
      await signUpForm.lastNameField.fill('LENGTHtestMOREsymbols')
      await signUpForm.lastNameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long')
    })

    test('Check input validation with special characters', async () => {
      await signUpForm.lastNameField.fill('!@#$%^')
      await signUpForm.lastNameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Last name is invalid')
    })

    test('Check input validation with Cyrillic characters', async () => {
      await signUpForm.lastNameField.fill('ТестЮзер')
      await signUpForm.lastNameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Last name is invalid')
    })

    test('Check input validation with digits', async () => {
      await signUpForm.lastNameField.fill('123456')
      await signUpForm.lastNameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Last name is invalid')
    })

    test('Check input validation with spaces', async () => {
      await signUpForm.lastNameField.fill('    ')
      await signUpForm.lastNameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Last name is invalid')
    })

    test('Check empty input', async () => {
      await signUpForm.lastNameField.focus()
      await signUpForm.lastNameField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Last name is required')
    })
  })
})

// Email field validation

test.describe('Sign Up Form. Email field validation', () => {
  test.describe('Positive cases', () => {
    test('Check valid Email input', async () => {
      await signUpForm.emailField.fill('testUser123@gmail.com')
      // No blur — stays focused; no error expected
    })

    test('Check valid Email input with subdomain', async () => {
      await signUpForm.emailField.fill('testUser123@mail.gmail.com')
    })
  })

  test.describe('Negative cases', () => {
    test('Check with missing @ symbol', async () => {
      await signUpForm.emailField.fill('testUser123gmail.com')
      await signUpForm.emailField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Email is incorrect')
    })

    test('Check with missing domain', async () => {
      await signUpForm.emailField.fill('testUser123@')
      await signUpForm.emailField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Email is incorrect')
    })

    test('Check with invalid format (no local part)', async () => {
      await signUpForm.emailField.fill('@gmail.com')
      await signUpForm.emailField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Email is incorrect')
    })

    test('Check input validation with spaces', async () => {
      await signUpForm.emailField.fill('te st@mail.com')
      await signUpForm.emailField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Email is incorrect')
    })

    test('Check empty input', async () => {
      await signUpForm.emailField.focus()
      await signUpForm.emailField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Email required')
    })
  })
})

// Password field validation

test.describe('Sign Up Form. Password field validation', () => {
  const passwordError =
    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'

  test.describe('Positive cases', () => {
    test('Check valid Password input. Boundary 8 chars', async () => {
      await signUpForm.passwordField.fill('PassTes1')
    })

    test('Check valid Password input. 9 chars', async () => {
      await signUpForm.passwordField.fill('PassTes12')
    })

    test('Check valid Password input. Boundary 15 chars', async () => {
      await signUpForm.passwordField.fill('PassTest1234567')
    })

    test('Check valid Password input with spaces', async () => {
      await signUpForm.passwordField.fill('PassTest 34567 ')
    })
  })

  test.describe('Negative cases', () => {
    test('Check Password shorter than 8 chars', async () => {
      await signUpForm.passwordField.fill('PassTes')
      await signUpForm.passwordField.blur()
      await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(signUpForm.invalidFeedback).toHaveText(passwordError)
    })

    test('Check Password longer than 15 chars', async () => {
      await signUpForm.passwordField.fill('!testUser123@14x')
      await signUpForm.passwordField.blur()
      await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(signUpForm.invalidFeedback).toHaveText(passwordError)
    })

    test('Check Password without uppercase letter', async () => {
      await signUpForm.passwordField.fill('passtes1')
      await signUpForm.passwordField.blur()
      await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(signUpForm.invalidFeedback).toHaveText(passwordError)
    })

    test('Check Password without lowercase letter', async () => {
      await signUpForm.passwordField.fill('PASSTES1')
      await signUpForm.passwordField.blur()
      await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(signUpForm.invalidFeedback).toHaveText(passwordError)
    })

    test('Check Password without digits', async () => {
      await signUpForm.passwordField.fill('PassTestNoDigit')
      await signUpForm.passwordField.blur()
      await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(signUpForm.invalidFeedback).toHaveText(passwordError)
    })

    test('Check Password with digits only', async () => {
      await signUpForm.passwordField.fill('012345678987654')
      await signUpForm.passwordField.blur()
      await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(signUpForm.invalidFeedback).toHaveText(passwordError)
    })

    test('Check empty input', async () => {
      await signUpForm.passwordField.focus()
      await signUpForm.passwordField.blur()
      await expect(signUpForm.invalidFeedback).toHaveText('Password required')
    })
  })
})

// Re-enter password field validation

test.describe('Sign Up Form. Re-enter password field validation', () => {
  test.describe('Positive cases', () => {
    test('Check valid matching passwords', async ({ page }) => {
      await signUpForm.passwordField.fill('PassTes1')
      await signUpForm.repeatPasswordField.fill('PassTes1')
      await expect(page.getByText('Passwords do not match')).toHaveCount(0)
      await expect(signUpForm.repeatPasswordField).toHaveClass(/(^|\s)ng-valid(\s|$)/)

      await signUpForm.repeatPasswordField.blur()
    })
  })

  test.describe('Negative cases', () => {
    test('Check Password value mismatch', async () => {
      await signUpForm.passwordField.fill('PassTes1')
      await signUpForm.repeatPasswordField.fill('PassTes123')
      await signUpForm.repeatPasswordField.blur()
      await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(signUpForm.invalidFeedback).toHaveText('Passwords do not match')
    })

    test('Check Password case/symbol mismatch', async ({ page }) => {
      await signUpForm.passwordField.fill('Abcdef1gG')
      await signUpForm.repeatPasswordField.fill('Abcdef1g')
      await signUpForm.repeatPasswordField.blur()
      await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(page.getByText('Passwords do not match')).toBeVisible()
      await expect(signUpForm.invalidFeedback).toHaveText('Passwords do not match')
    })

    test('Check empty input', async () => {
      await signUpForm.repeatPasswordField.focus()
      await signUpForm.repeatPasswordField.blur()
      await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(signUpForm.invalidFeedback).toHaveText('Re-enter password required')
    })
  })
})

// Functional / end-to-end Sign Up tests

test.describe('Successful Sign Up. Functional testing', () => {
  test.describe('Positive cases', () => {
    test('Check Register button is enabled when all fields are valid', async () => {
      await signUpForm.nameField.fill('Go')
      await signUpForm.lastNameField.fill('LENGTHtestMOREsymbol')
      await signUpForm.emailField.fill('razorbackrightnow+1@gmail.com')
      await signUpForm.passwordField.fill('qweQWE123')
      await signUpForm.repeatPasswordField.fill('qweQWE123')
      await expect(signUpForm.registerButton).toHaveText('Register')
      await expect(signUpForm.registerButton).toBeEnabled()
    })

    test('Check progressive validation (fill field-by-field validly)', async () => {
      await signUpForm.nameField.fill('Go')
      await signUpForm.lastNameField.fill('LENGTHtestMOREsymbol')
      await signUpForm.emailField.fill('razorbackrightnow+1@gmail.com')
      await signUpForm.passwordField.fill('qweQWE123')
      await signUpForm.repeatPasswordField.fill('qweQWE123')
      await expect(signUpForm.registerButton).toHaveText('Register')
      await expect(signUpForm.registerButton).toBeEnabled()
    })

    test('Check successful Sign Up', async ({ page }) => {
      const uniqueEmail = `alias_${crypto.randomUUID()}@example.com`

      // Set up response interception BEFORE the action that triggers the request.
      // This is a key difference from Cypress: in Playwright the promise must be
      // created first, then awaited AFTER the click.
      const responsePromise = page.waitForResponse(
        (resp) => resp.url().includes('/api/auth/signup') && resp.request().method() === 'POST',
      )

      await signUpForm.nameField.fill('Go')
      await signUpForm.lastNameField.fill('LENGTHtestMOREsymbol')
      await signUpForm.emailField.fill(uniqueEmail)
      await signUpForm.passwordField.fill('qweQWE123')
      await signUpForm.repeatPasswordField.fill('qweQWE123')
      await expect(signUpForm.registerButton).toBeEnabled()
      await signUpForm.registerButton.click()

      const response = await responsePromise
      expect(response.status()).toBe(201)

      await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
    })
  })

  test.describe('Negative cases', () => {
    test('Check Register button is disabled when at least one field is invalid', async () => {
      await signUpForm.nameField.fill('Go')
      await signUpForm.lastNameField.fill('LENGTHtestMOREsymbol')
      await signUpForm.emailField.fill('razorbackrightnow+1gmail.com') // missing @
      await signUpForm.passwordField.fill('qweQWE123')
      await signUpForm.repeatPasswordField.fill('qweQWE123')
      await expect(signUpForm.registerButton).toHaveText('Register')
      await expect(signUpForm.registerButton).toBeDisabled()
    })

    test('Check Register button is disabled when all fields are empty-touched', async () => {
      await signUpForm.nameField.focus()
      await signUpForm.lastNameField.focus()
      await signUpForm.emailField.focus()
      await signUpForm.passwordField.focus()
      await signUpForm.repeatPasswordField.focus()
      await signUpForm.repeatPasswordField.blur()
      await expect(signUpForm.registerButton).toHaveText('Register')
      await expect(signUpForm.registerButton).toBeDisabled()
    })

    test('Check sign-up with already registered email', async ({ page }) => {
      const responsePromise = page.waitForResponse(
        (resp) => resp.url().includes('/api/auth/signup') && resp.request().method() === 'POST',
      )

      await signUpForm.nameField.fill('Go')
      await signUpForm.lastNameField.fill('LENGTHtestMOREsymbol')
      await signUpForm.emailField.fill('razorbackrightnow@gmail.com') // already registered
      await signUpForm.passwordField.fill('qweQWE123')
      await signUpForm.repeatPasswordField.fill('qweQWE123')
      await expect(signUpForm.registerButton).toBeEnabled()
      await signUpForm.registerButton.click()

      const response = await responsePromise
      expect(response.status()).toBe(400)

      await expect(page.getByText('User already exist')).toBeVisible()
    })
  })
})
