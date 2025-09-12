import { useState, Suspense, lazy } from 'react';
import LoginForm from './components/LoginForm';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load Dashboard for better performance
const Dashboard = lazy(() => import('./components/Dashboard'));

interface User {
  username: string;
  password: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (credentials: User) => {
    setUser(credentials);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <ErrorBoundary>
        <LoginForm onLogin={handleLogin} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading dashboard..." />
        </div>
      }>
        <Dashboard onLogout={handleLogout} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;