export type Category = {
    strCategory: string;
}

export type Meal = {
    strMeal: string,
    strMealThumb: string,
    idMeal: string,
    strArea: string,
    strCountry: string
}

export type SearchForm = {
  search: string;
  searchType: 'name' | 'ingredient' | 'category' | 'area';
}

export type MealDetails = {
    [key: string]: string;
}