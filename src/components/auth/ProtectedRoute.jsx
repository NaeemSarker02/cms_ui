import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

/**
 * ProtectedRoute Component
 * Handles authentication and permission-based route protection
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string|string[]} props.requiredPermissions - Required permissions to access route
 * @param {string|string[]} props.requiredRoles - Required roles to access route
 * @param {boolean} props.requireAll - If true, user must have ALL permissions/roles
 */
const ProtectedRoute = ({ 
  children, 
  requiredPermissions = null,
  requiredRoles = null,
  requireAll = false 
}) => {
  const { isAuthenticated, loading, hasPermission, hasRole, hasAllPermissions } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRoles) {
    const hasRequiredRole = hasRole(requiredRoles);
    
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check permission-based access
  if (requiredPermissions) {
    let hasAccess;
    
    if (requireAll) {
      // User must have ALL specified permissions
      hasAccess = hasAllPermissions(requiredPermissions);
    } else {
      // User must have AT LEAST ONE of the specified permissions
      hasAccess = hasPermission(requiredPermissions);
    }
    
    if (!hasAccess) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has required permissions/roles
  return <>{children}</>;
};

export default ProtectedRoute;