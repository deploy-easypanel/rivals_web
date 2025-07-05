import { TorneioState } from '@/types';
import axios from 'axios';

// Configuração base
const api = axios.create({
  baseURL: 'https://api.ducksgaming.site',
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET /api/chaveamento
export const getChaveamento = async (): Promise<TorneioState | null> => {
  try {
    const response = await api.get<{ dados: TorneioState }>('/chaveamento');
    return response.data.dados;
  } catch (error) {
    console.error('Erro ao buscar chaveamento:', error);
    return null;
  }
};

// POST /api/chaveamento
export const saveChaveamento = async (
  estado: TorneioState
): Promise<boolean> => {
  try {
    await api.post('/chaveamento', estado);
    return true;
  } catch (error) {
    console.error('Erro ao salvar chaveamento:', error);
    return false;
  }
};
