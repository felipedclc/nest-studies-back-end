import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-params-validator.pipe';

@Controller('jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto)
  }

  @Put('/:id')
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('id', JogadoresValidacaoParametrosPipe) id: string): Promise<void> {
    await this.jogadoresService.atualizarJogador(id, atualizarJogadorDto)
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador> {
      return await this.jogadoresService.consultarJogadorPeloId(_id);
  }


  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
      await this.jogadoresService.deletarJogador(_id)
    }

}
