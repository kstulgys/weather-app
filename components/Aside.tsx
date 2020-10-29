import * as React from 'react'
import { Box, Stack, Text } from '@chakra-ui/core'

import { getCelcius } from '../utils'
import { useWeatherStore, ForecastItem } from '../shared/hooks/useWeatherStore'
import { AsideBody } from './AsideBody'
import { ForecastChart } from './ForecastChart'

type ForecastData = { name: number; value: number }[]

export function Aside(): JSX.Element | null {
  const { forecast } = useWeatherStore()

  const data = React.useMemo(() => {
    return (forecast as ForecastItem[]).reduce<ForecastData>((acc, next) => {
      const date = new Date(next.dt * 1000)
      return [...acc, { name: date.getHours(), value: getCelcius(next.main.temp) }]
    }, [])
  }, [forecast])

  if (!forecast.length) return null

  return (
    <Stack
      position={['static', 'static', 'absolute']}
      top="0"
      right="0"
      as="aside"
      color="gray.900"
      p={[4, 4, 10]}
      bg="white"
      width={['full', 'full', '25vw']}
      height="full"
      borderRadius="35px"
      boxShadow="2xl"
      zIndex={20}
      spacing="10"
    >
      <AsideBody todaysWeather={forecast[0]} />
      <Stack spacing="0" height="full">
        <Box mt={[0, 'auto']}>
          <Stack mb="5" spacing="none">
            <Text textAlign="center">5 DAYS FORECAST</Text>
            <Text textAlign="center" fontSize="sm">
              (EVERY 3HR)
            </Text>
          </Stack>
          <ForecastChart data={data} />
        </Box>
      </Stack>
    </Stack>
  )
}
