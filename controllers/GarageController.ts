import { APIRequestContext } from '@playwright/test'

class GarageController {
  async getAllBrands(request: APIRequestContext) {
    return await request.get('/api/cars/brands')
  }

  async getAllModels(request: APIRequestContext) {
    return await request.get('/api/cars/models')
  }

  async getUserCars(request: APIRequestContext, sid: string) {
    return await request.get('/api/cars', {
      headers: {
        Cookie: `sid=${sid}`,
      },
    })
  }

  async getCarById(request: APIRequestContext, sid: string, id: number) {
    return await request.get(`/api/cars/${id}`, {
      headers: {
        Cookie: `sid=${sid}`,
      },
    })
  }

  async updateCarMileage(request: APIRequestContext, sid: string, id: number, mileage: number) {
    return await request.put(`/api/cars/${id}`, {
      headers: {
        Cookie: `sid=${sid}`,
      },
      data: {
        mileage,
      },
    })
  }

  async getFirstCarId(request: APIRequestContext, sid: string) {
    const response = await this.getUserCars(request, sid)
    const body = await response.json()
    return body.data[0]?.id
  }

  async deleteCar(request: APIRequestContext, sid: string, id: number) {
    return await request.delete(`/api/cars/${id}`, {
      headers: {
        Cookie: `sid=${sid}`,
      },
    })
  }

  async addCar(request: APIRequestContext, sid: string, carBrandId: number, carModelId: number, mileage: number) {
    return await request.post('/api/cars', {
      headers: {
        Cookie: `sid=${sid}`,
      },
      data: {
        carBrandId,
        carModelId,
        mileage,
      },
    })
  }
}

export const garageController = new GarageController()
