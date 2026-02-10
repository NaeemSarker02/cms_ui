import { useState, useCallback } from 'react';
import api from '../api/axios';

/**
 * Custom hook for API calls with loading and error states
 * Automatically manages loading states and error handling
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generic API request wrapper
   */
  const request = useCallback(async (apiCall) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall();
      
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // HTTP Methods
  const get = useCallback((url, config) => {
    return request(() => api.get(url, config));
  }, [request]);

  const post = useCallback((url, data, config) => {
    return request(() => api.post(url, data, config));
  }, [request]);

  const put = useCallback((url, data, config) => {
    return request(() => api.put(url, data, config));
  }, [request]);

  const patch = useCallback((url, data, config) => {
    return request(() => api.patch(url, data, config));
  }, [request]);

  const del = useCallback((url, config) => {
    return request(() => api.delete(url, config));
  }, [request]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    clearError,
  };
};

export default useApi;