import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/jogadores', {
      useNewUrlParser: true, // recomendado p garantir a compatibilidade
      useUnifiedTopology: true, // boa prática
      useFindAndModify: false, // desabilita o método
      useCreateIndex: true,
    }),
    JogadoresModule,
    CategoriasModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
