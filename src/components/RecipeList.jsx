import styled from 'styled-components';
import RecipeCard from '../components/RecipeCard';

const RecipeList = ({ meals }) => {
  if (!meals) {
    return <h4 style={{ textAlign: 'center' }}>No recipes found</h4>;
  }

  const formattedRecipes = meals.map((item) => {
    const {
      idMeal: id,
      strMeal: name,
      strMealThumb: image,
      strCategory: info,
      strArea: country,
    } = item;
    return { id, name, image, info, country };
  });

  return (
    <Wrapper>
      {formattedRecipes.map((item) => {
        return <RecipeCard key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};

export default RecipeList;

const Wrapper = styled.div``;
