import { useAuthContext } from 'app/providers/AuthProvider';

// Теперь useAuth просто переиспользует AuthContext для обратной совместимости
export const useAuth = () => {
  return useAuthContext();
};