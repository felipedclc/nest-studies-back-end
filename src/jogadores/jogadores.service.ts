import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  private readonly logger = new Logger(JogadoresService.name);


  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    console.log('logger', this.logger);
    const { email, telefoneCelular } = criaJogadorDto

    const emailRepetido = await this.jogadorModel.findOne({email}).exec();
    const telefoneRepetido = await this.jogadorModel.findOne({telefoneCelular}).exec();

    if (emailRepetido || telefoneRepetido) {
      throw new BadRequestException(`e-mail ou telefone já cadastrado`);
    }

    const jogadorCriado = new this.jogadorModel(criaJogadorDto)
    return await jogadorCriado.save()

  }


  async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogadodor com id ${_id} não econtrado`)
    }

    await this.jogadorModel.findOneAndUpdate({_id}, {$set: atualizarJogadorDto}).exec()

  }


  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec()
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }
    return jogadorEncontrado
  }

  async deletarJogador(_id): Promise<any> {

    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
    }

    return await this.jogadorModel.deleteOne({_id}).exec();
  }

}
