import { useMemo } from 'react';
import useAuth from './useAuth';

/**
 * Custom hook for permission checking
 * Provides convenient methods to check user permissions
 */
export const usePermissions = () => {
  const { permissions, hasPermission, hasAllPermissions } = useAuth();

  /**
   * Check if user can perform an action
   */
  const can = useMemo(() => ({
    // Products
    viewProducts: hasPermission('view products'),
    createProducts: hasPermission('create products'),
    editProducts: hasPermission('edit products'),
    deleteProducts: hasPermission('delete products'),

    // Configurations
    viewConfigurations: hasPermission('view configurations'),
    createConfigurations: hasPermission('create configurations'),
    editConfigurations: hasPermission('edit configurations'),
    deleteConfigurations: hasPermission('delete configurations'),

    // Orders
    viewOrders: hasPermission('view orders'),
    createOrders: hasPermission('create orders'),
    editOrders: hasPermission('edit orders'),
    deleteOrders: hasPermission('delete orders'),
    approveOrders: hasPermission('approve orders'),

    // Projects
    viewProjects: hasPermission('view projects'),
    createProjects: hasPermission('create projects'),
    editProjects: hasPermission('edit projects'),
    deleteProjects: hasPermission('delete projects'),
    manageProjects: hasPermission('manage projects'),

    // Users
    viewUsers: hasPermission('view users'),
    createUsers: hasPermission('create users'),
    editUsers: hasPermission('edit users'),
    deleteUsers: hasPermission('delete users'),

    // Roles
    viewRoles: hasPermission('view roles'),
    createRoles: hasPermission('create roles'),
    editRoles: hasPermission('edit roles'),
    deleteRoles: hasPermission('delete roles'),

    // Reports
    viewReports: hasPermission('view reports'),
    exportReports: hasPermission('export reports'),

    // Settings
    manageSettings: hasPermission('manage settings'),
  }), [hasPermission]);

  return {
    permissions,
    can,
    hasPermission,
    hasAllPermissions,
  };
};

export default usePermissions;