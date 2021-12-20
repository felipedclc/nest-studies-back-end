import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { ParamInsertPlayerOnCategory } from './interfaces/ParamInsertPlayerOnCategory';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async create(
    @Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    return this.categoriasService.create(criarCategoriaDto);
  }

  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get('/:categoria')
  async findById(
    @Param('categoria') categoria: string): Promise<Categoria> {
    return this.categoriasService.findByCategoryName(categoria);
  }

  @Patch('/:categoria')
  async update(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('categoria') categoria: string): Promise<void> {
    await this.categoriasService.update(categoria, atualizarCategoriaDto);
  }

  @Post('/:categorias/jogadores/:idJogador') // recebendo 2 params
  async insertPlayerOnCategory(@Param() params: ParamInsertPlayerOnCategory): Promise<void> {
    await this.categoriasService.insertPlayerOnCategory(params);
  }

}
