import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAppContext();

  // If no user is logged in, go to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check user role permission
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;