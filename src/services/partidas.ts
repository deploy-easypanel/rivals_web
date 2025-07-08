import { PartidaData } from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ducksgaming.site',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMatches = async (): Promise<PartidaData[]> => {
  const res = await api.get('/partidas');
  return res.data;
};

export const createMatch = async (data: PartidaData): Promise<PartidaData> => {
  const res = await api.post('/partidas', data);
  return res.data;
};

export const updateMatch = async (id: number, data: PartidaData) => {
  await api.put(`/partidas/${id}`, data);
};

export const deleteMatch = async (id: number) => {
  await api.delete(`/partidas/${id}`);
};
