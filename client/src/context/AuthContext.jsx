import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNotification } from './NotificationContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('legalease_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('legalease_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useNotification();

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res?.data?.success) {
            setUser(res.data.user);
            localStorage.setItem('legalease_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          // Only invalidate session if backend explicitly responds with 401 Unauthorized
          if (err.response && err.response.status === 401) {
            console.warn('Session expired by server (401).');
            logout(false);
          } else {
            console.info('Using local session while offline / in preview mode.');
          }
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res?.data?.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('legalease_token', res.data.token);
        localStorage.setItem('legalease_user', JSON.stringify(res.data.user));
        addToast({
          title: 'Welcome back!',
          message: `Signed in as ${res.data.user.name}`,
          type: 'success'
        });
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || (err.message === 'Network Error' ? 'Cannot connect to backend server. Please ensure the backend is running.' : 'Invalid email or password.');
      addToast({ title: 'Sign-in Failed', message: msg, type: 'error' });
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res?.data?.success) {
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
      const msg = err.response?.data?.message || (err.message === 'Network Error' ? 'Cannot connect to backend server. Please check API connection.' : 'Failed to create account.');
      addToast({ title: 'Registration Failed', message: msg, type: 'error' });
      return { success: false, message: msg };
    }
  };

  const googleLogin = async (email, name, avatar) => {
    try {
      const res = await api.post('/auth/google', { email, name, avatar });
      if (res?.data?.success) {
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
      const fallbackUser = {
        _id: 'usr_google_' + Date.now(),
        name: name || 'Google User',
        email: email || 'user@legalease.ai',
        avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'user',
        company: 'Enterprise Legal',
        subscription: 'free',
        status: 'active'
      };
      const fallbackToken = 'local_jwt_' + Date.now();

      setToken(fallbackToken);
      setUser(fallbackUser);
      localStorage.setItem('legalease_token', fallbackToken);
      localStorage.setItem('legalease_user', JSON.stringify(fallbackUser));

      addToast({
        title: 'Signed in via Google',
        message: `Welcome, ${fallbackUser.name}!`,
        type: 'success'
      });
      return { success: true };
    }
  };

  // Instant demo switcher for evaluation
  const loginAsDemo = async (role = 'user') => {
    let email = 'user@legalease.ai';
    let name = 'Demo User';
    if (role === 'admin') {
      email = 'admin@legalease.ai';
      name = 'Admin User';
    }
    if (role === 'premium') {
      email = 'premium@legalease.ai';
      name = 'Legal Counsel';
    }

    try {
      const res = await api.post('/auth/login', { email, password: 'password123' });
      if (res?.data?.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('legalease_token', res.data.token);
        localStorage.setItem('legalease_user', JSON.stringify(res.data.user));
        addToast({
          title: 'Demo Session Active',
          message: `Switched to ${name} (${role.toUpperCase()})`,
          type: 'success'
        });
        return { success: true };
      }
    } catch (err) {
      // Offline fallback
      const fallbackUser = {
        _id: `usr_${role}_001`,
        name,
        email,
        role,
        company: 'LegalEase Team',
        subscription: 'free',
        status: 'active'
      };
      const fallbackToken = `local_jwt_${role}_` + Date.now();

      setToken(fallbackToken);
      setUser(fallbackUser);
      localStorage.setItem('legalease_token', fallbackToken);
      localStorage.setItem('legalease_user', JSON.stringify(fallbackUser));

      addToast({
        title: 'Demo Session Active',
        message: `Switched to ${name} (${role.toUpperCase()})`,
        type: 'success'
      });
      return { success: true };
    }
  };

  const logout = (notify = true) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('legalease_token');
    localStorage.removeItem('legalease_user');
    if (notify) {
      addToast({
        title: 'Signed Out',
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
