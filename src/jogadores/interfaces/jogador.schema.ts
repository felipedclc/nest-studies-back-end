import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema( // cria um modelo do mongodb
  {
    email: { type: String, unique: true }, // tipando e colocando validação unique
    telefoneCelular: { type: String, unique: true },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
  },
  { timestamps: true, collection: 'jogadores' }, // created_at e updated_at / explicita collection
);
