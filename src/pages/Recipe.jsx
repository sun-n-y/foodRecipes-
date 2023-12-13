import axios from 'axios';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

const singleRecipeUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export const loader = async ({ params }) => {
  const { data } = await axios.get(`${singleRecipeUrl}${params.id}`);
  return { id: params.id, data };
};

const Recipe = () => {
  const { id, data } = useLoaderData();

  if (!data?.meals?.[0]) return <Navigate to="/" />;

  const recipeData = data.meals[0];

  const {
    strMeal: name,
    strMealThumb: image,
    strCategory: info,
    strArea: country,
    strInstructions: instruction,
    strTags: tags,
  } = recipeData;

  const ingredients = Object.keys(recipeData)
    .filter((key) => {
      if (key.startsWith('strIngredient') && recipeData[key] !== '') {
        return key;
      }
    })
    .map((item) => {
      return recipeData[item];
    })
    .join(', ');

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="meal">
        <img src={image} alt={name} className="img" />
        <div className="recipe-info">
          <p>
            <span className="meal-data">name :</span>
            {name}
          </p>
          <p>
            <span className="meal-data">info :</span>
            {info}
          </p>
          <p>
            <span className="meal-data">country :</span>
            {country}
          </p>
          {tags ? (
            <p>
              <span className="meal-data">type :</span>
              {tags}
            </p>
          ) : null}

          <p>
            <span className="meal-data">ingredients :</span>
            {ingredients}
          </p>
          <p>
            <span className="meal-data">instructions :</span>
            {instruction}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Recipe;

const Wrapper = styled.div``;
