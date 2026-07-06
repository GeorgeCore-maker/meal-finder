import { useState, ReactNode } from 'react';
import { LanguageContext, Language } from './contextDefinitions';

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.search.name': 'Name',
    'header.search.ingredient': 'Ingredient',
    'header.search.category': 'Category',
    'header.search.area': 'Area',
    'header.search.placeholder': 'Try "chicken" or "beans"',
    'header.search.button': 'Search',
    'header.language': 'Language',

    // Recipe Modal
    'recipe.ingredients': 'Ingredients',
    'recipe.instructions': 'Instructions',
    'recipe.viewRecipe': 'View Recipe',
    'recipe.noDetails': 'No recipe details available.',

    // Categories
    'categories.title': 'Categories',

    // Common
    'common.loading': 'Loading...',
    'common.noResults': 'No results found',
  },
  es: {
    // Header
    'header.search.name': 'Nombre',
    'header.search.ingredient': 'Ingrediente',
    'header.search.category': 'Categoría',
    'header.search.area': 'Área',
    'header.search.placeholder': 'Intenta con "pollo" o "frijoles"',
    'header.search.button': 'Buscar',
    'header.language': 'Idioma',

    // Recipe Modal
    'recipe.ingredients': 'Ingredientes',
    'recipe.instructions': 'Instrucciones',
    'recipe.viewRecipe': 'Ver Receta',
    'recipe.noDetails': 'No hay detalles de receta disponibles.',

    // Categories
    'categories.title': 'Categorías',

    // Common
    'common.loading': 'Cargando...',
    'common.noResults': 'No se encontraron resultados',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
