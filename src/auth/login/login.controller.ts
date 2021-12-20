import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';

type requestBody = { email: string, password: string };

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() body: requestBody): Promise<any> {
    const player = await this.loginService.validateUser(body.email, body.password);
    console.log('player from service', player);
    if (!player) throw new UnauthorizedException('Usuário ou senha inválidos');
    return this.loginService.login(player);
  }
}
