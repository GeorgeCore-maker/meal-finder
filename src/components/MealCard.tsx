import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Text } from '@chakra-ui/react';
import { Meal } from '../types';

type Props = {
  meal: Meal;
  openRecipe: () => void;
}

function MealCard({ meal, openRecipe }: Props) {
  return (
    <Card boxShadow='lg'>
      <CardBody>
          <Image
            src={meal?.strMealThumb}
            alt={meal?.strMeal}
            borderRadius='lg'
          />
          <Heading size='md' color='blue.400'>
            <Text mt="4">{meal?.strMeal}</Text>
          </Heading>
          <Text color='blue.600' fontSize='2xl'>
            {meal?.strArea} - {meal?.strCountry}
          </Text>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button onClick={openRecipe} variant='solid' color="white" bg="blue.400" _hover={{ bg: 'blue.500' }}>
              Ver Receta
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
  )
}

export default MealCard