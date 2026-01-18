import { baseApi } from 'shared/api/baseApi';
import { User, CreateUserDto, UpdateUserDto } from 'shared/types/user';

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await baseApi.get<User[]>('/users');
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await baseApi.get<User>(`/users/${id}`);
    return data;
  },

  create: async (userData: CreateUserDto): Promise<User> => {
    const { data } = await baseApi.post<User>('/users', userData);
    return data;
  },

  update: async (id: string, userData: UpdateUserDto): Promise<User> => {
    const { data } = await baseApi.put<User>(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await baseApi.delete(`/users/${id}`);
  },
};