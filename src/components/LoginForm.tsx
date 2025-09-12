import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { sanitizeInput, logError } from '../utils/helpers';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { username?: string; password?: string } = {};
    
    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(credentials.username);
    const sanitizedPassword = sanitizeInput(credentials.password);
    
    // Validate username
    if (!sanitizedUsername) {
      errors.username = 'Username is required';
    } else if (sanitizedUsername.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }
    
    // Validate password
    if (!sanitizedPassword) {
      errors.password = 'Password is required';
    } else if (sanitizedPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials - In production, this should be replaced with proper authentication
      const validCredentials = {
        username: import.meta.env.VITE_DEMO_USERNAME || 'admin',
        password: import.meta.env.VITE_DEMO_PASSWORD || 'demo123'
      };
      
      const sanitizedUsername = sanitizeInput(credentials.username);
      const sanitizedPassword = sanitizeInput(credentials.password);
      
      if (sanitizedUsername === validCredentials.username && sanitizedPassword === validCredentials.password) {
        onLogin({ username: sanitizedUsername, password: sanitizedPassword });
        setError('');
        setValidationErrors({});
      } else {
        setError('Invalid credentials. Please check your username and password.');
      }
    } catch (err) {
      logError(err, 'LoginForm.handleSubmit');
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setCredentials({
      ...credentials,
      [name]: sanitizedValue
    });
    
    // Clear validation errors for this field
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined
      });
    }
    
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-600 mt-2">Access the scraper dashboard</p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="text-sm text-blue-700">
            <p className="font-semibold">Demo Credentials:</p>
            <p>Username: <span className="font-mono">{import.meta.env.VITE_DEMO_USERNAME || 'admin'}</span></p>
            <p>Password: <span className="font-mono">{import.meta.env.VITE_DEMO_PASSWORD || 'demo123'}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Login form">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  validationErrors.username 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
                placeholder="Enter username"
                required
                disabled={isLoading}
                aria-describedby={validationErrors.username ? "username-error" : undefined}
                aria-invalid={!!validationErrors.username}
                autoComplete="username"
              />
            </div>
            {validationErrors.username && (
              <div id="username-error" className="mt-1 flex items-center space-x-1 text-sm text-red-600" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>{validationErrors.username}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  validationErrors.password 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
                placeholder="Enter password"
                required
                disabled={isLoading}
                aria-describedby={validationErrors.password ? "password-error" : undefined}
                aria-invalid={!!validationErrors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {validationErrors.password && (
              <div id="password-error" className="mt-1 flex items-center space-x-1 text-sm text-red-600" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>{validationErrors.password}</span>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}