import { UpdateUserDTO } from '@infra/framework/controllers/user/dto/update-user.dto';
import { Prisma } from '@prisma/client';

export abstract class UserRepository {
  abstract create(
    userCreateInput: Prisma.UserCreateInput,
  ): Promise<Prisma.UserGetPayload<any>>;

  abstract findByEmail(
    email: string,
  ): Promise<Prisma.UserGetPayload<any>>;

  abstract getById(
    idUser: string,
  ): Promise<Prisma.UserGetPayload<any>>;

  abstract deleteById(
    idUser: string,
  ): Promise<boolean>;

  abstract getAll(
  ): Promise<any>;

  abstract update(
    idUser: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<Prisma.UserGetPayload<any>>;

}
