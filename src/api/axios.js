import axios from 'axios';

/**
 * Axios instance configured for API communication
 * - Automatically attaches Bearer token from localStorage
 * - Handles common error scenarios
 * - Provides consistent response format
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds
  withCredentials: false,
});

/**
 * Request Interceptor
 * Automatically attaches Bearer token to all requests
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log('📤 API Request:', config.method.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles responses and common error scenarios
 */
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('📥 API Response:', response.config.url, response.data);
    }
    
    // Return the data portion of the response
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          console.error('🔒 Unauthorized - clearing auth data');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Only redirect if not already on login page
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
        
        case 403:
          // Forbidden - user doesn't have permission
          console.error('🚫 Forbidden:', data.message);
          break;
        
        case 404:
          // Not found
          console.error('🔍 Not Found:', data.message);
          break;
        
        case 422:
          // Validation error
          console.error('⚠️ Validation Error:', data.errors);
          break;
        
        case 500:
          // Server error
          console.error('💥 Server Error:', data.message);
          break;
        
        default:
          console.error('❌ API Error:', data.message || 'An error occurred');
      }

      // Return standardized error format
      return Promise.reject({
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors || null,
        status,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('🌐 Network Error: No response from server');
      return Promise.reject({
        success: false,
        message: 'Network error. Please check your internet connection.',
        errors: null,
        status: 0,
      });
    } else {
      // Error in request setup
      console.error('⚙️ Request Setup Error:', error.message);
      return Promise.reject({
        success: false,
        message: error.message || 'Request failed',
        errors: null,
        status: 0,
      });
    }
  }
);

export default api;