import { ModalBody, ModalCloseButton, ModalHeader, Image, Heading, Text, OrderedList, ListItem, Spinner, Box } from '@chakra-ui/react';
import { MealDetails } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { translationService } from '../services/translationService';

type Props = {
    data: MealDetails | null;
}

const joinIngredients = (data: MealDetails) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '' && ingredient !== null) {
            ingredients.push({ ingredient, measure: measure || '' });
        }
    }
    return ingredients;
};

function RecipeModalContent({ data }: Props) {
    const { language, t } = useLanguage();
    const [translatedMealName, setTranslatedMealName] = useState('');
    const [translatedIngredients, setTranslatedIngredients] = useState<Array<{ ingredient: string, measure: string }>>([]);
    const [translatedInstructions, setTranslatedInstructions] = useState('');
    const [isTranslatingInstructions, setIsTranslatingInstructions] = useState(false);

    useEffect(() => {
        const translateContent = async () => {
            if (!data) {
                setTranslatedMealName('');
                setTranslatedIngredients([]);
                setTranslatedInstructions('');
                setIsTranslatingInstructions(false);
                return;
            }

            // Traducir nombre de la comida
            const mealName = data.strMeal ? await translationService.translate(data.strMeal, language) : '';
            setTranslatedMealName(mealName);

            // Traducir ingredientes
            const ingredients = joinIngredients(data);
            const translated = await Promise.all(
                ingredients.map(async ({ ingredient, measure }) => {
                    const translatedIng = ingredient ? await translationService.translate(ingredient, language) : ingredient;
                    const translatedMeas = measure ? await translationService.translate(measure, language) : measure;
                    return {
                        ingredient: translatedIng,
                        measure: translatedMeas,
                    };
                })
            );
            setTranslatedIngredients(translated);

            // Traducir instrucciones usando la API
            const instructions = data.strInstructions || '';
            if (language === 'es' && instructions) {
                setIsTranslatingInstructions(true);
                try {
                    const translatedInst = await translationService.translateInstruction(instructions, language);
                    setTranslatedInstructions(translatedInst);
                } catch (error) {
                    console.error('Error traduciendo instrucciones:', error);
                    setTranslatedInstructions(instructions);
                } finally {
                    setIsTranslatingInstructions(false);
                }
            } else {
                setTranslatedInstructions(instructions);
                setIsTranslatingInstructions(false);
            }
        };

        translateContent();
    }, [data, language]);

    return (
        <div>
            {data ? (
                <>
                    <ModalHeader>{translatedMealName || data.strMeal}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Image width="100%" borderRadius="md" src={data.strMealThumb} alt={data.strMeal} />
                        <Heading mt="4" mb="4">{t('recipe.ingredients')}</Heading>
                        <OrderedList>
                            {translatedIngredients.length > 0 ? (
                                translatedIngredients.map(({ ingredient, measure }, index) => (
                                    <ListItem key={index}>
                                        {ingredient}{measure && ` (${measure})`}
                                    </ListItem>
                                ))
                            ) : (
                                <ListItem>{t('common.loading')}</ListItem>
                            )}
                        </OrderedList>
                        <Heading mt="4" mb="4">{t('recipe.instructions')}</Heading>
                        {isTranslatingInstructions ? (
                            <Box display="flex" alignItems="center" gap={2} mt={4}>
                                <Spinner size="sm" />
                                <Text color="gray.500">{t('common.loading')}</Text>
                            </Box>
                        ) : (
                            <Text mt="4" whiteSpace={'pre-line'}>{translatedInstructions}</Text>
                        )}
                    </ModalBody>
                </>
            ) : (
                <p>{t('recipe.noDetails')}</p>
            )}
        </div>
    )
}

export default RecipeModalContent