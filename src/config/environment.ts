// Environment configuration
export const ENV = {
  // API Configuration
  // API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.b2bbusineesleads.shop/api',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333/api',
  
  // Authentication
  DEMO_USERNAME: import.meta.env.VITE_DEMO_USERNAME || 'admin',
  DEMO_PASSWORD: import.meta.env.VITE_DEMO_PASSWORD || 'demo123',
  
  // Environment
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
  ENABLE_DEBUG_MODE: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
  
  // Performance
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
  REQUEST_TIMEOUT: 30000,
  
  // UI Configuration
  MAX_SEARCH_RESULTS: 50,
  MAX_HISTORY_ITEMS: 10,
  ANIMATION_DURATION: 300,
  
  // Security
  MAX_URL_LENGTH: 2048,
  MAX_INPUT_LENGTH: 1000,
  ALLOWED_PROTOCOLS: ['http:', 'https:'],
  
  // Validation
  MIN_USERNAME_LENGTH: 3,
  MIN_PASSWORD_LENGTH: 6,
  MAX_USERNAME_LENGTH: 50,
  MAX_PASSWORD_LENGTH: 100,
} as const;

// Type for environment keys
export type EnvKey = keyof typeof ENV;

// Helper function to get environment variable with fallback
export const getEnvVar = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] || fallback;
};

// Helper function to check if feature is enabled
export const isFeatureEnabled = (feature: string): boolean => {
  return import.meta.env[`VITE_ENABLE_${feature.toUpperCase()}`] === 'true';
};

// Helper function to get API endpoint
export const getApiEndpoint = (endpoint: string): string => {
  return `${ENV.API_BASE_URL}${endpoint}`;
};
