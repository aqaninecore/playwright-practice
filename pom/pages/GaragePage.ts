import { expect, Locator, Page } from '@playwright/test'
import BasePage from '../pages/BasePage'

class GaragePage extends BasePage {
  [x: string]: any

  public readonly garageTitle: Locator = this.page.locator('.garage_title')
  public readonly addCarButton: Locator = this.page.locator('.btn-primary', { hasText: 'Add car' })
  public readonly carList: Locator = this.page.locator('.car-list')
  public readonly titleCheck: Locator = this.page.locator('h1')
  public readonly selectCarBrand: Locator = this.page.locator('#addCarBrand')
  public readonly selectCarModel: Locator = this.page.locator('#addCarModel')
  public readonly carMileageInput: Locator = this.page.locator('#addCarMileage')
  public readonly profileButton: Locator = this.page.locator('.icon-profile')

  async open() {
    await this.page.goto('/panel/garage')
  }

  async verifyLastAddedCar(carName: string, mileage: string) {
    const cars = this.carList.locator('.car-item').filter({ has: this.page.locator('.car_name', { hasText: carName }) })
    await expect
      .poll(async () => {
        const count = await cars.count()
        for (let i = 0; i < count; i++) {
          const val = await cars.nth(i).locator('.update-mileage-form_input').inputValue()
          if (val === mileage) return true
        }
        return false
      })
      .toBe(true)
  }

  async removeLastAddedCar() {
    const lastCar = this.carList.locator('.car-item').last()
    await lastCar.locator('.car_edit').click()
    await this.page.locator('.btn-outline-danger').click()
    await this.page.locator('app-remove-car-modal .btn-danger').click()
  }
}

export default GaragePage
