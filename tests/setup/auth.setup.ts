import { test as setup, expect } from '@playwright/test'
import { mkdir } from 'fs/promises'
import { VALID_USER1 } from '../../test-data/users'
import { authController } from '../../controllers/AuthController'

setup('Sign in valid user 1 and save storage state', async ({ request }) => {
  await mkdir('./test-data/states', { recursive: true })
  const authResponse = await authController.signIn(request, VALID_USER1.email, VALID_USER1.password)
  expect(authResponse.status()).toBe(200)
  await request.storageState({ path: './test-data/states/validUser1StorageState.json' })
})
