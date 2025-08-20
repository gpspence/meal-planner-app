import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { loadRecipes } from '@/api/recipes';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public login page */}
      <Route path='/login' element={<LoginPage />} errorElement={<ErrorPage />} />

      {/* Protected routes require a valid session */}
      <Route element={<ProtectedRoute />} errorElement={<ErrorPage />} >
        <Route path='/' element={<MainLayout />} errorElement={<ErrorPage />} >
          <Route index element={<HomePage />} />
          <Route path='/calendar' element={<CalendarPage />} />
          <Route path='/recipes' element={<RecipesPage />} loader={loadRecipes} />
          <Route path='/analytics' element={<AnalyticsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Route>
    </>
  )
);

export function Router() {
  return <RouterProvider router={router} />;
}
