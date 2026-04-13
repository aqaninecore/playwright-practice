import { test as screenSizeTest } from '../utils/fixtures/screenSizeFixture'

// screenSizeTest('Without fixtures test', async () => {
// const browser = await chromium.launch()
// const context = await browser.newContext()
// const page = await context.newPage()

// await page.goto('https://wikipedia.org/')
// })

// screenSizeTest('With fixtures test', async ({page}) => {
//     await page.goto('https://wikipedia.org/')
// })
screenSizeTest('With custom fixtures test', async ({ pageSmall, pageMedium, pageLarge }) => {
  await pageSmall.goto('https://wikipedia.org/')
  await pageMedium.goto('https://wikipedia.org/')
  await pageLarge.goto('https://wikipedia.org/')
})
