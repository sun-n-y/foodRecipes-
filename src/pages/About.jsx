import styled from 'styled-components';

const About = () => {
  return (
    <Wrapper>
      <h3>About Us</h3>
      <p>
        Introducing "Recipes" App, a cooks ultimate sidekick app that fetches
        recipes from the famous Recipes DB API. With a flick of your finger,
        you'll unlock a treasure trove of enchanting food recipes that'll make
        your taste buds dance and your friends jump with joy. Get ready to shake
        up your culinary game, one fantastical meal at a time, and let the
        laughter and giggles flow!
      </p>
    </Wrapper>
  );
};
export default About;

const Wrapper = styled.div`
  h3 {
    color: rebeccapurple;
  }
  p {
    line-height: 2;
    color: var(--grey-500);
    margin-top: 2rem;
  }
`;
