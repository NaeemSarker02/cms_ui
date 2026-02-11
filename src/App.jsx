import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ConfiguratorProvider } from './context/ConfiguratorProvider';
import DashboardLayout from './layouts/DashboardLayout';
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import Configurator from './pages/configurator/Configurator';
import ProtectedRoute from './components/auth/ProtectedRoute'; // Fixed Path
import Login from './pages/auth/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConfiguratorProvider>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Shell */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Auto redirect from root to dashboard */}
              <Route index element={<Navigate to="/dashboard/super-admin" replace />} />
              
              <Route path="dashboard/super-admin" element={<SuperAdminDashboard />} />
              <Route path="dashboard/customer" element={<CustomerDashboard />} />
              <Route path="configurator" element={<Configurator />} />
            </Route>
          </Routes>
        </ConfiguratorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;