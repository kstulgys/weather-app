import { ResposeSuccess, ResponseError } from '../api'
import { ForecastItem } from '../shared/hooks/useWeatherStore'

export function getCelcius(kelvin: number): number {
  return Math.round(kelvin - 273.15)
}

export function isError(data: ResponseError | ResposeSuccess): data is ResponseError {
  if ((data as ResponseError).error) {
    return true
  }
  return false
}

export function isSuccess(data: ResponseError | ResposeSuccess): data is ResposeSuccess {
  if ((data as ResposeSuccess).cityName && (data as ResposeSuccess).forecast) {
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
    if (!navigator.geolocation) rej('navigator is not supported')
    navigator.geolocation.getCurrentPosition((position) => {
      res({
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      })
    })
  })
}
