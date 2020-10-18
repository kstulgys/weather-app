import React from 'react'
import { useWeatherStore } from '../shared/hooks/useWeatherStore'
import {
  Layout,
  AppFrame,
  VideoBackground,
  SearchInput,
  Content,
  Aside,
  Container,
  Spinner,
  ErrorBoundary,
  SomethingWentWrong,
} from '../components'

function IndexPage(): JSX.Element {
  const { getInitialWeather, isLoading } = useWeatherStore()

  React.useEffect(() => {
    getInitialWeather()
  }, [])

  if (isLoading) return <Spinner />

  return (
    <ErrorBoundary render={(props) => <SomethingWentWrong {...props} />}>
      <Layout>
        <AppFrame>
          <VideoBackground />
          <Container>
            <SearchInput />
            <Content />
          </Container>
          <Aside />
        </AppFrame>
      </Layout>
    </ErrorBoundary>
  )
}

export default IndexPage
