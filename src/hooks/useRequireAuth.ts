import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useRequireAuth = (redirectTo: string = '/auth') => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Store the attempted URL to redirect back after login
      sessionStorage.setItem('redirectAfterAuth', location.pathname);
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, redirectTo, location]);

  return { isAuthenticated, loading };
};