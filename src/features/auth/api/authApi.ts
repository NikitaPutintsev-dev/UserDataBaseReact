import { baseApi } from 'shared/api/baseApi';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authApi = {
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    // Mock API для авторизации - в реальном проекте здесь будет запрос к API
    // Для mockapi.io можно использовать простую проверку или создать отдельный endpoint
    const response = await baseApi.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Для упрощения, используем локальное хранение
  // В реальном приложении это должно быть на бэкенде
  mockLogin: (credentials: AuthCredentials): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock_token_' + Date.now(),
          user: {
            id: '1',
            email: credentials.email,
            name: 'User',
          },
        });
      }, 500);
    });
  },
};