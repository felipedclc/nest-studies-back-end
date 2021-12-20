import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly nome: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role?: string;
}
