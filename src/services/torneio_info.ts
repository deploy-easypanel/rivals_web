import { TorneioInfoData } from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ducksgaming.site',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTorneioInfo = async (): Promise<TorneioInfoData | null> => {
  try {
    const response = await api.get<{ dados: TorneioInfoData }>('/torneio_info');
    return response.data.dados;
  } catch (error) {
    console.error('Erro ao buscar informações do torneio:', error);
    return null;
  }
};

export const saveTorneioInfo = async (
  dados: TorneioInfoData
): Promise<boolean> => {
  try {
    await api.put('/torneio_info', dados);
    return true;
  } catch (error) {
    console.error('Erro ao salvar informações do torneio:', error);
    return false;
  }
};
