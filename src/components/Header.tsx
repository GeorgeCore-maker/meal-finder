import { Button, Container, Flex, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa'
import { SearchForm } from "../types";
import { useLanguage } from '../contexts/LanguageContext';

type Props = {
  onsubmit: (data: SearchForm) => void;
}

function Header({ onsubmit }: Props) {
  const { register, formState, handleSubmit } = useForm<SearchForm>({ defaultValues: { searchType: 'name' } });
  const { language, setLanguage, t } = useLanguage();

  return (
    <Container mt="2" maxW="full" px={4}>
      <Flex justifyContent="space-between" alignItems="center" gap={4}>
        <form onSubmit={handleSubmit(onsubmit)} style={{ flex: 1, maxWidth: '900px' }}>
          <Flex gap={2}>
            <Select width="130px" {...register("searchType")}>
              <option value="name">{t('header.search.name')}</option>
              <option value="ingredient">{t('header.search.ingredient')}</option>
              <option value="category">{t('header.search.category')}</option>
              <option value="area">{t('header.search.area')}</option>
            </Select>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents='none'>
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                focusBorderColor={formState.errors.search ? "red.500" : "blue.500"}
                isInvalid={!!formState.errors.search}
                {...register("search", { required: true })}
                type='text' placeholder={t('header.search.placeholder')} />
            </InputGroup>
            <Button type='submit' colorScheme='blue' isLoading={formState.isSubmitting}>
              {t('header.search.button')}
            </Button>
          </Flex>
        </form>
        
        <Select 
          width="100px" 
          value={language} 
          onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
          flexShrink={0}
        >
          <option value="es">🇪🇸 ES</option>
          <option value="en">🇬🇧 EN</option>
        </Select>
      </Flex>
    </Container>

  )
}

export default Header