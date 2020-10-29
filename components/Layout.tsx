import * as React from 'react'
import { Stack } from '@chakra-ui/core'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Stack spacing={0} bg="gray.900" minHeight={['full', 'full', '100vh']} width="100vw" fontFamily="Montserrat">
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </Stack>
  )
}
