import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from './NotificationContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('legalease_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('legalease_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useNotification();

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('legalease_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Auth token verification failed:', err.message);
          logout(false);
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('legalease_token', res.data.token);
        localStorage.setItem('legalease_user', JSON.stringify(res.data.user));
        addToast({
          title: 'Welcome back!',
          message: `Signed in as ${res.data.user.name} (${res.data.user.role.toUpperCase()})`,
          type: 'success'
        });
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      addToast({ title: 'Authentication Failed', message: msg, type: 'error' });
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('legalease_token', res.data.token);
        localStorage.setItem('legalease_user', JSON.stringify(res.data.user));
        addToast({
          title: 'Account Created',
          message: 'Welcome to LegalEase AI! Your workspace is ready.',
          type: 'success'
        });
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      addToast({ title: 'Registration Failed', message: msg, type: 'error' });
      return { success: false, message: msg };
    }
  };

  const googleLogin = async (email, name, avatar) => {
    try {
      const res = await api.post('/auth/google', { email, name, avatar });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('legalease_token', res.data.token);
        localStorage.setItem('legalease_user', JSON.stringify(res.data.user));
        addToast({
          title: 'Google Sign-In Successful',
          message: `Signed in as ${res.data.user.name}`,
          type: 'success'
        });
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Google sign-in failed.';
      addToast({ title: 'Sign-in Failed', message: msg, type: 'error' });
      return { success: false, message: msg };
    }
  };

  // Instant demo switcher for evaluation
  const loginAsDemo = async (role = 'user') => {
    let email = 'user@legalease.ai';
    if (role === 'admin') email = 'admin@legalease.ai';
    if (role === 'premium') email = 'premium@legalease.ai';

    return await login(email, 'password123');
  };

  const logout = (notify = true) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('legalease_token');
    localStorage.removeItem('legalease_user');
    if (notify) {
      addToast({
        title: 'Logged Out',
        message: 'You have been securely signed out.',
        type: 'info'
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isPremium: user?.role === 'premium' || user?.role === 'admin',
        login,
        register,
        googleLogin,
        loginAsDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
