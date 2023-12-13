import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

const singleRecipeUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export const loader = async ({ params }) => {
  const response = await axios.get(`${singleRecipeUrl}${params.id}`);
  return { id: params.id, recipeData: response.data.meals[0] };
};

const Recipe = () => {
  const { id, recipeData } = useLoaderData();
  console.log(recipeData);
  return <div>Recipe</div>;
};
export default Recipe;
