import { Prisma } from '@prisma/client';

export abstract class JwtTokenRepository {
  abstract checkToken(token: string): Promise<any>;
  abstract createToken(payload: Prisma.UserCreateInput): string;
}
