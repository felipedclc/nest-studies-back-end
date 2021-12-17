import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/jogadores', {
      useNewUrlParser: true, // recomendado p garantir a compatibilidade
      useCreateIndex: true, // evitar msg de deprecated
      useUnifiedTopology: true, // boa prática
      useFindAndModify: false, // desabilita o método
    }),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
