import { SimpleGrid } from '@chakra-ui/react';
import { Meal } from '../types';
import MealCard from './MealCard';
import SkeletonCard from './SkeletonCard';

type Props = {
  loading: boolean;
  meals: Meal[];
  openRecipe: (meal: Meal) => void;
}

function MainContent({ loading, meals, openRecipe }: Props) {
  const skeletons = Array.from({ length: 8 });
  return (
    <SimpleGrid columns={[2, 3, 4]} spacing='40px' p={4}>
      {loading && skeletons.map((_, index) => <SkeletonCard key={index}/>)}
      {meals.map(m => (
        <MealCard openRecipe={() => openRecipe(m)} key={m.idMeal} meal={m} />
      ))}

    </SimpleGrid>

  )
    
}

export default MainContent