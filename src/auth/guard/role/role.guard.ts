import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get('role', context.getHandler()); // pega o role que colocarmos no controller
    // if (!role) throw new UnauthorizedException();

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    console.log('user from request', user);
    return user.role === role; // retorna true ou false

    // return true; // funciona como o next do express
  }
}
