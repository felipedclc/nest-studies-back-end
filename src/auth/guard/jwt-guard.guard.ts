import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
// guard está ligado com o strategy
// será utilizado no controller com a chave 'jwt'
