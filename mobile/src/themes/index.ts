import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563EB',
    secondary: '#3B82F6',
    background: '#FFFFFF',
    surface: '#F3F4F6',
    text: '#1F2937',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3B82F6',
    secondary: '#60A5FA',
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
}; 