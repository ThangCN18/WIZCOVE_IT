import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from '../../config/env.config';
import { TokenRepository } from '../repositories/token.repository';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private tokenRepo: TokenRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: env.JWT.REFRESH_TOKEN.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { id: string }) {
    const token = req.headers['authorization']?.replace('Bearer', '').trim();
    if (!token) throw new ForbiddenException('Refresh token malformed');
    const refreshToken = await this.tokenRepo.findOne({
      where: { token, userId: payload.id },
    });
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
    return { ...payload, refreshToken };
  }
}
