import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshTokens(user: User, refreshToken: string) {
    const isRefreshTokenValid = await this.jwtService.verifyAsync(refreshToken);
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException();
    }
    return this.login(user);
  }
}
