<a name="custom_anchor_name"></a>

# a food recipes app :stuffed_flatbread: :bento: :waffle: :taco: :hamburger:

## Concepts applied but not limited too

- ### vite + react
- ### useState
- ### render components
- ### index css

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

[Back to Top](#custom_anchor_name)
