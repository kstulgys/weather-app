import * as React from 'react'
import { Box, Text, InputGroup, Input, InputRightElement, Icon } from '@chakra-ui/core'
import { FiSearch } from 'react-icons/fi'
import { useWeatherStore } from '../shared/hooks/useWeatherStore'

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
