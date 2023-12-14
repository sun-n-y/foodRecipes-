import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import SearchForm from '../components/SearchForm';
import { useQuery } from '@tanstack/react-query';

const recipeSearchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const searchMealsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios.get(`${recipeSearchUrl}${searchTerm}`);
      return response.data.meals;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';
    await queryClient.ensureQueryData(searchMealsQuery(searchTerm));
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: meals } = useQuery(searchMealsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <RecipeList meals={meals} />
    </>
  );
};

export default Landing;
