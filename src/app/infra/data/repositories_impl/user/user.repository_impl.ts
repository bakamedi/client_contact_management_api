import { PrismaService } from '@infra/data/prisma/prisma.service';
import { UserRepository } from '@infra/domain/respositories/users/user.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(
    data: Prisma.UserCreateInput,
  ): Promise<Prisma.UserGetPayload<any>> {
    const result = await this.prismaService.user.create({
      data,
    });
    if (!result) {
      throw new InternalServerErrorException('User not found (request)');
    } else {
      return result;
    }
  }


  async findByEmail(email: string): Promise<Prisma.UserGetPayload<any>> {
    const result = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (!result) {
      throw new InternalServerErrorException('Email User not found (request)');
    } else {
      return result;
    }
  }
}
