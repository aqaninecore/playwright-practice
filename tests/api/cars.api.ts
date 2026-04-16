import { test, expect } from '@playwright/test'
import { garageController } from '../../controllers/GarageController'
import { getSidForUser } from '../../utils/api/storage-state'
import HomePage from '../../pom/pages/HomePage'
import SignInForm from '../../pom/forms/SignInForm'
import GaragePage from '../../pom/pages/GaragePage'

test.describe('Cars API. Create car', () => {
  let sid: string
  let createdCarId: number | undefined

  test.beforeAll(() => {
    sid = getSidForUser('validUser1StorageState')
  })

  test.afterEach(async ({ request }) => {
    if (createdCarId) {
      await garageController.deleteCar(request, sid, createdCarId)
      createdCarId = undefined
    }
  })

  test('GET all brands', async ({ request }) => {
    const response = await garageController.getAllBrands(request)
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.data).toHaveLength(5)
  })

  test('GET all models', async ({ request }) => {
    const response = await garageController.getAllModels(request)
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.data).toHaveLength(23)
  })

  test('GET user cars', async ({ request }) => {
    const response = await request.get('/api/cars', {
      headers: {
        Cookie: `sid=${sid}`,
      },
    })
    expect(response.status()).toBe(200)
  })

  test('POST car with valid data returns 201', async ({ request }) => {
    const response = await garageController.addCar(request, sid, 1, 3, 10000)
    const body = await response.json()

    expect(response.status()).toBe(201)
    expect(body.status).toBe('ok')
    expect(body.data).toMatchObject({
      carBrandId: 1,
      carModelId: 3,
      mileage: 10000,
      brand: 'Audi',
      model: 'Q7',
    })
    expect(body.data.id).toBeDefined()

    createdCarId = body.data.id
  })

  test('POST car with missing mileage returns 400', async ({ request }) => {
    const response = await request.post('/api/cars', {
      headers: { Cookie: `sid=${sid}` },
      data: { carBrandId: 1, carModelId: 3 },
    })
    const body = await response.json()

    expect(response.status()).toBe(400)
    expect(body.status).toBe('error')
  })

  test('POST car with negative mileage returns 400', async ({ request }) => {
    const response = await request.post('/api/cars', {
      headers: { Cookie: `sid=${sid}` },
      data: { carBrandId: 1, carModelId: 3, mileage: -1 },
    })
    const body = await response.json()

    expect(response.status()).toBe(400)
    expect(body.status).toBe('error')
  })
})

const MOCKED_PROFILE = {
  status: 'ok',
  data: {
    userId: 328349,
    photoFilename: 'default-user.png',
    name: 'Polar',
    lastName: 'Bear',
  },
}

test.describe('Profile page mock', () => {
  test('Success sign in and verify mocked profile response', async ({ page }) => {
    const homePage = new HomePage(page)
    const signInForm = new SignInForm(page)
    const garagePage = new GaragePage(page)

    let capturedResponse: any

    await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCKED_PROFILE),
      })
      capturedResponse = MOCKED_PROFILE
    })

    await homePage.open()
    await homePage.signInButton.click()
    await signInForm.login(process.env.USER1_EMAIL!, process.env.USER1_PASSWORD!)

    await page.waitForURL('**/panel/garage')
    await expect(garagePage.titleCheck).toHaveText('Garage')

    await garagePage.profileButton.click()
    await page.waitForURL('**/panel/profile')

    expect(capturedResponse).toBeDefined()
    expect(capturedResponse.status).toBe('ok')
    expect(capturedResponse.data).toEqual(MOCKED_PROFILE.data)

    await expect(page.locator('.profile_name')).toHaveText('Polar Bear')
  })
})
