import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.10:4141',
});

export async function login(email: string, senha: string) {
  const res = await api.post('/auth/login', { email, senha });
  return res.data;
}
