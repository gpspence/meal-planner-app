import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, Center, Loader } from '@mantine/core';
import { useSession } from '@/hooks/useSession';

const ProtectedRoute = () => {
  const { session } = useSession();
  const location = useLocation();
  if (session === undefined) {
    return (
      <Center>
        <Box m="30%">
          <Loader color="blue" />
        </Box>
      </Center>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
