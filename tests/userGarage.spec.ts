import { test } from '../utils/fixtures/userGaragePage'
import { faker } from '@faker-js/faker'

test.describe('User Garage — authenticated via storageState fixture', () => {
  let carAdded = false

  test.afterEach(async ({ userGaragePage }) => {
    if (carAdded) {
      await userGaragePage.removeLastAddedCar()
      carAdded = false
    }
  })

  test('Add a car and delete it', async ({ userGaragePage, addCarForm }) => {
    const mileage = String(faker.number.int({ min: 1000, max: 50000 }))

    await userGaragePage.addCarButton.click()
    await addCarForm.addCar('BMW', 'X5', mileage)
    carAdded = true
    await userGaragePage.verifyLastAddedCar('BMW X5', mileage)
  })
})
