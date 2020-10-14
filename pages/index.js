import {
  Box,
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Spinner,
  Divider
} from "@chakra-ui/core";
import { FiSearch } from "react-icons/fi";
import Head from "next/head";
import create from "zustand";
import axios from "axios";
import React from "react";
import { fetchWeather, fetchInitialWeather } from "../api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Label } from 'recharts';

const useWeatherStore = create((set, get) => ({
  // state
  forecast: undefined,
  current: undefined,
  timezone: undefined,
  searchTerm: '',
  cityName: '',
  isLoading: true,
  error: '',

  // actions
  getWeather: async (query) => {
    const { cityName, current, forecast, timezone, error } = await fetchWeather(query)
    if (error) return set({ error, isLoading: false });
    set({ timezone, current, forecast, cityName, error: '', isLoading: false });
  },
  getInitialWeather: async () => {
    const { current, forecast, cityName, timezone, error } = await fetchInitialWeather()
    if (error) return set({ error, isLoading: false });
    set({ timezone, current, forecast, cityName, error: '', isLoading: false });
  },
}));

function IndexPage() {
  const { getInitialWeather, isLoading } = useWeatherStore(store => store);

  React.useEffect(() => {
    getInitialWeather()
  }, []);

  if (isLoading) {
    return (
      <Stack height='100vh' bg='gray.900'>
        <Spinner size="xl" mx='auto' my='auto' color='white' />
      </Stack>)
  }

  return (
    <Layout>
      <AppFrame>
        <VideoBackground />
        <Stack p="10" zIndex={10} mr={[0, 0, "25vw"]} height="full">
          <SearchInput />
          <Content />
        </Stack>
        <Aside />
      </AppFrame>
    </Layout>
  );
}

export default IndexPage;

function Layout({ children }) {
  return (
    <Stack
      spacing={0}
      bg="gray.900"
      minHeight={["full", "full", "100vh"]}
      width="100vw"
      fontFamily="Montserrat"
    >
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
  );
}

function Content() {
  const { cityName, current, timezone } = useWeatherStore();
  const currentDate = new Date();


  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const currentTime = new Date().toLocaleString("en-US", { timeZone })
  // const currentTime = new Intl.DateTimeFormat([], { timeZone: timezone });

  return (
    <Stack height="full" color="white">
      <Stack mt="auto" fontWeight="medium">
        <Box>
          <Text lineHeight="none" fontSize="200px">
            {Math.round(current[0].main.temp - 273.15)}
          </Text>
        </Box>
        <Divider orientation="horizontal" borderColor='white' mb='8' pt='8' />
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
  );
}

function SearchInput() {
  const { cityName, getWeather, error } = useWeatherStore();
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  return (
    <Box ml={[0, 0, "auto"]} as='form' onSubmit={handleSubmit}>
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
            borderColor: "gray.900"
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement children={<Icon as={FiSearch} fontSize="30px" />} />
      </InputGroup>
      <Text>
        {error}
      </Text>
    </Box>
  );
}

function VideoBackground({ children, src = "/bg_videos/video.mp4" }) {
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
      height={["full"]}
      objectFit="cover"
    >
      <source src={src} type="video/mp4" />
      {children}
    </Box>
  );
}

function AppFrame(props) {
  return (
    <Stack
      spacing={0}
      position="relative"
      top="0"
      left="0"
      width="100vw"
      height={['full', "100vh"]}
      border="5px solid"
      borderRadius="40px"
      borderColor="gray.900"
      overflow="hidden"
      {...props}
    />
  );
}

function Aside() {
  const { current } = useWeatherStore();
  console.log({ current })

  const data = React.useMemo(() => current.reduce((acc, next) => {
    const date = new Date(next.dt * 1000)
    return [...acc, { name: date.getHours(), value: getCelcius(next.main.temp) }]
  }, []), [current])

  return (
    <Stack
      position={["static", "static", "absolute"]}
      top="0"
      right="0"
      as="aside"
      color="gray.900"
      p={[4, 4, 10]}
      bg="white"
      width={["full", "full", "25vw"]}
      height="full"
      borderRadius="35px"
      boxShadow="2xl"
      zIndex={20}
      spacing='10'
    >
      <Box mt='3'>
        <Text>{current[0].weather[0].description}</Text>
      </Box>
      <Box >
        <Text>Feels like: {getCelcius(current[0].main.feels_like)}</Text>
      </Box>
      <Box >
        <Text>Humidity: {current[0].main.humidity}</Text>
      </Box>
      <Box mb='10'>
        <Text>Wind: {current[0].wind.speed}</Text>
      </Box>
      <Stack spacing='0' height='full'>
        <Box mt={[0, 'auto']}>
          <ResponsiveContainer height={200}>
            <LineChart data={data}>
              <Tooltip />
              <YAxis width={20} dataKey='value' domain={['auto', 'dataMax']}>
              </YAxis>
              <XAxis dataKey='name' domain={['auto', 'dataMax']}>
                <Label value="(hr)" offset={0} position="insideBottom" />
              </XAxis>
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart >
          </ResponsiveContainer >
        </Box>
      </Stack >
    </Stack >
  );
}


function getCelcius(kelvin) {
  return Math.round(kelvin - 273.15)
}
