import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { recipesLoader, weekPlanLoader, dayAssignmentsLoader } from './loaders';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public login page */}
      <Route path='/login' element={<LoginPage />} />

      {/* Protected routes require a valid session */}
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/calendar' element={<CalendarPage />} />
          <Route path='/recipes' element={<RecipesPage />} loader={recipesLoader} />
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
