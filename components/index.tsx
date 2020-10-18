import * as React from 'react'
import {
  Box,
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Spinner as BaseSpinner,
  Divider,
} from '@chakra-ui/core'
import Head from 'next/head'
import { FiSearch } from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { getCelcius } from '../utils'
import { useWeatherStore, ForecastItem } from '../shared/hooks/useWeatherStore'

export function Spinner(): JSX.Element {
  return (
    <Stack height="100vh" bg="gray.900">
      <BaseSpinner size="xl" mx="auto" my="auto" color="white" />
    </Stack>
  )
}

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

export function SearchInput(): JSX.Element {
  const { cityName, getWeather, error } = useWeatherStore()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  return (
    <Box ml={[0, 0, 'auto']} as="form" onSubmit={handleSubmit}>
      <InputGroup color="white">
        <Input
          fontWeight="semibold"
          defaultValue={cityName}
          rounded="none"
          placeholder="Search city..."
          border="none"
          borderBottom="2px solid"
          height="45px"
          _hover={{
            borderColor: 'white',
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement>
          <Icon as={FiSearch} fontSize="30px" />
        </InputRightElement>
      </InputGroup>
      <Text>{error}</Text>
    </Box>
  )
}

interface VideoBackgroundProps {
  src?: string
}

export function VideoBackground({ src = '/bg_videos/video.mp4' }: VideoBackgroundProps): JSX.Element {
  return (
    <Box
      as="video"
      autoPlay
      muted
      loop
      position="absolute"
      top="0"
      left="0"
      width="full"
      height="full"
      objectFit="cover"
    >
      <source src={src} type="video/mp4" />
    </Box>
  )
}

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

interface AsideBodyProps {
  todaysWeather: ForecastItem
}

function AsideBody({ todaysWeather }: AsideBodyProps): JSX.Element {
  const { weather, main, wind } = todaysWeather

  return (
    <>
      <Box mt="3">
        <Text>{weather[0].description}</Text>
      </Box>
      <Box>
        <Text>Feels like: {getCelcius(main.feels_like)}</Text>
      </Box>
      <Box>
        <Text>Humidity: {main.humidity}</Text>
      </Box>
      <Box mb="10">
        <Text>Wind: {wind.speed}</Text>
      </Box>
    </>
  )
}

interface ForecastChart {
  data: ForecastData
}

function ForecastChart({ data }: ForecastChart): JSX.Element {
  return (
    <ResponsiveContainer height={200}>
      <LineChart data={data}>
        <Tooltip />
        <YAxis width={20} dataKey="value" domain={[0, 'dataMax']}></YAxis>
        <XAxis type="category" dataKey="name" domain={['dataMin', 'dataMax']} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

interface Props {
  children: React.ReactNode
  render(props: { error: any; errorInfo: any }): JSX.Element
}

interface State {
  hasError: boolean
  error: any
  errorInfo: any
}

declare global {
  interface Window {
    Bugsnag: any
  }
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo })
    console.log({ error })
    console.log({ errorInfo })
    // mybe report error to some stability monitoring platform like Bugsnag
    if (window.Bugsnag) {
      window.Bugsnag.notify(error)
    }
  }

  public render() {
    const { error, errorInfo } = this.state
    if (this.state.hasError) return this.props.render({ error, errorInfo })
    return this.props.children
  }
}

export function SomethingWentWrong({ error, errorInfo }: any): JSX.Element {
  return (
    <Stack>
      <Text mt="20" fontSize="lg" fontWeight="semibold" textAlign="center">
        Sorry something went wrong, please try again later
      </Text>
    </Stack>
  )
}
