import { PrismaService } from '@infra/data/prisma/prisma.service';
import { UserRepository } from '@infra/domain/respositories/users/user.repository';
import { UpdateUserDTO } from '@infra/framework/controllers/user/dto/update-user.dto';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async update(
    idUser: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<Prisma.UserGetPayload<any>> {
    const userFound = await this.prismaService.user.findFirst({
      where: {
        id: idUser,
      },
    });

    if (!userFound) {
      throw new BadRequestException('User not found (request)');
    }

    const data: Prisma.UserUpdateInput = {
      names: userFound.names,
      lastName: userFound.lastName,
      phoneNumber: userFound.phoneNumber,
      cellPhoneNumber: userFound.cellPhoneNumber,
      profileImage: userFound.profileImage,
      ...updateUserDTO,
  };

    const result = await this.prismaService.user.update({
      where: {
        id: idUser,
      },
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
