import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { NotificationProvider } from './context/NotificationContext';
import { initEmailJS } from './services/notificationService';
import Home from './components/Home';
import ComingSoon from './components/ComingSoon';
import logo from './logo.svg';
import './App.css';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong:</h2>
        <pre className="text-gray-700">{error.message}</pre>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize EmailJS
    initEmailJS();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NotificationProvider>
        <Router>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              {/* Redirect all other routes to ComingSoon */}
              <Route path="*" element={<Navigate to="/coming-soon" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
