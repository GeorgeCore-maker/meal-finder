import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";
import { Category } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState } from "react";
import { translationService } from "../services/translationService";

type Props = {
    categories: Category[];
    loading: boolean;
    selectedCategory: Category;
    setSelectedCategory: (category: Category) => void;
}

const selectedProps = {
    bgColor: "blue.400",
    color: "white",
    fontWeight: "bold"
}

function SideNav({ categories, loading, selectedCategory, setSelectedCategory }: Props) {
    const { language, t } = useLanguage();
    const [translatedCategories, setTranslatedCategories] = useState<Record<string, string>>({});

    useEffect(() => {
        const translateCategories = async () => {
            const translations: Record<string, string> = {};
            for (const category of categories) {
                if (category.strCategory) {
                    const translated = await translationService.translate(category.strCategory, language);
                    translations[category.strCategory] = translated;
                }
            }
            setTranslatedCategories(translations);
        };

        if (categories.length > 0) {
            translateCategories();
        }
    }, [categories, language]);

    return loading ? (
        <SkeletonText mt='1' noOfLines={8} spacing='6' skeletonHeight='2' />
    ) : (
        <>
            <Heading color="blue.400" fontSize={14} fontWeight="bold" mb={4}>
                {t('categories.title').toUpperCase()}
            </Heading>

            <VStack
                spacing={2}
                align='stretch'
            >
                {categories.map((category) => (
                    <Link
                        onClick={() => setSelectedCategory(category)}
                        px={2}
                        py={1}
                        borderRadius={5}
                        key={category.strCategory}
                        _hover={{ textDecoration: 'none' }}
                        {...(selectedCategory.strCategory === category.strCategory ? selectedProps : {})}
                    >
                        {translatedCategories[category.strCategory] || category.strCategory}
                    </Link>
                ))}
            </VStack>
        </>
    )
}

export default SideNav