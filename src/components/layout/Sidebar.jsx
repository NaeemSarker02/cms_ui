import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  FolderKanban,
  FileText,
  LogOut,
  ChevronDown,
  ChevronRight,
  Sparkles,
  X,
  Menu,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import usePermissions from '../../hooks/usePermissions';

/**
 * Dynamic Sidebar Component
 * Only shows menu items based on user permissions
 */
const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, getPrimaryRole } = useAuth();
  const { can } = usePermissions();
  const [expandedMenus, setExpandedMenus] = useState({});

  const primaryRole = getPrimaryRole();

  // Define menu structure with permission checks
  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      show: true, // Always show dashboard
    },
    {
      title: 'Products',
      icon: Package,
      show: can.viewProducts,
      children: [
        {
          title: 'All Products',
          path: '/products',
          show: can.viewProducts,
        },
        {
          title: 'Create Product',
          path: '/products/create',
          show: can.createProducts,
        },
      ],
    },
    {
      title: 'Configurator',
      icon: Sparkles,
      path: '/configurator',
      show: can.viewConfigurations || can.createConfigurations,
      badge: 'New',
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      show: can.viewOrders,
      children: [
        {
          title: 'All Orders',
          path: '/orders',
          show: can.viewOrders,
        },
        {
          title: 'Create Order',
          path: '/orders/create',
          show: can.createOrders,
        },
      ],
    },
    {
      title: 'Projects',
      icon: FolderKanban,
      show: can.viewProjects,
      children: [
        {
          title: 'All Projects',
          path: '/projects',
          show: can.viewProjects,
        },
        {
          title: 'Create Project',
          path: '/projects/create',
          show: can.createProjects,
        },
      ],
    },
    {
      title: 'Users',
      icon: Users,
      show: can.viewUsers,
      children: [
        {
          title: 'All Users',
          path: '/users',
          show: can.viewUsers,
        },
        {
          title: 'Create User',
          path: '/users/create',
          show: can.createUsers,
        },
        {
          title: 'Roles & Permissions',
          path: '/roles',
          show: can.viewRoles,
        },
      ],
    },
    {
      title: 'Reports',
      icon: FileText,
      path: '/reports',
      show: can.viewReports,
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/settings',
      show: can.manageSettings,
    },
  ];

  // Filter menu items based on permissions
  const visibleMenuItems = menuItems.filter(item => item.show);

  const toggleSubmenu = (title) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-72
          glass-sidebar overflow-y-auto custom-scrollbar
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ERP System
                </h1>
                <p className="text-xs text-gray-500">Premium Edition</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  {primaryRole}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1">
            {visibleMenuItems.map((item, index) => (
              <div key={item.title}>
                {item.children ? (
                  // Menu with submenu
                  <div>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => toggleSubmenu(item.title)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl
                        transition-all duration-200 group
                        ${expandedMenus[item.title]
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedMenus[item.title] ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {expandedMenus[item.title] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.children.filter(child => child.show).map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setIsOpen(false)}
                              className={`
                                block px-4 py-2 rounded-lg text-sm
                                transition-all duration-200
                                ${isActive(child.path)
                                  ? 'bg-blue-600 text-white shadow-lg'
                                  : 'text-gray-600 hover:bg-gray-50'
                                }
                              `}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Single menu item
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center justify-between px-4 py-3 rounded-xl
                        transition-all duration-200 group
                        ${isActive(item.path)
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;