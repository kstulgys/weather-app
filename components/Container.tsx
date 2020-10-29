import * as React from 'react'
import { Stack } from '@chakra-ui/core'

interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps): JSX.Element {
  return (
    <Stack p="10" zIndex={10} mr={[0, 0, '25vw']} height="full">
      {children}
    </Stack>
  )
}
