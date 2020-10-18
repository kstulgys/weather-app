import create from 'zustand'
import { fetchWeather, fetchInitialWeather } from '../../api'
import { isError, isSuccess, getCelcius } from '../../utils'

export type ForecastItem = {
  main: { temp: number; feels_like: number; humidity: string }
  wind: { speed: number }
  dt: number
  weather: { description: string }[]
}

type State = {
  forecast: ForecastItem[] | []
  searchTerm: string
  cityName: string
  isLoading: boolean
  error: string
  getWeather: (query: string) => void
  getInitialWeather: () => void
}

export const useWeatherStore = create<State>((set) => ({
  // state
  forecast: [],
  searchTerm: '',
  cityName: '',
  isLoading: true,
  error: '',
  // actions
  getWeather: async (query) => {
    const response = await fetchWeather(query).finally(() => set({ isLoading: false }))
    if (isError(response)) return set({ error: response.error })
    if (isSuccess(response))
      return set({
        forecast: response.forecast,
        cityName: response.cityName,
        error: '',
      })
  },
  getInitialWeather: async () => {
    const response = await fetchInitialWeather().finally(() => set({ isLoading: false }))
    if (isError(response)) return set({ error: response.error })
    if (isSuccess(response))
      return set({
        forecast: response.forecast,
        cityName: response.cityName,
        error: '',
      })
  },
}))
