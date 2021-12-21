import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class LoginService {
  constructor(
    private playersService: JogadoresService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const foundPlayer = await this.playersService.findByEmail(email);
    // console.log('player', foundPlayer);
    if (foundPlayer && foundPlayer.password === pass) {
      const { _doc: { password, telefoneCelular, ...result } } = foundPlayer;
      return result;
    }
    return null;
  }

  async generateToken(player: Jogador): Promise<any> {
    // console.log('player', player);
    const payload = {
      id: player._id,
      name: player.nome,
      email: player.email,
      role: player.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
