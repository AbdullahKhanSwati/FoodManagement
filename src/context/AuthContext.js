import React, { createContext, useState, useEffect } from 'react';
import { getToken, setToken, setUserData, getUserData, clearAuthInfo } from '../utils/storage';
import { login, register, getProfile } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      if (token) {
        // Load local user immediately to stop the loading screen fast
        const localUser = await getUserData();
        if (localUser) {
          setUser(localUser);
        }
        
        // Fetch fresh profile in background without blocking UI
        getProfile().then(async (profileResponse) => {
          if (profileResponse.success) {
            setUser(profileResponse.data);
            await setUserData(profileResponse.data);
          }
        }).catch(err => console.log('Background profile fetch failed:', err));

      }
    } catch (error) {
      console.log('Auth check error:', error);
      await clearAuthInfo();
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      // Wait, let's make sure response structure matches DB
      // The backend returns { success: true, message: "...", data: { user: {...}, token: "..." } }
      if (response.success && response.data) {
        const { token, user } = response.data;
        await setToken(token);
        await setUserData(user);
        setUser(user);
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await register(name, email, password);
      if (response.success) {
        // Based on user request, DO NOT AUTO LOGIN. 
        // Just return success so the screen can redirect to login.
        return { success: true, message: 'Registration successful. Please login.' };
      }
      return { success: false, message: response.message || 'Registration failed' };
    } catch (error) {
      return { success: false, message: error.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    await clearAuthInfo();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
