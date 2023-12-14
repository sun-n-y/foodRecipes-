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
import { action as newsLetterAction } from './pages/NewsLetter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        loader: landingLoader(queryClient),
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
        action: newsLetterAction,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
