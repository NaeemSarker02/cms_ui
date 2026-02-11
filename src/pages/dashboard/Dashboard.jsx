import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import CustomerDashboard from './CustomerDashboard';
import Spinner from '../../components/common/Spinner';

/**
 * Main Dashboard Router
 * Routes to role-specific dashboard
 */
const Dashboard = () => {
  const { user, loading, getPrimaryRole } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  const primaryRole = getPrimaryRole();

  // Route based on role
  switch (primaryRole) {
    case 'Super Admin':
      return <Navigate to="/dashboard/super-admin" replace />;
    case 'Admin':
      return <Navigate to="/dashboard/admin" replace />;
    case 'Sales Officer':
      return <Navigate to="/dashboard/sales" replace />;
    case 'Project Manager':
      return <Navigate to="/dashboard/projects" replace />;
    case 'Customer':
      return <CustomerDashboard />;
    default:
      return <CustomerDashboard />;
  }
};

export default Dashboard;