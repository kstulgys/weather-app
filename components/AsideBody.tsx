import * as React from 'react'
import { Box, Text } from '@chakra-ui/core'
import { getCelcius } from '../utils'
import { ForecastItem } from '../shared/hooks/useWeatherStore'

interface AsideBodyProps {
  todaysWeather: ForecastItem
}

export function AsideBody({ todaysWeather }: AsideBodyProps): JSX.Element {
  const { weather, main, wind } = todaysWeather

  return (
    <>
      <Box mt="3">
        <Text>{weather[0].description}</Text>
      </Box>
      <Box>
        <Text>Feels like: {getCelcius(main.feels_like)} C</Text>
      </Box>
      <Box>
        <Text>Humidity: {main.humidity} </Text>
      </Box>
      <Box mb="10">
        <Text>Wind: {wind.speed}</Text>
      </Box>
    </>
  )
}
