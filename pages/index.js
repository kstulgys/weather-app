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

function IndexPage() {
  return (
    <Layout>
      <AppFrame>
        <VideoBackground>
          <Stack p="10" flex="1">
            <SearchInput />
            <Content />
          </Stack>
          <Box width="25vw" display={["none", "none", "block"]} />
        </VideoBackground>
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

function Content(props) {
  return (
    <Stack height="full">
      <Box mt="auto" width="full">
        <Text fontSize="6xl">14</Text>
      </Box>
    </Stack>
  );
}

function SearchInput(props) {
  return (
    <Box ml="auto">
      <InputGroup color="white">
        <Input
          rounded="none"
          placeholder="Search city..."
          border="none"
          borderBottom="1px solid"
          height="45px"
        />
        <InputRightElement children={<Icon as={FiSearch} fontSize="30px" />} />
      </InputGroup>
    </Box>
  );
}

function VideoBackground({ children, src = "" }) {
  return (
    <Stack
      as="video"
      autoPlay
      muted
      loop
      id="myVideo"
      flexDir={["column", "column", "row"]}
      spacing={0}
      position={["static", "static", "absolute"]}
      top="0"
      left="0"
      width="full"
      height={["60vh", "60vh", "full"]}
      mb={["-35px", "-35px", 0]}
    >
      <source src={src} type="video/mp4" />
      {children}
    </Stack>
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
