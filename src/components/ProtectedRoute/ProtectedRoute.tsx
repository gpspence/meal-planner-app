import { useSession } from "@/hooks/useSession";
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const ProtectedRoute = () => {
    const { session } = useSession();
    const location = useLocation();

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default ProtectedRoute