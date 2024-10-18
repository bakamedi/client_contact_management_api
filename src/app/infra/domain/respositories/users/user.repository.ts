import { Prisma } from '@prisma/client';

export abstract class UserRepository {
  abstract create(
    userCreateInput: Prisma.UserCreateInput,
  ): Promise<Prisma.UserGetPayload<any>>;

  abstract findByEmail(
    email: string,
  ): Promise<Prisma.UserGetPayload<any>>;
}
