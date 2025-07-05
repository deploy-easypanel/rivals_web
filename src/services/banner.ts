import { BannerData } from '@/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ducksgaming.site',
});

export async function mostrarBanner(): Promise<BannerData> {
  try {
    const response = await api.get<BannerData>('/banner');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar o banner:', error);
    throw new Error('Erro ao carregar o banner');
  }
}

export async function atualizarBanner(data: BannerData): Promise<BannerData> {
  try {
    const response = await api.put<BannerData>('/banner', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar o banner:', error);
    throw new Error('Erro ao salvar o banner');
  }
}
