import { PrismaService } from '@infra/data/prisma/prisma.service';
import { UserRepository } from '@infra/domain/respositories/users/user.repository';
import { UpdateUserDTO } from '@infra/framework/controllers/user/dto/update-user.dto';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async getAll(): Promise<any> {
    return await this.prismaService.user.findMany({
      where: {
        role: UserRole.USER,
      },
      select: {
        id: true,
        names: true,
        lastName: true,
        phoneNumber: true,
        cellPhoneNumber: true,
        profileImage: true,
      },
      orderBy: {
        names: 'asc', 
      },
    });
  }

  async getById(
    idUser: string,
  ): Promise<Prisma.UserGetPayload<any>> {
    const userFound = await this.prismaService.user.findFirst({
      where: {
        id: idUser,
      },
    });

    if (!userFound) {
      throw new BadRequestException('User not found (request)');
    } else {
      return userFound;
    }
  }

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
      names: updateUserDTO.names,
      lastName: updateUserDTO.lastName,
      phoneNumber: updateUserDTO.phoneNumber,
      cellPhoneNumber: updateUserDTO.cellPhoneNumber,
      profileImage: updateUserDTO.profileImage,
      ...updateUserDTO,
    };

    const result = await this.prismaService.user.update({
      where: {
        id: idUser,
      },
      data,
    });
    if (!result) {
      throw new BadRequestException('User not found (request)');
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
      throw new BadRequestException('User Email not found (request)');
    } else {
      return result;
    }
  }

  async deleteById(idUser: string): Promise<boolean> {
    try {
      await this.prismaService.user.delete({
        where: {
          id: idUser,
        },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }
}
