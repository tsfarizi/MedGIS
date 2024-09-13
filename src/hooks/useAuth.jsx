// hooks/useAuth.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const authenticateUser = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('accessTokenExpiry');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, authenticateUser, handleLogout };
};

export default useAuth;
