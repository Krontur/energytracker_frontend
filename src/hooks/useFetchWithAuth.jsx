import { useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

export const useFetchWithAuth = () => {
  const { refreshAccessToken } = useAuth();

  const fetchWithAuth = useCallback(async (url, options = {}) => {
    let token = localStorage.getItem('token');

    if (token) {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        token = await refreshAccessToken();
      }
    } else {
      throw new Error('No token found');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok && response.status !== 401) {
        const errorData = await response.json();
        throw new Error(`Fetch error: ${response.status} - ${errorData.message || response.statusText}`);
      }

      if (response.status === 401) {
        const newToken = await refreshAccessToken();
        options.headers = {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        };
        const retryResponse = await fetch(url, { ...options, headers: options.headers });
        if (!retryResponse.ok) {
          const retryErrorData = await retryResponse.json();
          throw new Error(`Retry error: ${retryResponse.status} - ${retryErrorData.message || retryResponse.statusText}`);
        }
        const retryData = await retryResponse.json();
        return { data: retryData, status: retryResponse.status };
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }, [refreshAccessToken]);

  return {
    api: {
      get: async (url) => fetchWithAuth(url),
      post: async (url, data) => fetchWithAuth(url, { method: 'POST', body: JSON.stringify(data) }),
      patch: async (url, data) => fetchWithAuth(url, { method: 'PATCH', body: JSON.stringify(data) }),
      put: async (url, data) => fetchWithAuth(url, { method: 'PUT', body: JSON.stringify(data) }),
      delete: async (url) => fetchWithAuth(url, { method: 'DELETE' }),
    },
  };
};
