import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  About,
  Error,
  HomeLayout,
  Landing,
  NewsLetter,
  Recipe,
  SinglePageError,
} from './pages';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleRecipeLoader } from './pages/Recipe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader,
      },
      {
        path: 'recipe/:id',
        errorElement: <SinglePageError />,
        element: <Recipe />,
        loader: singleRecipeLoader,
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

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
