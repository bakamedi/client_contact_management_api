import { JwtTokenRepository } from '@infra/domain/respositories/token/jwt.token.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';



@Injectable()
export class JwtTokenRepositoryImpl implements JwtTokenRepository {
  constructor(private readonly jwtService: JwtService) {}
  checkToken(token: string): any {
    const decode = this.jwtService.verify(token);
    return decode;
  }
  createToken(payload: Prisma.UserCreateInput): string {
    return this.jwtService.sign(payload);
  }
}
