import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import api from '../api/axios';

/**
 * AuthProvider - Manages global authentication state
 * Stores user data, token, roles, and permissions
 * Provides login, logout, and permission checking methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Initialize authentication state from localStorage on app load
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          setToken(storedToken);
          setUser(parsedUser);
          setRoles(parsedUser.roles || []);
          setPermissions(parsedUser.permissions || []);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user with credentials
   * Stores user data and token in state and localStorage
   */
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      
      const response = await api.post('/login', credentials);

      if (response.success && response.data) {
        const { user: userData, token: authToken } = response.data;

        // Update state
        setToken(authToken);
        setUser(userData);
        setRoles(userData.roles || []);
        setPermissions(userData.permissions || []);
        setIsAuthenticated(true);

        // Persist to localStorage
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));

        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Register new user
   */
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      
      const response = await api.post('/register', userData);

      if (response.success && response.data) {
        const { user: newUser, token: authToken } = response.data;

        setToken(authToken);
        setUser(newUser);
        setRoles(newUser.roles || []);
        setPermissions(newUser.permissions || []);
        setIsAuthenticated(true);

        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(newUser));

        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout user
   * Clears all auth data from state and localStorage
   */
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      // Call logout API
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      setLoading(false);
    }
  }, []);

  /**
   * Clear all authentication data
   */
  const clearAuth = useCallback(() => {
    setToken(null);
    setUser(null);
    setRoles([]);
    setPermissions([]);
    setIsAuthenticated(false);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  /**
   * Fetch current user profile
   */
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await api.get('/profile');

      if (response.success && response.data?.user) {
        const userData = response.data.user;
        
        setUser(userData);
        setRoles(userData.roles || []);
        setPermissions(userData.permissions || []);
        
        localStorage.setItem('user', JSON.stringify(userData));

        return response;
      }
    } catch (error) {
      console.error('Fetch profile error:', error);
      
      if (error.status === 401) {
        clearAuth();
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Check if user has specific role(s)
   * @param {string|string[]} requiredRoles - Role(s) to check
   * @returns {boolean}
   */
  const hasRole = useCallback((requiredRoles) => {
    if (!roles || !requiredRoles) return false;
    
    const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    return rolesArray.some(role => roles.includes(role));
  }, [roles]);

  /**
   * Check if user has specific permission(s)
   * @param {string|string[]} requiredPermissions - Permission(s) to check
   * @returns {boolean}
   */
  const hasPermission = useCallback((requiredPermissions) => {
    if (!permissions || !requiredPermissions) return false;
    
    const permissionsArray = Array.isArray(requiredPermissions) 
      ? requiredPermissions 
      : [requiredPermissions];
    return permissionsArray.some(permission => permissions.includes(permission));
  }, [permissions]);

  /**
   * Check if user has ALL specified permissions
   * @param {string[]} requiredPermissions
   * @returns {boolean}
   */
  const hasAllPermissions = useCallback((requiredPermissions) => {
    if (!permissions || !requiredPermissions) return false;
    
    const permissionsArray = Array.isArray(requiredPermissions) 
      ? requiredPermissions 
      : [requiredPermissions];
    return permissionsArray.every(permission => permissions.includes(permission));
  }, [permissions]);

  /**
   * Update user data in context
   */
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    setRoles(updatedUser.roles || []);
    setPermissions(updatedUser.permissions || []);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);

  /**
   * Get user's primary role
   */
  const getPrimaryRole = useCallback(() => {
    return roles && roles.length > 0 ? roles[0] : null;
  }, [roles]);

  // Context value
  const value = {
    // State
    user,
    token,
    roles,
    permissions,
    loading,
    isAuthenticated,

    // Methods
    login,
    register,
    logout,
    fetchProfile,
    hasRole,
    hasPermission,
    hasAllPermissions,
    updateUser,
    clearAuth,
    getPrimaryRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;