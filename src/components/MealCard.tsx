import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Text } from '@chakra-ui/react';
import { Meal } from '../types';
import { useLanguage } from '../contexts/useLanguage';
import { useEffect, useState } from 'react';
import { translationService } from '../services/translationService';

type Props = {
  meal: Meal;
  openRecipe: () => void;
}

function MealCard({ meal, openRecipe }: Props) {
  const { language, t } = useLanguage();
  const [translatedMeal, setTranslatedMeal] = useState(meal?.strMeal || '');
  const [translatedArea, setTranslatedArea] = useState(meal?.strArea || '');

  useEffect(() => {
    const translateMeal = async () => {
      if (!meal) return;
      
      const mealName = meal.strMeal ? await translationService.translate(meal.strMeal, language) : '';
      const areaName = meal.strArea ? await translationService.translate(meal.strArea, language) : '';
      
      setTranslatedMeal(mealName);
      setTranslatedArea(areaName);
    };
    translateMeal();
  }, [meal, language]);

  if (!meal) return null;

  return (
    <Card boxShadow='lg'>
      <CardBody>
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            borderRadius='lg'
          />
          <Heading size='md' color='blue.400'>
            <Text mt="4">{translatedMeal}</Text>
          </Heading>
          <Text color='blue.600' fontSize='2xl'>
            {translatedArea} {meal.strCountry && `- ${meal.strCountry}`}
          </Text>
        </CardBody>
        <Divider />
        <CardFooter justifyContent="center">
          <ButtonGroup spacing='2'>
            <Button  justifySelf='flex-end' onClick={openRecipe} variant='solid' color="white" bg="blue.400" _hover={{ bg: 'blue.600' }}>
              {t('recipe.viewRecipe')}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
  )
}

export default MealCard