import React, { createContext, useContext, useState, useEffect } from 'react';

interface AiSettings {
  apiUrl: string;
  apiKey: string;
  model: string;
}

interface AiSettingsContextType {
  settings: AiSettings;
  updateSettings: (newSettings: Partial<AiSettings>) => void;
}

const defaultSettings: AiSettings = {
  apiUrl: '',
  apiKey: '',
  model: 'gpt-3.5-turbo',
};

const AiSettingsContext = createContext<AiSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
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

export const AiSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AiSettings>(() => 
    getStorageValue('aiSettings', defaultSettings)
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiSettings', JSON.stringify(settings));
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AiSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AiSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AiSettingsContext.Provider>
  );
};

export const useAiSettings = () => {
  const context = useContext(AiSettingsContext);
  if (!context) {
    throw new Error('useAiSettings must be used within an AiSettingsProvider');
  }
  return context;
}; 