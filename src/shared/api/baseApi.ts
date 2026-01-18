import axios from 'axios';

const BASE_URL = (process.env.MOCKAPI_URL as string) || 'https://696d6103f4a79b3151811491.mockapi.io/api/v1';

export const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default baseApi;