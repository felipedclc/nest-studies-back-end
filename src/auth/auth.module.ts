require('dotenv').config();
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
  imports: [
    JogadoresModule,
    JwtModule.register({
      secret: 'mytopsecretjwt',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategyService],
})
export class AuthModule {}
