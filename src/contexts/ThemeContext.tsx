import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, defaultTheme, coolTheme } from '../themes';

export type ThemeName = 'default' | 'cool';

interface ThemeContextType {
  currentTheme: Theme;
  themeName: ThemeName;
  customTheme: Theme | null;
  setTheme: (name: ThemeName) => void;
  setCustomTheme: (theme: Theme | null) => void;
  isUsingCustomTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
  themeName: 'default',
  customTheme: null,
  setTheme: () => {},
  setCustomTheme: () => {},
  isUsingCustomTheme: false,
});

const getStorageValue = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (err) {
    console.error('Error reading from localStorage:', err);
    return defaultValue;
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('default');
  const [customTheme, setCustomTheme] = useState<Theme | null>(() => 
    getStorageValue('customTheme', null)
  );
  const [isUsingCustomTheme, setIsUsingCustomTheme] = useState(() => 
    getStorageValue('isUsingCustomTheme', false)
  );

  const themes: Record<ThemeName, Theme> = {
    default: defaultTheme,
    cool: coolTheme,
  };

  // 保存自定义主题到 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (customTheme) {
        localStorage.setItem('customTheme', JSON.stringify(customTheme));
      }
    }
  }, [customTheme]);

  // 保存自定义主题使用状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isUsingCustomTheme', String(isUsingCustomTheme));
    }
  }, [isUsingCustomTheme]);

  const value = {
    currentTheme: isUsingCustomTheme && customTheme ? customTheme : themes[themeName],
    themeName,
    customTheme,
    setTheme: (name: ThemeName) => {
      setThemeName(name);
      setIsUsingCustomTheme(false);
    },
    setCustomTheme: (theme: Theme | null) => {
      setCustomTheme(theme);
      if (theme) {
        setIsUsingCustomTheme(true);
      }
    },
    isUsingCustomTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 