import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
@Injectable()
export class JogadoresService {

  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

  async create(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email, telefoneCelular } = criaJogadorDto;

    await this._findEmailOrPhoneAndThrowError(email, telefoneCelular);
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return jogadorCriado.save();
  }

  async findByEmail(email: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ email });
    // if (!jogador) throw new NotFoundException(`Jogador não encontrado`);
    return jogador;
  }

  async findById(id: string): Promise<Jogador> {
    if (!isValidObjectId(id)) throw new BadRequestException(`Id inválido`);
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id: id }).exec();
    if (!jogadorEncontrado) throw new NotFoundException(`Jogador não encontrado`);
    return jogadorEncontrado;
  }

  async update(id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
    await this.findById(id);
    await this.jogadorModel.findOneAndUpdate({ _id: id }, { $set: atualizarJogadorDto }).exec();
  }

  async findAll(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
  }

  async remove(id: string): Promise<any> {
    await this.findById(id);
    return this.jogadorModel.deleteOne({ _id: id }).exec();
  }

  private async _findEmailOrPhoneAndThrowError(email:string, telefoneCelular: string): Promise<void> {
    const existEmail = await this.jogadorModel.findOne({ email }).exec();
    const existPhone = await this.jogadorModel.findOne({ telefoneCelular }).exec();

    if (existEmail || existPhone) throw new BadRequestException(`e-mail ou telefone já cadastrado`);
  }

}
