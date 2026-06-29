import { ModalBody, ModalCloseButton, ModalHeader, Image, Heading, Text, OrderedList, ListItem } from '@chakra-ui/react';
import { MealDetails } from '../types';

type Props = {
    data: MealDetails | null;
}

const joinIngredients = (data: MealDetails) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];
        if (ingredient !== '' && ingredient !== null) {
            ingredients.push(`${ingredient} (${measure})`);
        }
    }
    return ingredients;
};

function RecipeModalContent({ data }: Props) {
    const ingredients = joinIngredients(data || {});
    return (
        <div>
            {data ? (
                <>
                    <ModalHeader>{data.strMeal}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image width="100%" borderRadius="md" src={data.strMealThumb} alt={data.strMeal} />
                        <Heading mt="4" mb="4">Ingredientes</Heading>
                        <OrderedList>
                            {ingredients.map((ingredient, index) => (
                                <ListItem key={index}>{ingredient}</ListItem>
                            ))}
                        </OrderedList>
                        <Text mt="4" whiteSpace={'pre-line'}>{data.strInstructions}</Text>
                        </ModalBody>
                </>
            ) : (
                <p>No recipe details available.</p>
            )}
        </div>
    )
}

export default RecipeModalContent