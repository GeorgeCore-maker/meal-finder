import { Grid, GridItem, useDisclosure } from "@chakra-ui/react"
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import SideNav from "./components/SideNav"
import { useState } from "react";
import { Category, Meal, MealDetails, SearchForm } from "./types";
import useHttpData from "./hooks/UseHttpData";
import axios from "axios";
import RecipeModal from './components/RecipeModal';
import useFetch from "./hooks/UseFetch";


const baseUrl = "https://www.themealdb.com/api/json/v1/1";
const url = `${baseUrl}/list.php?c=list`;
const makeMealUrl = (category: Category) => `${baseUrl}/filter.php?c=${category.strCategory}`;
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<Category>({ strCategory: 'Beef' });
  const { loading, data } = useHttpData<Category>(url);
  const { loading: loadingMeal, data: dataMeal, setData: setMeal, setLoading: setLoadingMeal } = useHttpData<Meal>(makeMealUrl(selectedCategory));

  const searchApi = (searchForm: SearchForm) => {
    const endpoints: Record<SearchForm['searchType'], string> = {
      name: `${baseUrl}/search.php?s=${searchForm.search}`,
      ingredient: `${baseUrl}/filter.php?i=${searchForm.search}`,
      category: `${baseUrl}/filter.php?c=${searchForm.search}`,
      area: `${baseUrl}/filter.php?a=${searchForm.search}`,
    };
    const url = endpoints[searchForm.searchType];
    setLoadingMeal(true);
    axios
      .get<{ meals: Meal[] }>(url)
      .then(({ data }) => {
        setMeal(data.meals ?? []);
      })
      .finally(() => {
        setLoadingMeal(false);
      });
  };

  const { fetch, loading: loadingMealDetails, data: mealDetailsData } = useFetch<MealDetails>();
  const searchMealDetails = (meal: Meal) => {
    onOpen();
    fetch(`${baseUrl}/lookup.php?i=${meal.idMeal}`);
  };
  return (
    <>
      <Grid
        templateAreas={`"header header" "nav main"`}
        gridTemplateRows={'60px 1fr'}
        gridTemplateColumns={{ sm: '0 1fr', md: '250px 1fr' }}
        fontSize={14}
      >
        <GridItem zIndex="1" pos="sticky" top="0" pt='7px' boxShadow='lg' bg='white' area={'header'}>
          <Header onsubmit={searchApi} />
        </GridItem>
        <GridItem pos="sticky" top="60px" left="0" p='5' area={'nav'} height="calc(100vh - 60px)" overflowY="auto">
          <SideNav
            categories={data}
            loading={loading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory} />
        </GridItem>
        <GridItem pl='2' bg='gray.100' area={'main'}>
          <MainContent
            openRecipe={searchMealDetails}
            loading={loadingMeal}
            meals={dataMeal} />
        </GridItem>
      </Grid>
      <RecipeModal
        isOpen={isOpen}
        onClose={onClose}
        loading={loadingMealDetails}
        data={mealDetailsData ?? null}
      />
    </>
  )
}

export default App
