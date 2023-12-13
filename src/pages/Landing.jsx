import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import RecipeList from '../components/RecipeList';

const recipeSearchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const loader = async () => {
  const searchTerm = '';
  const response = await axios.get(`${recipeSearchUrl}${searchTerm}`);
  return { searchTerm, meals: response.data.meals };
};

const Landing = () => {
  const { searchTerm, meals } = useLoaderData();

  return (
    <>
      <RecipeList meals={meals} />
    </>
  );
};

export default Landing;
