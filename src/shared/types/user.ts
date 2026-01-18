export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
  avatar?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}