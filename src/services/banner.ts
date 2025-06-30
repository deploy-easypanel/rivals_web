import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4141',
});

// Tipo do banner (exemplo, ajuste conforme seu backend)
export interface BannerData {
  id?: number;
  title: string;
  subtitle: string;
  paragraph?: string;
  color_start: string;
  color_end: string;
  data_torneio: Date; // ISO string
}

// Função para obter o banner
export async function mostrarBanner(): Promise<BannerData> {
  try {
    const response = await api.get<BannerData>('/banner');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar o banner:', error);
    throw new Error('Erro ao carregar o banner');
  }
}

// Função para atualizar o banner
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
