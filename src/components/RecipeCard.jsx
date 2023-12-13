import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RecipeCard = ({ image, name, id, info, country }) => {
  return (
    <Wrapper>
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <div className="footer">
        <h4>{name}</h4>
        <h5>{country}</h5>
        <p>{info}</p>
        <Link to={`/recipe/${id}`} className="btn">
          details
        </Link>
      </div>
    </Wrapper>
  );
};

export default RecipeCard;

const Wrapper = styled.div``;
