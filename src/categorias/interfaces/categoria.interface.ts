import { Document } from 'mongoose';
// import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export interface IEvento {
  nome: string;
  operacao: string;
  valor: number;
}

export interface Categoria extends Document {

  readonly categoria: string;
  readonly descricao: string;
  readonly eventos: IEvento[];
  readonly jogadores: string[];

}
