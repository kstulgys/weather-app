import { ResponseSuccess, ResponseError } from './../../api/index'
import create from 'zustand'
import { fetchWeather, fetchInitialWeather } from '../../api'
import { isError, isSuccess } from '../../utils'

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
    try {
      const response = await fetchWeather(query)
      const { forecast, cityName } = response as ResponseSuccess
      const { error } = response as ResponseError

      if (isError(response)) return set({ error })
      if (isSuccess(response)) return set({ forecast, cityName, error: '' })
    } catch (error) {
      set({ error: 'Something went wrong' })
    } finally {
      set({ isLoading: false })
    }
  },
  getInitialWeather: async () => {
    try {
      const response = await fetchInitialWeather()
      const { forecast, cityName } = response as ResponseSuccess
      const { error } = response as ResponseError

      if (isError(response)) return set({ error })
      if (isSuccess(response)) return set({ forecast, cityName, error: '' })
    } catch (error) {
      set({ error: 'Something went wrong' })
    } finally {
      set({ isLoading: false })
    }
  },
}))
