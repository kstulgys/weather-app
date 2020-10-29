import * as React from 'react'
import { Stack, Text } from '@chakra-ui/core'

interface SomethingWentWrongProps {
  error?: any
  errorInfo?: any
}

export function SomethingWentWrong({ error, errorInfo }: SomethingWentWrongProps): JSX.Element {
  return (
    <Stack>
      <Text mt="20" fontSize="lg" fontWeight="semibold" textAlign="center">
        Sorry something went wrong, please try again later
      </Text>
    </Stack>
  )
}
