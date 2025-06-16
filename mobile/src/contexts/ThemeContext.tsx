import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../themes';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextData {
  theme: typeof lightTheme;
  themeType: ThemeType;
  toggleTheme: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@theme');
      if (savedTheme) {
        setThemeType(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async (type: ThemeType) => {
    try {
      await AsyncStorage.setItem('@theme', type);
      setThemeType(type);
    } catch (error) {
      console.error('Erro ao salvar preferência de tema:', error);
    }
  };

  const theme = themeType === 'system'
    ? systemColorScheme === 'dark' ? darkTheme : lightTheme
    : themeType === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme should be use inside ThemeProvider');
  }
  return context;
}; 