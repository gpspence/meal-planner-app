import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import RecipesPage from './pages/RecipesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { recipesLoader, weekPlanLoader, dayAssignmentsLoader } from './loaders';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/recipes' element={<RecipesPage />}/>
      <Route path='/analytics' element={<AnalyticsPage />}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Route>
  )
);

export function Router() {
  return <RouterProvider router={router} />;
}
