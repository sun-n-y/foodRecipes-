import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Error, HomeLayout, Landing, NewsLetter, Recipe } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
