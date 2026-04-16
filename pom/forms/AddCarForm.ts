import { Locator, Page } from '@playwright/test'

class AddCarForm {
  readonly page: Page
  private readonly brandSelect: Locator
  private readonly modelSelect: Locator
  private readonly mileageInput: Locator
  private readonly addButton: Locator

  constructor(page: Page) {
    this.page = page
    this.brandSelect = page.locator('#addCarBrand')
    this.modelSelect = page.locator('#addCarModel')
    this.mileageInput = page.locator('#addCarMileage')
    this.addButton = page.locator('.modal-footer button', { hasText: 'Add' })
  }

  async addCar(brand: string, model: string, mileage: string) {
    await this.brandSelect.selectOption({ label: brand })
    await this.modelSelect.selectOption({ label: model })
    await this.mileageInput.fill(mileage)
    await this.addButton.click()
  }
}

export default AddCarForm
