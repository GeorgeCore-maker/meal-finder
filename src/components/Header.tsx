import { Button, Container, Flex, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa'
import { SearchForm } from "../types";

type Props = {
  onsubmit: (data: SearchForm) => void;
}

function Header({ onsubmit }: Props) {
  const { register, formState, handleSubmit } = useForm<SearchForm>({ defaultValues: { searchType: 'name' } });
  return (
    <Container mt="2" maxW="3xl">
      <form onSubmit={handleSubmit(onsubmit)}>
        <Flex gap={2}>
          <Select width="130px" {...register("searchType")}>
            <option value="name">Nombre</option>
            <option value="ingredient">Ingrediente</option>
            <option value="category">Categoría</option>
            <option value="area">Área</option>
          </Select>
          <InputGroup flex={1}>
            <InputLeftElement pointerEvents='none'>
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              focusBorderColor={formState.errors.search ? "red.500" : "blue.500"}
              isInvalid={!!formState.errors.search}
              {...register("search", { required: true })}
              type='text' placeholder='Intenta con "chicken" o "beans"' />
          </InputGroup>
          <Button type='submit' colorScheme='blue' isLoading={formState.isSubmitting}>
            Buscar
          </Button>
        </Flex>
      </form>
    </Container>

  )
}

export default Header