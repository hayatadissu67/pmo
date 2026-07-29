import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ 
  children, 
  allowedRoles 
}) {

  const { isAuthenticated, user } = useAuth();


  // 1. Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  // 2. Check role permission
  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }


  return children;
}