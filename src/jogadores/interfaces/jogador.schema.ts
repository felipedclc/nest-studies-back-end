import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema( // cria um modelo do mongodb
  {
    email: { type: String, unique: true },
    telefoneCelular: { type: String, unique: true },
    nome: String,
    password: String,
    role: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
  },
  { timestamps: true, collection: 'jogadores' }, // created_at e updated_at / explicita collection
);
