// Global type definitions for the application

// User types
export interface User {
  username: string;
  password: string;
  id?: string;
  email?: string;
  role?: 'admin' | 'user';
  createdAt?: string;
  lastLogin?: string;
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
  expiresAt?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp?: string;
}

// Scraper types
export interface ScraperConfig {
  name: string;
  url: string;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
  lastRun: string;
  itemsScraped: number;
  color: string;
  enabled?: boolean;
  retryCount?: number;
  maxRetries?: number;
}

// Product types
export interface BaseProduct {
  url: string;
  scrapedAt: string;
  source: string;
  product: {
    title: string;
    brand: string;
    mrp: number;
    sellingPrice: number;
    discount: number;
    images: string[];
  };
  savedTo?: string;
  timestamp?: string;
}

// Form types
export interface FormState {
  isLoading: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  values: Record<string, any>;
}

// UI types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorId?: string;
  context?: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  children?: NavigationItem[];
  disabled?: boolean;
  badge?: string | number;
}

// Theme types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event types
export interface CustomEvent<T = any> extends Event {
  detail: T;
}

// Storage types
export interface StorageItem<T = any> {
  key: string;
  value: T;
  expiresAt?: number;
  createdAt: number;
}

// Validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
  message?: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule | ValidationRule[];
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'url' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
}

// Hook types
export interface UseApiOptions {
  immediate?: boolean;
  retry?: boolean;
  retryCount?: number;
  retryDelay?: number;
  timeout?: number;
}

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

// Context types
export interface AppContextType {
  user: User | null;
  theme: Theme;
  setUser: (user: User | null) => void;
  setTheme: (theme: Theme) => void;
  logout: () => void;
}

// Error types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: string;
  timestamp?: string;
  userId?: string;
}

// Performance types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  bundleSize: number;
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}
