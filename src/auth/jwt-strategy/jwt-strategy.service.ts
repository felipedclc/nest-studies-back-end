import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/* type Payload = {
  id: string,
  name: string,
  email: string,
  role: string,
  iat: number,
  exp: number
} */

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExoiration: false,
      secretOrKey: 'mytopsecretjwt',
    });
  }

  async validate(payload: any): Promise<{}> {
    // console.log('payload', payload);
    return payload;
  }
}
