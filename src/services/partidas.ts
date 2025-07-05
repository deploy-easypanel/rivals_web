import { PartidaData } from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ducksgaming.site',
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET: buscar todas as partidas
export const getMatches = async (): Promise<PartidaData[]> => {
  const res = await api.get('/partidas');
  return res.data;
};

// POST: criar nova partida
export const createMatch = async (data: PartidaData): Promise<PartidaData> => {
  const res = await api.post('/partidas', data);
  return res.data;
};

// PUT: atualizar uma partida pelo ID
export const updateMatch = async (id: number, data: PartidaData) => {
  await api.put(`/partidas/${id}`, data);
};

// DELETE: excluir partida pelo ID
export const deleteMatch = async (id: number) => {
  await api.delete(`/partidas/${id}`);
};
