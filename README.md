<a name="custom_anchor_name"></a>

# a food recipes app :stuffed_flatbread: :bento: :waffle: :taco: :hamburger:

## Concepts applied but not limited too

- ### vite + react
- ### index css
- ### react router
- ### styled components

---

### _Notes_

- typical html pages

  - every request is going back to the server to grab all resources then full page reload happens
  - not the case for SPA, due to client side routing

- single page application (SPA)

  - operates within a single html page
  - content dynamically updated w/o full page reload
  - provides fast interactions, fluid ux, and smooth transitions between different sections of app
  - Ex. **[My Portfolio](https://sunnykp-portfolio.netlify.app/)**

- react router dom library

  - to create multi-page experiences within SPA
  - facilitates navigation (client side routing) in between components
  - manages rendering of specific content based on current url
  - different components and sections can be accessed and updated dynamically

- react query library

  - caches requests to optimize app performance

- styled components

  - css in js
  - have logic and styles in same component (file)
  - no name collisions

- loader function - fetching data

  - useeffect runs after initial render, so page loads then data is fetched
  - in react router we have a loader function, which provides data to the route element before it renders (pre-fetching)
  - loader function must return something even null, else error
  - common practice is to setup loader in the component thats loading the data
  - can have multiple loaders so use alias

---

### Install

```sh
npm i react-router-dom@6.11.2
```

#### App.jsx

```js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
  },
  {
    path: '/about',
    element: (
      <div>
        <h2>about page</h2>
      </div>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
```

#### pages/index.js

```js
export { default as Landing } from './Landing';
export { default as About } from './About';
export { default as Recipe } from './Cocktail';
export { default as Newsletter } from './Newsletter';
export { default as HomeLayout } from './HomeLayout';
export { default as Error } from './Error';
```

#### Link Component

```js
import { Link } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <h1>HomeLayout</h1>
      {/* internal links */}
      <Link to="/about">About Page</Link>
      {/* external links */}
      <a href="https://www.google.com">Google</a>
    </div>
  );
};

export default HomeLayout;
```

#### Nested Pages

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'Recipe',
        element: <Recipe />,
      },
      {
        path: 'newsletter',
        element: <NewsLetter />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);
```

```js
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <nav>navbar</nav>
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};

export default HomeLayout;
```

#### Nav Link Component

```js
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer>footer</footer>
    </>
  );
};

export default HomeLayout;
```

```js
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <span className="logo">Recipes</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/newsletter" className="nav-link">
            Newsletter
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

---

#### Styled Components

```sh
npm install styled-components
```

Method 1: import it, in the component that will use it

```js
import styled from 'styled-components';

const StyledBtn = styled.button`
  background-color: red;
  color: white;
  font-size: 2rem;
  padding: 1rem;
`;

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <StyledBtn>button</StyledBtn>
        <span className="logo">Recipes</span>
        )
      }
```

Method 2: wrap entire component in SC, then write styles in the same file

```js
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <span className="logo">Recipes</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/newsletter" className="nav-link">
            Newsletter
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: red;
  .logo {
    color: blue;
  }
`;

export default Navbar;
```

tip: create wrappers folder for styles then import into the component and wrap it

tip: outlet component holds all of the pages, so style it to fix layout

#### Error Page

app.jsx

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
```

error component

```js
import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/not-found.svg';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh!</h3>
          <p>The page you are looking for is missing</p>
          <Link to={'/'}>Back Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
```

#### Loader

import in component that loads meals

```js
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
```

import it in app.jsx

```js
import { loader as landingLoader } from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: 'Recipe',
        element: <Recipe />,
      },
```

single error page

```js
import { useRouteError } from 'react-router-dom';

const SinglePageError = () => {
  const error = useRouteError();
  return <h2>{error.message}</h2>;
};

export default SinglePageError;
```

---

[Back to Top](#custom_anchor_name)
