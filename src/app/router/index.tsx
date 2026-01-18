import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from 'pages/AuthPage';
import { UsersPage } from 'pages/UsersPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { routes } from 'shared/config/routes';
import { useAuthContext } from '../providers/AuthProvider';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.auth} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={routes.auth} element={<AuthPage />} />
      <Route
        path={routes.users}
        element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route path={routes.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={routes.notFound} replace />} />
    </Routes>
  );
};

export const AppRouter: React.FC = () => {
  return <AppRoutes />;
};