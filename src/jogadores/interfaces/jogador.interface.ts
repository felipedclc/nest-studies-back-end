import { Document } from 'mongoose';

export interface Jogador extends Document { // interface tem comportamento para o bd
  readonly telefoneCelular: string;
  readonly email: string;
  readonly nome: string;
  readonly password: string;
  readonly role: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}
