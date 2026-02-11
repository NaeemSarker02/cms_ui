/**
 * Application Constants
 */

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

// App Info
export const APP_NAME = 'Premium ERP System';
export const APP_VERSION = '1.0.0';

// Roles
export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  SALES_OFFICER: 'Sales Officer',
  PROJECT_MANAGER: 'Project Manager',
  CUSTOMER: 'Customer',
};

// Permissions
export const PERMISSIONS = {
  // Products
  VIEW_PRODUCTS: 'view products',
  CREATE_PRODUCTS: 'create products',
  EDIT_PRODUCTS: 'edit products',
  DELETE_PRODUCTS: 'delete products',

  // Configurations
  VIEW_CONFIGURATIONS: 'view configurations',
  CREATE_CONFIGURATIONS: 'create configurations',
  EDIT_CONFIGURATIONS: 'edit configurations',
  DELETE_CONFIGURATIONS: 'delete configurations',

  // Orders
  VIEW_ORDERS: 'view orders',
  CREATE_ORDERS: 'create orders',
  EDIT_ORDERS: 'edit orders',
  DELETE_ORDERS: 'delete orders',
  APPROVE_ORDERS: 'approve orders',

  // Projects
  VIEW_PROJECTS: 'view projects',
  CREATE_PROJECTS: 'create projects',
  EDIT_PROJECTS: 'edit projects',
  DELETE_PROJECTS: 'delete projects',
  MANAGE_PROJECTS: 'manage projects',

  // Users
  VIEW_USERS: 'view users',
  CREATE_USERS: 'create users',
  EDIT_USERS: 'edit users',
  DELETE_USERS: 'delete users',

  // Roles
  VIEW_ROLES: 'view roles',
  CREATE_ROLES: 'create roles',
  EDIT_ROLES: 'edit roles',
  DELETE_ROLES: 'delete roles',

  // Reports
  VIEW_REPORTS: 'view reports',
  EXPORT_REPORTS: 'export reports',

  // Settings
  MANAGE_SETTINGS: 'manage settings',
};

// Status
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Order Status
export const ORDER_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PROCESSING: 'processing',
  APPROVED: 'approved',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  FULL: 'MMMM DD, YYYY hh:mm A',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  PER_PAGE_OPTIONS: [10, 25, 50, 100],
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};