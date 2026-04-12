import test, { expect } from '@playwright/test'
import { log } from 'node:console'

test.describe('Garage API tests', () => {
  test('Get all brands', async ({ request }) => {
    const response = await request.get('/api/car/brands')
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.data).toHaveLength(5)
  })

  test('Get all models', async ({ request }) => {
    const response = await request.get('/api/car/models')
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.data).toHaveLength(23)
  })

  test('Get user cars. Auth options 1', async ({ request }) => {
    const signInResponse = await request.get('/api/auth/signin', {
      data: {
        email: VALID_USER1.email,
        password: VALID_USER1.password,
      },
    })

    console.log(signInResponse)
  })
})
