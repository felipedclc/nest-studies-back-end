import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { Model, Types } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { ParamInsertPlayerOnCategory } from './interfaces/ParamInsertPlayerOnCategory';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
     private readonly jogadoresService: JogadoresService,
  ) {}

  async create(criarCategoriaDto: CriarCategoriaDto,): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncotrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncotrada) {
      throw new BadRequestException(`Categoria ${categoria} já cadastrada!`);
    }

    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaModel
      .find()
      .populate('jogadores')
      .exec();
  }

  async findByCategoryName(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada!`);
    }

    return categoriaEncontrada;
  }

  async update(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada!`);
    }

    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec();
  }

  async insertPlayerOnCategory(params: ParamInsertPlayerOnCategory): Promise<void> {
    const { categorias, idJogador } = params;

    const { nome } = await this.jogadoresService.findById(idJogador);
    const categoria = await this.findByCategoryName(categorias);

    const repeatJog = categoria.jogadores.find((idJog) => idJog.toString() === idJogador);
    if (repeatJog) throw new BadRequestException(`Jogador ${nome} já cadastrado na categoria`);

    categoria.jogadores.push(idJogador);
    await this.categoriaModel.updateOne({ _id: categoria._id }, { $push: { jogadores: idJogador } });
  }

}
