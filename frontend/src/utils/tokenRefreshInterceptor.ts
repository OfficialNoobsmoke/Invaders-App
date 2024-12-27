import apiClient from './apiClient';

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        await apiClient.post('/auth/token');

        error.config._retry = true;
        return apiClient(error.config);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);
