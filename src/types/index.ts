export type CorType = 'green' | 'yellow' | 'gray';

export interface Time {
  nome: string;
  placar: number;
  cor: CorType;
}

export interface Jogo {
  timeA: Time;
  timeB: Time;
}

export interface TimeSimples {
  time: string;
  placar: number;
  cor: CorType;
}

export interface TorneioState {
  quartas: Jogo[]; // 4 jogos de quartas (idealmente)
  semifinais: TimeSimples[]; // 2 semifinalistas
  final: TimeSimples; // campeão
}
export interface BannerData {
  id?: number;
  title: string;
  subtitle: string;
  paragraph?: string;
  color_start: string;
  color_end: string;
  data_torneio: Date; // ISO string
}
