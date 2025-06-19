import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    usernameOrEmail: string,
    password: string
  ) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getApiUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  const host =
    Constants.manifest?.debuggerHost?.split(':').shift() || 'localhost';
  return `http://${host}:8080`;
}

const API_URL = getApiUrl();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (usernameOrEmail: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let message = 'Login failed';
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        message = data.message || message;
      }
      throw new Error(message);
    }

    const data = await res.json();
    setUser(data.user);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let message = 'Registration failed';
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        message = data.message || message;
      }
      throw new Error(message);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
