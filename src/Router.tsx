import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { loadRecipes } from '@/api/recipes';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import AnalyticsPage from './pages/AnalyticsPage';
import CalendarPage from './pages/CalendarPage';
import ErrorPage from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public login page */}
      <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />

      {/* Protected routes require a valid session */}
      <Route element={<ProtectedRoute />} errorElement={<ErrorPage />}>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
          <Route index element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/recipes" element={<RecipesPage />} loader={loadRecipes} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </>
  )
);

export function Router() {
  return <RouterProvider router={router} />;
}
