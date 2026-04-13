import { test, expect } from '@playwright/test'
import HomePage from '../pom/pages/HomePage'
import SignInForm from '../pom/forms/SignInForm'
//import VALID_USER1 from '../test-data/users';
import { faker } from '@faker-js/faker'

test.describe('Sign in test', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)

    await page.goto('/')
    await page.locator('.header_signin').click()
  })

  test.describe('Sign In process', () => {
    test('Successful sign in', async ({ page }) => {
      await page.locator('#signinEmail').fill('razorbackrightnow@gmail.com')
      await page.locator('#signinPassword').fill('Balagan1234')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.locator('h1')).toHaveText('Garage')
    })

    test('Sign in with empty email', async ({ page }) => {
      await page.locator('#signinEmail').fill('')
      await page.locator('#signinPassword').fill('Balagan1234')
      await expect(page.getByRole('button', { name: 'Login' })).toBeDisabled()
      await expect(page.locator('div.invalid-feedback')).toHaveText('Email required')
      await expect(page.locator('#signinEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Sign in with empty password', async ({ page }) => {
      await page.locator('#signinEmail').fill('razorbackrightnow@gmail.com')
      await page.locator('#signinPassword').focus()
      await page.locator('#signinPassword').blur()
      await expect(page.getByRole('button', { name: 'Login' })).toBeDisabled()
      await expect(page.locator('div.invalid-feedback')).toHaveText('Password required')
      await expect(page.locator('#signinPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Sign in with wrong password', async ({ page }) => {
      await page.locator('#signinEmail').fill('razorbackrightnow@gmail.com')
      await page.locator('#signinPassword').fill('Balagan123')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.locator('p.alert-danger')).toHaveText('Wrong email or password')
    })
  })
})
