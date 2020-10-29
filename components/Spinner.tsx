import * as React from 'react'
import { Stack, Spinner as BaseSpinner } from '@chakra-ui/core'

export function Spinner(): JSX.Element {
  return (
    <Stack height="100vh" bg="gray.900">
      <BaseSpinner size="xl" mx="auto" my="auto" color="white" />
    </Stack>
  )
}
