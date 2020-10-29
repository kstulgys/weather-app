import * as React from 'react'
import { Box, Stack, Text, Divider } from '@chakra-ui/core'
import { getCelcius } from '../utils'
import { useWeatherStore } from '../shared/hooks/useWeatherStore'

export function Content(): JSX.Element {
  const { cityName, forecast } = useWeatherStore()

  const date = new Date()
  const currentTime = new Intl.DateTimeFormat('en-GB').format(date)

  const getCurrentTemperature = React.useCallback(() => {
    return forecast?.length ? getCelcius(forecast[0].main.temp) : ''
  }, [forecast])

  return (
    <Stack height="full" color="white">
      <Stack mt="auto" fontWeight="medium">
        <Box>
          <Text lineHeight="none" fontSize="200px">
            {getCurrentTemperature()}
          </Text>
        </Box>
        <Divider orientation="horizontal" borderColor="white" mb="8" pt="8" />
        <Stack isInline justifyContent="space-between">
          <Box>
            <Text lineHeight="none" fontSize="2xl">
              {currentTime}
            </Text>
          </Box>
          <Box alignSelf="flex-end">
            <Text lineHeight="none" fontSize="2xl">
              {cityName}
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}
