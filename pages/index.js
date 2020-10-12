import {
  Box,
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon
} from "@chakra-ui/core";
import { FiSearch } from "react-icons/fi";
import Head from "next/head";
import create from 'zustand'
import axios from "axios";

const useStore = create((set, get) => ({
  data: undefined,
  getTemperatureData: async () => {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=vilnius&appid=d3b219ab4ac3dde97f442a50f5d3c607')
    console.log({ data })
    set({ data })
  }
}))


function IndexPage() {
  const { getTemperatureData } = useStore()
  React.useEffect(() => {
    getTemperatureData()
  }, [])

  return (
    <Layout>
      <AppFrame>
        <VideoBackground />
        <Stack p="10" zIndex={10} mr='25vw' height='full'>
          <SearchInput />
          <Content />
        </Stack>
        <Aside />
      </AppFrame>
    </Layout >
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
  const { data } = useStore()
  if (!data) return null
  const currentDate = new Date()
  return (
    <Stack height="full">
      <Stack mt='auto' fontWeight='medium'>
        <Box>
          <Text lineHeight='none' fontSize="200px">{(data.main.temp - 273.15).toFixed(0)}</Text>
        </Box>
        <Stack isInline justifyContent='space-between'>
          <Box>
            <Text lineHeight='none' fontSize="2xl">{currentDate.toISOString()}</Text>
          </Box>
          <Box alignSelf='flex-end'>
            <Text lineHeight='none' fontSize="2xl">{data.name}</Text>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

function SearchInput(props) {
  const { data } = useStore()
  if (!data) return null

  return (
    <Box ml="auto">
      <InputGroup color="gray.900">
        <Input
          fontWeight='semibold'
          defaultValue={data.name}
          rounded="none"
          // placeholder="Search city..."
          border="none"
          borderBottom="2px solid"
          height="45px"
          _hover={{
            borderColor: 'gray.900'
          }}
        />
        <InputRightElement children={<Icon as={FiSearch} fontSize="30px" />} />
      </InputGroup>
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
      position={["static", "static", "absolute"]}
      top="0"
      left="0"
      width="full"
      height={["60vh", "60vh", "full"]}
      mb={["-35px", "-35px", 0]}
      objectFit='cover'
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
      height="100vh"
      border="5px solid"
      borderRadius="40px"
      borderColor="gray.900"
      overflow="hidden"
      {...props}
    />
  );
}

function Aside() {
  return (
    <Stack
      position={["static", "static", "absolute"]}
      top="0"
      right="0"
      as="aside"
      color="gray.900"
      p="10"
      bg="white"
      width={["full", "full", "25vw"]}
      height="full"
      borderRadius="35px"
      boxShadow="2xl"
      zIndex={20}
    >
      <Box>
        <Text>Hello</Text>
      </Box>
    </Stack>
  );
}


// const [src, setSrc] = React.useState(null)
// const [searchTerm, setSearchTerm] = React.useState('')

// React.useEffect(() => {
//   const query = 'thunderstorm with light rain'
//   axios.get('https://api.openweathermap.org/data/2.5/weather?q=vilnius&appid=d3b219ab4ac3dde97f442a50f5d3c607').then(console.log)
// }, [])