import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../core/base/shared/interfaces/use.case';
import { UserRepository } from '@infra/domain/respositories';

@Injectable()
export class GetAllUserUseCase implements UseCase<any, Prisma.UserGetPayload<any>[]> {
  constructor(
    private readonly userRespository: UserRepository,
  ) {}

  async execute(): Promise<any> {
    return await  this.userRespository.getAll();
  }
}
