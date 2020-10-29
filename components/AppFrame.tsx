import * as React from 'react'
import { Stack } from '@chakra-ui/core'

interface AppFrameProps {
  children: React.ReactNode
}

export function AppFrame({ children }: AppFrameProps): JSX.Element {
  return (
    <Stack
      spacing={0}
      position="relative"
      top="0"
      left="0"
      width="100vw"
      height={['full', '100vh']}
      border="5px solid"
      borderRadius="40px"
      borderColor="gray.900"
      overflow="hidden"
    >
      {children}
    </Stack>
  )
}
