import { useSession } from "@/hooks/useSession";
import { Box, Center, Container, Loader } from "@mantine/core";
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const ProtectedRoute = () => {
    const { session } = useSession();
    const location = useLocation();
    if (session === undefined) {
        return (
            <Center>
                <Box m={'30%'}>
                    <Loader color='blue' />
                </Box>
            </Center>
        )
    }

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default ProtectedRoute