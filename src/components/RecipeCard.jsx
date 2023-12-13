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

const Wrapper = styled.article`
  background: var(--white);
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: var(--borderRadius);

  :hover {
    box-shadow: var(--shadow-4);
  }

  img {
    height: 15rem;
    border-top-left-radius: var(--borderRadius);
    border-top-right-radius: var(--borderRadius);
  }

  .footer {
    padding: 1.5rem;
    h4,
    h5 {
      margin-bottom: 0.5rem;
    }

    h4 {
      font-weight: 700;
    }

    p {
      margin-bottom: 1rem;
      color: var(--grey-500);
    }
  }
`;
