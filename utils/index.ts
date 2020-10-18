import { ResponseSuccess, ResponseError } from '../api'
import { ForecastItem } from '../shared/hooks/useWeatherStore'

export function getCelcius(kelvin: number): number {
  return Math.round(kelvin - 273.15)
}

export function isError(data: ResponseError | ResponseSuccess): data is ResponseError {
  if ((data as ResponseError).error) {
    return true
  }
  return false
}

export function isSuccess(data: ResponseError | ResponseSuccess): data is ResponseSuccess {
  if ((data as ResponseSuccess).cityName && (data as ResponseSuccess).forecast) {
    return true
  }
  return false
}

export function formatData(data: {
  city: { name: string }
  list: ForecastItem[]
}): { cityName: string; forecast: ForecastItem[] } {
  return {
    cityName: data.city.name,
    forecast: data.list,
  }
}

interface ErrorProp {
  message: string
}

export function getErrorMessage(error: ErrorProp): string {
  return error.message.includes('404') ? 'City not found' : 'Something went wrong. Please try again later'
}

export async function getLocation(): Promise<{ lon: number; lat: number }> {
  return new Promise((res, rej) => {
    if (!navigator?.geolocation) rej('Geolocation is not supported by your browser')

    navigator.permissions.query({ name: 'geolocation' }).then(({ state }) => {
      if (state == 'denied') return rej('Can not get coordinates')

      navigator.geolocation.getCurrentPosition((position) => {
        res({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        })
      })
    })
  })
}
