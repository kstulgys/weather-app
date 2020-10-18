import React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/core'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
