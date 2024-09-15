import axios from 'axios';
import Cookies from 'js-cookie';

export const calculateExpirationTime = (expiresInMinutes) => {
  return new Date().getTime() + expiresInMinutes * 60000;
};

const api = axios.create({
  baseURL: '...', //Change the value with your API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (accessToken) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (
      response &&
      response.status === 401 &&
      response.data.code === 'token_not_valid' &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get('refreshToken');

      return axios
        .post('https://8crksdzg-8000.asse.devtunnels.ms/auth/token/refresh/', {
          refresh: refreshToken,
        })
        .then((res) => {
          isRefreshing = false;
          const { access } = res.data;
          const newExpiryTime = calculateExpirationTime(15);
          Cookies.set('accessToken', access, { expires: 1 / 96 });
          localStorage.setItem('accessTokenExpiry', newExpiryTime);

          onRefreshed(access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        })
        .catch((err) => {
          isRefreshing = false;
          console.error('Refresh token failed or expired:', err);
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          localStorage.removeItem('accessTokenExpiry');
          window.location.href = '/';
          return Promise.reject(err);
        });
    }

    return Promise.reject(error);
  }
);

export default api;
