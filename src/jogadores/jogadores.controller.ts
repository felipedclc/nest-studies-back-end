import { Controller, Post, Body, Get, Delete, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-params-validator.pipe';
import { JwtGuard } from 'src/auth/guard/jwt-guard.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guard/role/role.guard';

@Controller('jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService) {}

  @Role('admin') // exige que o user seja admin
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.create(criarJogadorDto)
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  async atualizarJogador(
    // @Req() req: any,
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('id', JogadoresValidacaoParametrosPipe) id: string): Promise<void> {
    // console.log(req.user);
    await this.jogadoresService.update(id, atualizarJogadorDto)
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.findAll();
  }

  @Get('/:id')
  async consultarJogadorPeloId(
    @Param('id', JogadoresValidacaoParametrosPipe) id: string): Promise<Jogador> {
      return await this.jogadoresService.findById(id);
  }


  @Delete('/:id')
  async deletarJogador(
    @Param('id', JogadoresValidacaoParametrosPipe) id: string): Promise<void> {
      await this.jogadoresService.remove(id);
    }

}
