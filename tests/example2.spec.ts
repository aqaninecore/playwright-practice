import { test, expect } from '@playwright/test'
import { after, afterEach, before, beforeEach } from 'node:test'

// test.describe('Group of tests', () => {
// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

// })

test.describe('Search', () => {
  test('Successful sign in', async ({ page }) => {
    await page.goto('/')
    await page.locator('nav', { has: page.locator('New') }).highlight()
    // await page.getByRole('heading', {name: 'Do more!'}).highlight()
    // await page.getByRole('heading', {name: 'Do more!'}).highlight()
    await page.getByText('Do', { exact: true }).highlight()
  })

  test('Filter', async ({ page }) => {
    await page.goto('/')
    await page.locator('button').filter({ hasText: 'Contacts' }).highlight()
  })

  // test('Multiple Elements', async ({page}) => {
  //     await page.goto('/')
  //     await page.locator('button').last().highlight()
  //     await page.locator('button').last().highlight()
  //     await page.locator('button').nth(3).highlight()

  //     let button = page.locator('button')

  //     for (const button of await buttons.all()) {
  //       console.log(await button.count())
  //       console.log(await button.innerText())
  //     }
  // })
})
