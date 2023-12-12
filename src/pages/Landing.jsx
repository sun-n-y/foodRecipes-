import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

const recipeSearchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const loader = async () => {
  const searchTerm = 'pizza';
  const response = await axios.get(`${recipeSearchUrl}${searchTerm}`);
  return { searchTerm, meals: response.data.meals };
};

const Landing = () => {
  const { searchTerm, meals } = useLoaderData();
  console.log(searchTerm, meals);
  return <h1>Landing</h1>;
};
export default Landing;
