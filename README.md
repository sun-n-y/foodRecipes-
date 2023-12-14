<a name="custom_anchor_name"></a>

# a food recipes app :stuffed_flatbread: :bento: :waffle: :taco: :hamburger:

## Concepts applied but not limited too

- ### vite + react
- ### react router
- ### styled components
- ### form submission
- ### react query

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
  - link
    - navigate within app
  - outlet
    - where all of our pages are
  - navigate
    - navigate user to different page
  - redirect
    - navigate user to different page, to be used in actions and loaders.
  - loader function - fetching data
    - useEffect runs after initial render, so page loads then data is fetched
    - in react router we have a loader function, which provides data to the route element before it renders (pre-fetching)
    - loader function must return something even null, else error
    - common practice is to setup loader in the component thats loading the data
    - can have multiple loaders so use alias
    - loader fx has an object with useful data like params, request
  - useNavigation hook
    - provides useful info of what is happening the the app, like the state (loading, submitting, etc.)
    - setup where the outlet is
  - context prop is already set up with react router dom
    - we can pass data from parent(where the outlet is) to the lowest component
    - useOutletContext in the child component
  - form submissions
    - default behavior of html form w/o method and action, a get request is sent and values are appended to same url
      - with action attr, means where to send info to
      - with method attr = post, means created resource on server
      - vite server doesn't know about post request
    - to access data import form component and use action,
      - similar to loader, but difference is loader handles data before page loads, action is after
      - form data api to collect values, so name attr is needed in input, server will look for this value
      - upon submit we will have access to form data in the action
    - once you have data make post request to api endpoint
  - error handling with actions and loaders
    - when loading data and theres an error it makes sense to use single page error or global error
    - but when submitting form theres no need for error pages, use toasts
- react query library
  - caches requests to optimize app performance, make fewer requests, faster data
  - QueryClient
    - instance of react rq client which manages and caches the data fetched by queries
  - stale time
    - how long a query is valid globally
  - QueryClientProvider
  - ReactQueryDevTools
  - ensureQueryData
    - method checks if data is in the cache, if yes? its provided in the component useQuery : it is fetched in loader then provided in component useQUery
- styled components
  - css in js
  - have logic and styles in same component (file)
  - no name collisions

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

#### Form

```js
import { action as newsLetterAction } from './pages/NewsLetter';

        path: 'newsletter',
        element: <NewsLetter />,
        action: newsLetterAction,
      },
```

```js
import axios from 'axios';
import { Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

const newLetterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post(newLetterUrl, data);
    toast.success(response.data.msg);
    console.log(response);
    return redirect('/');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const NewsLetter = () => {
  const navigation = useNavigation();
  console.log(navigation);

  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        our newsletter
      </h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          first name
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: '.5rem' }}
        disabled={navigation.state === 'submitting'}
      >
        {navigation.state === 'submitting' ? 'submitting' : 'submit'}
      </button>
    </Form>
```

#### Search

```js
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import SearchForm from '../components/SearchForm';

const recipeSearchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  const searchTerm = url.searchParams.get('search') || '';
  const response = await axios.get(`${recipeSearchUrl}${searchTerm}`);
  return { searchTerm, meals: response.data.meals };
};

const Landing = () => {
  const { searchTerm, meals } = useLoaderData();

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <RecipeList meals={meals} />
    </>
  );
};

export default Landing;
```

```js
import { Form, useNavigation } from 'react-router-dom';
import styled from 'styled-components';

const SearchForm = ({ searchTerm }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form className="form">
        <input
          type="search"
          name="search"
          className="form-input"
          defaultValue={searchTerm}
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'searching...' : 'search'}
        </button>
      </Form>
    </Wrapper>
  );
};
export default SearchForm;

const Wrapper = styled.div``;
```

---

[Back to Top](#custom_anchor_name)
