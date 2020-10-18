import axios from 'axios'
import { ForecastItem } from './../shared/hooks/useWeatherStore'
import { formatData, getErrorMessage, getLocation } from '../utils'

const BASE_URL = `https://api.openweathermap.org/data/2.5`
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export interface ResponseSuccess {
  cityName: string
  forecast: ForecastItem[]
}

export interface ResponseError {
  error: string
}

export async function fetchWeather(query: string): Promise<ResponseSuccess | ResponseError> {
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast?q=${query}&appid=${API_KEY}`)
    return formatData(data)
  } catch (error) {
    console.warn({ error })
    return { error: getErrorMessage(error) }
  }
}

export async function fetchInitialWeather(): Promise<ResponseSuccess | ResponseError> {
  try {
    const { lat, lon } = await getLocation()
    const { data } = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    return formatData(data)
  } catch (error) {
    console.warn({ error })
    return await fetchWeather('vilnius')
  }
}
