import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

const singleRecipeUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const singleMealQuery = (id) => {
  return {
    queryKey: ['meal', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleRecipeUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    await queryClient.ensureQueryData(singleMealQuery(params.id));
    return { id: params.id };
  };

const Recipe = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleMealQuery(id));

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
        <div className="meal-info">
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

const Wrapper = styled.div`
  header {
    text-align: center;
    margin-bottom: 3rem;
    .btn {
      margin-bottom: 1rem;
    }
  }

  .img {
    border-radius: var(--borderRadius);
  }

  .meal-info {
    padding-top: 2rem;
  }

  .meal p {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 2;
    margin-bottom: 1rem;
  }

  span {
    margin-right: 1rem;
  }

  .meal-data {
    margin-right: auto.5rem;
    background: var(--primary-300);
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
    color: var(--primary-700);
    letter-spacing: var(--letterSpacing);
  }

  @media (min-width: 992px) {
    .meal {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 3rem;
    }
    .meal-info {
      padding-top: 0;
    }
  }
`;
