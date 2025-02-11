export const APP_CONFIG = {
  APP_NAME: 'WordCraft',
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.example.com' 
    : 'http://localhost:3000',
  STORAGE_KEY_PREFIX: 'wordcraft_',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const STORAGE_KEYS = {
  TOKEN: `${APP_CONFIG.STORAGE_KEY_PREFIX}token`,
  USER: `${APP_CONFIG.STORAGE_KEY_PREFIX}user`,
  THEME: `${APP_CONFIG.STORAGE_KEY_PREFIX}theme`,
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
};

export const BREAKPOINTS = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}; 